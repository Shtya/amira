'use client';
import { useQuiz } from '../hooks/useQuiz';
import Header from '../components/Header';
import HomeTab from '../components/HomeTab';
import ExamResults from '../components/ExamResults';
import ExamPanel from '../components/ExamPanel';
import ReviewPanel from '../components/ReviewPanel';
import WeakPanel from '../components/WeakPanel';
import StatsPanel from '../components/StatsPanel';
import BadgeToast from '../components/BadgeToast';
import SplashScreen from '../components/SplashScreen';
import QuizFeed from '../components/QuizFeed';
import InfoPanel from '../components/InfoPanel';
import { BookOpen, X } from 'lucide-react';

export default function Home() {
  const {
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
  } = useQuiz();

  if (!data) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-2">
          <BookOpen className="w-10 h-10 text-sky-500 animate-bounce" />
          <p className="text-slate-500 font-medium text-sm">جار التحميل...</p>
        </div>
      </div>
    );
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setActiveMode('home');
  };

  const handleStartQuiz = (mode, config = {}) => {
    const started = startQuiz(mode, config);
    if (!started) alert('لا توجد أسئلة في هذا الوضع بعد!');
  };

  const goHome = () => {
    setActiveMode('home');
    setActiveTab('quiz');
  };

  const isQuizActive = activeMode === 'quiz' || activeMode === 'results';

  return (
    <>
      <SplashScreen />
      <div className="min-h-screen bg-slate-50" dir="rtl">
        <Header data={data} onTabChange={handleTabChange} activeTab={activeTab} />
        <BadgeToast badgeId={newBadge} />

        <main className="max-w-2xl mx-auto px-4 py-5">
          {/* Close button — shown during quiz feed and results */}
          {isQuizActive && (
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={goHome}
                className="flex items-center gap-1.5 text-slate-500 hover:text-rose-500 transition-colors text-sm font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm active:scale-95"
              >
                <X className="w-4 h-4" />
                <span>إغلاق</span>
              </button>
              {activeMode === 'quiz' && (
                <span className="text-xs text-slate-400 font-medium bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                  {quizQuestions.length} سؤال
                </span>
              )}
            </div>
          )}

          {/* QUIZ MODE — vertical feed */}
          {activeMode === 'quiz' && quizQuestions.length > 0 && (
            <QuizFeed
              quizQuestions={quizQuestions}
              data={data}
              onAnswerById={answerById}
              onAddToReview={addToReview}
              onFinish={() => setActiveMode('results')}
            />
          )}

          {/* RESULTS MODE */}
          {activeMode === 'results' && (
            <ExamResults
              quizQuestions={quizQuestions}
              data={data}
              examConfig={examConfig}
              onRetry={() => startQuiz(examConfig?.mode || 'all', examConfig)}
              onHome={goHome}
            />
          )}

          {/* HOME STATE */}
          {activeMode === 'home' && (
            <>
              {activeTab === 'quiz' && (
                <HomeTab data={data} onStartQuiz={handleStartQuiz} />
              )}
              {activeTab === 'exam' && (
                <ExamPanel data={data} onStart={handleStartQuiz} />
              )}
              {activeTab === 'review' && (
                <ReviewPanel
                  data={data}
                  onRemoveFromReview={removeFromReview}
                  onStartReview={() => handleStartQuiz('review')}
                />
              )}
              {activeTab === 'stats' && (
                <StatsPanel data={data} onReset={resetAll} />
              )}
              {activeTab === 'weak' && (
                <WeakPanel data={data} onStartWeak={() => handleStartQuiz('weak')} />
              )}
              {activeTab === 'info' && <InfoPanel />}
            </>
          )}
        </main>
      </div>
    </>
  );
}
