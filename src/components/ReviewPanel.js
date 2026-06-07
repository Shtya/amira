'use client';
import { Bookmark, X, Check, ChevronLeft } from 'lucide-react';
import { questions } from '../data/questions';

export default function ReviewPanel({ data, onRemoveFromReview, onStartReview }) {
  const reviewIds = data?.reviewList || [];
  const reviewQuestions = questions.filter(q => reviewIds.includes(q.id));

  if (reviewQuestions.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base mb-2">قائمة المراجعة فارغة</h3>
          <p className="text-slate-400 text-sm">عندما تخطئ في سؤال، يمكنك إضافته هنا للمراجعة لاحقاً.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-amber-600" />
          <div>
            <h2 className="font-bold text-amber-800 text-sm">أسئلة المراجعة</h2>
            <p className="text-amber-600 text-xs mt-0.5">{reviewQuestions.length} سؤال يحتاج مراجعة</p>
          </div>
        </div>
        <button
          onClick={onStartReview}
          className="flex items-center gap-1.5 bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-amber-600 shadow active:scale-[0.97]"
        >
          <span>ابدأ المراجعة</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {reviewQuestions.map((q) => {
          const ans = data?.answers[q.id];
          return (
            <div key={q.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm animate-fade-in">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">{q.category}</span>
                    {ans && (
                      <span className={`flex items-center gap-0.5 text-xs px-2 py-0.5 rounded-full font-medium ${
                        ans.status === 'correct' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {ans.status === 'correct'
                          ? <><Check className="w-3 h-3" /> صحيح</>
                          : <><X className="w-3 h-3" /> خطأ</>
                        }
                      </span>
                    )}
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">{q.text}</p>
                  {ans?.attempts > 0 && (
                    <p className="text-xs text-slate-400 mt-1">محاولات: {ans.attempts}</p>
                  )}
                </div>
                <button
                  onClick={() => onRemoveFromReview(q.id)}
                  className="text-slate-300 hover:text-rose-400 transition-colors shrink-0 p-1"
                  title="إزالة من المراجعة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-3 p-2.5 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500">
                  <span className="font-medium text-slate-700">الإجابة الصحيحة: </span>
                  {q.options[q.correct]}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
