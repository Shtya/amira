const STORAGE_KEY = 'arabic_quiz_data';

export function getStorageData() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStorageData(data) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function getDefaultData() {
  return {
    answers: {}, // { questionId: { status: 'correct'|'wrong'|'unanswered', attempts: 0, firstAnswer: null, chosenOption: null } }
    reviewList: [], // array of question ids
    streak: {
      current: 0,
      longest: 0,
      lastStudyDate: null,
    },
    dailyStats: {}, // { 'YYYY-MM-DD': { solved: 0, correct: 0, wrong: 0 } }
    badges: [], // earned badge ids
    totalTimeStudied: 0, // minutes
    createdAt: new Date().toISOString(),
  };
}

export function initStorage() {
  const existing = getStorageData();
  if (!existing) {
    const defaults = getDefaultData();
    setStorageData(defaults);
    return defaults;
  }
  return existing;
}

export function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

export function getWeekKey(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

export function getDailyStats(data) {
  const today = getTodayKey();
  return data.dailyStats[today] || { solved: 0, correct: 0, wrong: 0 };
}

export function getWeeklyStats(data) {
  const stats = { solved: 0, correct: 0, wrong: 0 };
  for (let i = 0; i < 7; i++) {
    const key = getWeekKey(i);
    const day = data.dailyStats[key] || { solved: 0, correct: 0, wrong: 0 };
    stats.solved += day.solved;
    stats.correct += day.correct;
    stats.wrong += day.wrong;
  }
  return stats;
}

export function getPrevWeeklyStats(data) {
  const stats = { solved: 0, correct: 0, wrong: 0 };
  for (let i = 7; i < 14; i++) {
    const key = getWeekKey(i);
    const day = data.dailyStats[key] || { solved: 0, correct: 0, wrong: 0 };
    stats.solved += day.solved;
    stats.correct += day.correct;
    stats.wrong += day.wrong;
  }
  return stats;
}

export function updateStreak(data) {
  const today = getTodayKey();
  const yesterday = getWeekKey(1);
  const streak = { ...data.streak };

  if (streak.lastStudyDate === today) return streak;
  if (streak.lastStudyDate === yesterday) {
    streak.current += 1;
  } else {
    streak.current = 1;
  }
  streak.longest = Math.max(streak.longest, streak.current);
  streak.lastStudyDate = today;
  return streak;
}

export function BADGES_CONFIG() {
  return [
    { id: 'first_10', label: 'أول 10 أسئلة', iconKey: 'target', condition: (data) => Object.keys(data.answers).length >= 10 },
    { id: 'accuracy_90', label: 'دقة 90%', iconKey: 'trophy', condition: (data) => {
      const answers = Object.values(data.answers);
      const correct = answers.filter(a => a.status === 'correct').length;
      return answers.length >= 5 && (correct / answers.length) >= 0.9;
    }},
    { id: 'streak_3', label: '3 أيام متتالية', iconKey: 'flame', condition: (data) => data.streak.current >= 3 },
    { id: 'all_answered', label: 'أكمل جميع الأسئلة', iconKey: 'book-open', condition: (data) => Object.keys(data.answers).length >= 10 },
    { id: 'streak_7', label: 'أسبوع دراسي', iconKey: 'star', condition: (data) => data.streak.current >= 7 },
  ];
}

export function checkBadges(data) {
  const badges = [...(data.badges || [])];
  const configs = BADGES_CONFIG();
  configs.forEach(badge => {
    if (!badges.includes(badge.id) && badge.condition(data)) {
      badges.push(badge.id);
    }
  });
  return badges;
}

export function getLevel(data) {
  const solved = Object.keys(data.answers).length;
  if (solved < 3) return { label: 'مبتدئ', color: 'text-slate-500', next: 3 };
  if (solved < 7) return { label: 'متوسط', color: 'text-amber-500', next: 7 };
  return { label: 'متقدم', color: 'text-emerald-500', next: null };
}

export function getAccuracy(data) {
  const answers = Object.values(data.answers);
  if (answers.length === 0) return 0;
  const correct = answers.filter(a => a.status === 'correct').length;
  return Math.round((correct / answers.length) * 100);
}

export function getWeakQuestions(data, questions) {
  return questions.filter(q => {
    const ans = data.answers[q.id];
    return ans && ans.status === 'wrong' && ans.attempts >= 1;
  });
}
