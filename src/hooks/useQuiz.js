'use client';
import { useState, useEffect, useCallback } from 'react';
import { questions } from '../data/questions';
import {
  initStorage, setStorageData, getTodayKey,
  updateStreak, checkBadges, getWeakQuestions,
} from '../utils/storage';

export function useQuiz() {
  const [data, setData] = useState(null);
  const [activeMode, setActiveMode] = useState('home');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [examConfig, setExamConfig] = useState(null);
  const [newBadge, setNewBadge] = useState(null);
  const [activeTab, setActiveTab] = useState('quiz');

  useEffect(() => {
    const stored = initStorage();
    setData(stored);
  }, []);

  const saveData = useCallback((newData) => {
    setStorageData(newData);
    setData(newData);
  }, []);

  const startQuiz = useCallback((mode = 'all', config = {}) => {
    let qs = [];
    if (mode === 'all') qs = [...questions];
    else if (mode === 'range') {
      const { from, to } = config;
      qs = questions.filter(q => q.id >= from && q.id <= to);
    } else if (mode === 'random') {
      const count = config.count || 5;
      qs = [...questions].sort(() => Math.random() - 0.5).slice(0, count);
    } else if (mode === 'wrong') {
      qs = questions.filter(q => data?.answers[q.id]?.status === 'wrong');
    } else if (mode === 'custom') {
      const count = config.count || 5;
      qs = [...questions].sort(() => Math.random() - 0.5).slice(0, count);
    } else if (mode === 'review') {
      qs = questions.filter(q => data?.reviewList?.includes(q.id));
    } else if (mode === 'weak') {
      qs = getWeakQuestions(data, questions);
    }
    if (qs.length === 0) return false;
    setQuizQuestions(qs);
    setExamConfig({ mode, ...config, startedAt: Date.now() });
    setActiveMode('quiz');
    return true;
  }, [data]);

  // Used by QuizFeed — answers by questionId (not index)
  const answerById = useCallback((questionId, optionIndex) => {
    const q = questions.find(qq => qq.id === questionId);
    if (!q) return;
    const isCorrect = optionIndex === q.correct;
    const today = getTodayKey();

    setData(prev => {
      const updated = { ...prev };
      const existing = updated.answers[questionId] || { status: 'unanswered', attempts: 0, firstAnswer: null };
      updated.answers = {
        ...updated.answers,
        [questionId]: {
          status: isCorrect ? 'correct' : 'wrong',
          attempts: (existing.attempts || 0) + 1,
          firstAnswer: existing.firstAnswer ?? (isCorrect ? 'correct' : 'wrong'),
          chosenOption: optionIndex,
        },
      };
      const daily = updated.dailyStats[today] || { solved: 0, correct: 0, wrong: 0 };
      updated.dailyStats = {
        ...updated.dailyStats,
        [today]: {
          solved: daily.solved + 1,
          correct: daily.correct + (isCorrect ? 1 : 0),
          wrong: daily.wrong + (isCorrect ? 0 : 1),
        },
      };
      updated.streak = updateStreak(updated);
      const prevBadges = updated.badges || [];
      updated.badges = checkBadges(updated);
      const earnedNew = updated.badges.find(b => !prevBadges.includes(b));
      if (earnedNew) {
        setTimeout(() => setNewBadge(earnedNew), 300);
        setTimeout(() => setNewBadge(null), 3500);
      }
      setStorageData(updated);
      return updated;
    });
  }, []);

  const addToReview = useCallback((questionId) => {
    setData(prev => {
      if (prev.reviewList.includes(questionId)) return prev;
      const updated = { ...prev, reviewList: [...prev.reviewList, questionId] };
      setStorageData(updated);
      return updated;
    });
  }, []);

  const removeFromReview = useCallback((questionId) => {
    setData(prev => {
      const updated = { ...prev, reviewList: prev.reviewList.filter(id => id !== questionId) };
      setStorageData(updated);
      return updated;
    });
  }, []);

  const resetAll = useCallback(() => {
    const fresh = {
      answers: {},
      reviewList: [],
      streak: { current: 0, longest: 0, lastStudyDate: null },
      dailyStats: {},
      badges: [],
      totalTimeStudied: 0,
      createdAt: new Date().toISOString(),
    };
    saveData(fresh);
    setActiveMode('home');
  }, [saveData]);

  return {
    data,
    activeMode, setActiveMode,
    activeTab, setActiveTab,
    quizQuestions,
    examConfig,
    newBadge,
    startQuiz,
    answerById,
    addToReview,
    removeFromReview,
    resetAll,
    questions,
  };
}
