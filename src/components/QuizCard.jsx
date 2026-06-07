'use client';
import { CheckCircle2, Lightbulb, Flag, ChevronLeft, Bookmark, Check, X } from 'lucide-react';

const OPTION_LETTERS = ['أ', 'ب', 'ج', 'د'];

export default function QuizCard({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  showResult,
  onAnswer,
  onNext,
  onAddToReview,
  isLastQuestion,
  isInReview,
}) {
  const isCorrect = selectedOption === question.correct;

  const getOptionStyle = (idx) => {
    if (!showResult) {
      if (selectedOption === idx) return 'border-sky-400 bg-sky-50 text-sky-800';
      return 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50 cursor-pointer';
    }
    if (idx === question.correct) return 'border-emerald-400 bg-emerald-50 text-emerald-800';
    if (idx === selectedOption && !isCorrect) return 'border-rose-400 bg-rose-50 text-rose-800';
    return 'border-slate-200 bg-slate-50 text-slate-400';
  };

  const getLetterStyle = (idx) => {
    if (!showResult) {
      if (selectedOption === idx) return 'bg-sky-500 text-white';
      return 'bg-slate-100 text-slate-500';
    }
    if (idx === question.correct) return 'bg-emerald-500 text-white';
    if (idx === selectedOption && !isCorrect) return 'bg-rose-500 text-white';
    return 'bg-slate-200 text-slate-400';
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="animate-fade-in">
      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-slate-500">
            السؤال {questionNumber} من {totalQuestions}
          </span>
          <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full">
            {question.category}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 mb-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
            {questionNumber}
          </div>
          <p className="text-white text-lg font-semibold leading-relaxed">{question.text}</p>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-5">
        {question.options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => !showResult && onAnswer(idx)}
            disabled={showResult}
            className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-right transition-all duration-200 font-medium text-sm
              ${getOptionStyle(idx)}
              ${!showResult && selectedOption === null ? 'active:scale-[0.98]' : ''}
              ${showResult && idx === question.correct ? 'animate-bounce-in' : ''}
              ${showResult && idx === selectedOption && !isCorrect ? 'animate-shake' : ''}
            `}
          >
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 transition-all ${getLetterStyle(idx)}`}>
              {OPTION_LETTERS[idx]}
            </span>
            <span className="flex-1">{option}</span>
            {showResult && idx === question.correct && (
              <Check className="w-5 h-5 text-emerald-500 shrink-0 animate-bounce-in" />
            )}
            {showResult && idx === selectedOption && !isCorrect && idx !== question.correct && (
              <X className="w-5 h-5 text-rose-500 shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {showResult && (
        <div className={`rounded-xl p-4 mb-5 animate-slide-up border ${
          isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'
        }`}>
          <div className="flex items-start gap-3">
            {isCorrect
              ? <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
              : <Lightbulb className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
            }
            <div>
              <p className={`font-bold text-sm mb-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isCorrect ? 'إجابة صحيحة! أحسنت!' : 'إجابة خاطئة'}
              </p>
              {question.explanation && (
                <p className="text-slate-600 text-sm leading-relaxed">{question.explanation}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      {showResult && (
        <div className="flex gap-3 animate-fade-in">
          {!isCorrect && (
            <button
              onClick={() => onAddToReview(question.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-2 transition-all ${
                isInReview
                  ? 'border-amber-400 bg-amber-50 text-amber-700'
                  : 'border-amber-300 bg-white text-amber-600 hover:bg-amber-50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isInReview ? 'في المراجعة' : 'أضف للمراجعة'}</span>
            </button>
          )}
          <button
            onClick={onNext}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            {isLastQuestion
              ? <><Flag className="w-4 h-4" /><span>إنهاء الاختبار</span></>
              : <><span>السؤال التالي</span><ChevronLeft className="w-4 h-4" /></>
            }
          </button>
        </div>
      )}
    </div>
  );
}
