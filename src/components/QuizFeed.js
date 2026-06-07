'use client';
import { useState, useCallback, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check, X, Bookmark, CheckCircle2, Lightbulb, Trophy,
  ChevronDown, Target, ZoomIn, ImageOff,
} from 'lucide-react';

const OPTION_LETTERS = ['أ', 'ب', 'ج', 'د'];
const BATCH_SIZE = 10;

function getOptionStyle(idx, answered, correct) {
  if (!answered) {
    return 'border-slate-200 bg-white hover:border-sky-400 hover:bg-sky-50 cursor-pointer active:scale-[0.99] hover:shadow-sm';
  }
  if (idx === correct) return 'border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm';
  if (idx === answered.selected && !answered.isCorrect) return 'border-rose-400 bg-rose-50 text-rose-800';
  return 'border-slate-100 bg-slate-50/80 text-slate-400';
}

function getLetterStyle(idx, answered, correct) {
  if (!answered) return 'bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600';
  if (idx === correct) return 'bg-emerald-500 text-white shadow-sm';
  if (idx === answered.selected && !answered.isCorrect) return 'bg-rose-500 text-white';
  return 'bg-slate-200 text-slate-400';
}

// ── Full-screen image lightbox ──────────────────────────────────────────────
function ImageLightbox({ src, alt, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[998] flex items-center justify-center bg-black/80 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-3xl w-full"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-3 -left-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-rose-50"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="w-full rounded-2xl shadow-2xl object-contain max-h-[80vh]"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Question image with loading / error states ────────────────────────────────
function QuestionImage({ src, alt }) {
  const [status, setStatus] = useState('loading'); // loading | loaded | error
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <div className="relative bg-slate-100 rounded-xl overflow-hidden mx-4 mb-1 border border-slate-200">
        {status === 'loading' && (
          <div className="h-48 flex items-center justify-center animate-pulse bg-slate-200">
            <div className="w-10 h-10 rounded-xl bg-slate-300" />
          </div>
        )}
        {status === 'error' && (
          <div className="h-32 flex flex-col items-center justify-center gap-2 text-slate-400">
            <ImageOff className="w-8 h-8" />
            <span className="text-xs">تعذّر تحميل الصورة</span>
          </div>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`w-full object-contain max-h-72 rounded-xl transition-opacity duration-300 ${status === 'loaded' ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}
        />
        {status === 'loaded' && (
          <button
            onClick={() => setLightbox(true)}
            className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-black/70 transition-colors"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            تكبير
          </button>
        )}
      </div>

      {lightbox && <ImageLightbox src={src} alt={alt} onClose={() => setLightbox(false)} />}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const FeedCard = memo(function FeedCard({
  question, questionNumber, animDelay, answered, isInReview, onAnswer, onAddToReview,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: animDelay, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      {/* ── Question header ── */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 p-4">
        <div className="flex items-start gap-3">
          {/* Number badge */}
          <div className="w-9 h-9 bg-white/20 rounded-xl border border-white/30 flex items-center justify-center text-white font-black text-sm shrink-0 mt-0.5">
            {questionNumber}
          </div>
          <div className="flex-1 min-w-0">
            <span className="inline-block bg-white/20 border border-white/25 text-white text-xs px-2.5 py-1 rounded-full font-medium mb-2">
              {question.category}
            </span>
            <p className="text-white font-semibold leading-relaxed text-sm sm:text-base text-left" dir="ltr"
               style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>
              {question.text}
            </p>
          </div>
          {/* Status dot */}
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 ${
            !answered ? 'bg-white/30' :
            answered.isCorrect ? 'bg-emerald-300' : 'bg-rose-300'
          }`} />
        </div>
      </div>

      {/* ── Question image (shown when question.image exists) ── */}
      {question.image && (
        <div className="pt-4">
          <QuestionImage src={question.image} alt={`سؤال ${questionNumber}`} />
        </div>
      )}

      {/* ── Options ── */}
      <div className="p-4 space-y-2.5">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !answered && onAnswer(idx)}
            disabled={!!answered}
            className={`group w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-200 text-sm font-medium ${getOptionStyle(idx, answered, question.correct)}`}
          >
            <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-all duration-200 ${getLetterStyle(idx, answered, question.correct)}`}>
              {OPTION_LETTERS[idx]}
            </span>
            <span className="flex-1 leading-snug" dir="ltr"
                  style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}>{option}</span>
            {answered && idx === question.correct && (
              <Check className="w-4 h-4 text-emerald-500 shrink-0" strokeWidth={3} />
            )}
            {answered && idx === answered.selected && !answered.isCorrect && idx !== question.correct && (
              <X className="w-4 h-4 text-rose-400 shrink-0" strokeWidth={3} />
            )}
          </button>
        ))}
      </div>

      {/* ── Inline feedback ── */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.28 }}
          className={`mx-4 mb-4 rounded-xl border overflow-hidden`}
        >
          <div className={`p-3.5 ${answered.isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'}`}>
            <div className="flex items-start gap-2.5">
              {answered.isCorrect
                ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                : <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              }
              <div className="flex-1">
                <p className={`font-bold text-sm mb-1 ${answered.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {answered.isCorrect ? 'إجابة صحيحة! أحسنت!' : 'إجابة خاطئة'}
                </p>
                {question.explanation && (
                  <p className="text-slate-600 text-xs leading-relaxed">{question.explanation}</p>
                )}
                {!answered.isCorrect && (
                  <button
                    onClick={onAddToReview}
                    className={`mt-2.5 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border-2 transition-all active:scale-95 ${
                      isInReview
                        ? 'bg-amber-100 text-amber-700 border-amber-300'
                        : 'bg-white text-amber-600 border-amber-300 hover:bg-amber-50'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    {isInReview ? 'في قائمة المراجعة' : 'أضف للمراجعة'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
});

export default function QuizFeed({ quizQuestions, data, onAnswerById, onAddToReview, onFinish }) {
  // Pre-populate with existing answers from previous sessions
  const [localAnswers, setLocalAnswers] = useState(() => {
    const pre = {};
    quizQuestions.forEach(q => {
      const ans = data?.answers?.[q.id];
      if (ans && (ans.status === 'correct' || ans.status === 'wrong')) {
        pre[q.id] = {
          selected: ans.chosenOption ?? -1,
          isCorrect: ans.status === 'correct',
        };
      }
    });
    return pre;
  });
  const [visibleCount, setVisibleCount] = useState(Math.min(BATCH_SIZE, quizQuestions.length));
  const firstNewRef = useRef(null);

  const visibleQuestions = quizQuestions.slice(0, visibleCount);
  const answeredCount = Object.keys(localAnswers).length;
  const correctCount = Object.values(localAnswers).filter(a => a.isCorrect).length;
  const batchAnsweredCount = visibleQuestions.filter(q => localAnswers[q.id]).length;
  const allBatchAnswered = batchAnsweredCount === visibleQuestions.length && visibleQuestions.length > 0;
  const hasMore = visibleCount < quizQuestions.length;
  const allDone = !hasMore && allBatchAnswered;
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const handleAnswer = useCallback((question, optionIndex) => {
    if (localAnswers[question.id]) return;
    const isCorrect = optionIndex === question.correct;
    setLocalAnswers(prev => ({
      ...prev,
      [question.id]: { selected: optionIndex, isCorrect },
    }));
    onAnswerById(question.id, optionIndex);
  }, [localAnswers, onAnswerById]);

  const loadMore = () => {
    setVisibleCount(c => Math.min(c + BATCH_SIZE, quizQuestions.length));
    setTimeout(() => {
      firstNewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
  };

  return (
    <div className="space-y-3">
      {/* ── Sticky progress bar ── */}
      <div className="bg-white/95 backdrop-blur border border-slate-200 rounded-2xl px-4 py-3 shadow-sm sticky top-[72px] z-30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-black text-slate-700">{answeredCount}</span>
            <span className="text-slate-400">/ {quizQuestions.length} سؤال</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1 text-emerald-600">
              <Check className="w-3.5 h-3.5" strokeWidth={3} /> {correctCount}
            </span>
            <span className="flex items-center gap-1 text-rose-500">
              <X className="w-3.5 h-3.5" strokeWidth={3} /> {answeredCount - correctCount}
            </span>
            <span className="flex items-center gap-1 text-sky-600">
              <Target className="w-3.5 h-3.5" /> {accuracy}%
            </span>
          </div>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
            animate={{ width: `${(answeredCount / quizQuestions.length) * 100}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>
        {/* Mini batch progress */}
        <p className="text-xs text-slate-400 mt-1.5 text-center">
          الدفعة الحالية: {batchAnsweredCount} / {visibleQuestions.length}
        </p>
      </div>

      {/* ── Question cards ── */}
      {visibleQuestions.map((q, idx) => {
        // Attach the scroll-target ref to the first question of each new batch
        const isFirstNew = idx === visibleCount - BATCH_SIZE && idx > 0;
        return (
          <div key={q.id} ref={isFirstNew ? firstNewRef : null}>
            <FeedCard
              question={q}
              questionNumber={idx + 1}
              animDelay={Math.min((idx % BATCH_SIZE) * 0.04, 0.36)}
              answered={localAnswers[q.id] || null}
              isInReview={data?.reviewList?.includes(q.id)}
              onAnswer={(opt) => handleAnswer(q, opt)}
              onAddToReview={() => onAddToReview(q.id)}
            />
          </div>
        );
      })}

      {/* ── Load More banner ── */}
      {allBatchAnswered && hasMore && (
        <motion.div
          key={`load-${visibleCount}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 rounded-2xl p-6 text-center shadow-xl"
        >
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/30">
            <ChevronDown className="w-8 h-8 text-white" />
          </div>
          <p className="text-white font-bold text-lg mb-1">
            أحسنت! أجبت على {visibleCount} سؤال
          </p>
          <p className="text-white/70 text-sm mb-5">
            {quizQuestions.length - visibleCount} سؤال لا تزال في الانتظار
          </p>
          <button
            onClick={loadMore}
            className="bg-white text-sky-600 font-black px-8 py-3 rounded-xl shadow-lg hover:bg-sky-50 active:scale-[0.97] text-sm"
          >
            الأسئلة التالية ({Math.min(BATCH_SIZE, quizQuestions.length - visibleCount)})
          </button>
        </motion.div>
      )}

      {/* ── All done → Results ── */}
      {allDone && (
        <motion.div
          key="finish"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl p-7 text-center shadow-xl"
        >
          <Trophy className="w-14 h-14 text-white/85 mx-auto mb-3" />
          <p className="text-white font-bold text-2xl mb-1">أنهيت جميع الأسئلة!</p>
          <div className="flex items-center justify-center gap-4 mb-5 mt-3">
            <div className="bg-white/20 rounded-xl px-4 py-2 border border-white/25">
              <div className="text-2xl font-black text-white">{correctCount}</div>
              <div className="text-white/70 text-xs">صحيح</div>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2 border border-white/25">
              <div className="text-2xl font-black text-white">{answeredCount - correctCount}</div>
              <div className="text-white/70 text-xs">خطأ</div>
            </div>
            <div className="bg-white/20 rounded-xl px-4 py-2 border border-white/25">
              <div className="text-2xl font-black text-white">{accuracy}%</div>
              <div className="text-white/70 text-xs">دقة</div>
            </div>
          </div>
          <button
            onClick={onFinish}
            className="bg-white text-emerald-600 font-black px-10 py-3.5 rounded-xl shadow-lg hover:bg-emerald-50 active:scale-[0.97] text-sm"
          >
            عرض النتائج التفصيلية
          </button>
        </motion.div>
      )}
    </div>
  );
}
