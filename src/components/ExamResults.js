'use client';
import { RefreshCw, Home, Check, X, Star, ThumbsUp, BookOpen, Dumbbell } from 'lucide-react';

export default function ExamResults({ quizQuestions, data, onRetry, onHome, examConfig }) {
  const correct = quizQuestions.filter(q => data?.answers[q.id]?.status === 'correct').length;
  const total = quizQuestions.length;
  const accuracy = Math.round((correct / total) * 100);

  const getGrade = () => {
    if (accuracy >= 90) return { label: 'ممتاز!', Icon: Star, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
    if (accuracy >= 75) return { label: 'جيد جداً!', Icon: ThumbsUp, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-200' };
    if (accuracy >= 60) return { label: 'جيد', Icon: BookOpen, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' };
    return { label: 'تحتاج مراجعة', Icon: Dumbbell, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-200' };
  };

  const grade = getGrade();

  return (
    <div className="animate-fade-in">
      <div className={`rounded-2xl border-2 p-6 mb-5 text-center ${grade.bg}`}>
        <grade.Icon className={`w-10 h-10 mx-auto mb-3 ${grade.color}`} />
        <div className="text-5xl font-black mb-2 text-slate-800">{accuracy}%</div>
        <div className={`text-xl font-bold ${grade.color}`}>{grade.label}</div>
        <p className="text-slate-500 text-sm mt-1">أجبت على {correct} من {total} إجابات صحيحة</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-emerald-600">{correct}</div>
          <div className="flex items-center justify-center gap-1 text-xs text-emerald-500 font-medium mt-0.5">
            <Check className="w-3 h-3" /> صحيح
          </div>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-rose-600">{total - correct}</div>
          <div className="flex items-center justify-center gap-1 text-xs text-rose-500 font-medium mt-0.5">
            <X className="w-3 h-3" /> خطأ
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-slate-600">{total}</div>
          <div className="text-xs text-slate-500 font-medium mt-0.5">إجمالي</div>
        </div>
      </div>

      {/* Question breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-5">
        <h3 className="font-bold text-slate-700 mb-3 text-sm">تفاصيل الأسئلة</h3>
        <div className="space-y-2">
          {quizQuestions.map((q) => {
            const ans = data?.answers[q.id];
            const isCorrect = ans?.status === 'correct';
            return (
              <div key={q.id} className={`flex items-center gap-3 p-2.5 rounded-lg text-sm ${isCorrect ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 ${isCorrect ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                  {isCorrect ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </span>
                <span className="flex-1 text-slate-700 truncate">{q.text}</span>
                <span className={`text-xs font-medium shrink-0 ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isCorrect ? 'صحيح' : 'خطأ'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow hover:shadow-md active:scale-[0.98]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>إعادة الاختبار</span>
        </button>
        <button
          onClick={onHome}
          className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 active:scale-[0.98]"
        >
          <Home className="w-4 h-4" />
          <span>الصفحة الرئيسية</span>
        </button>
      </div>
    </div>
  );
}
