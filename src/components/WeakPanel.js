'use client';
import { AlertTriangle, ChevronLeft } from 'lucide-react';
import { getWeakQuestions } from '../utils/storage';
import { questions } from '../data/questions';

export default function WeakPanel({ data, onStartWeak }) {
  const weakQuestions = data ? getWeakQuestions(data, questions) : [];

  if (weakQuestions.length === 0) {
    return (
      <div className="animate-fade-in">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-sm">
          <AlertTriangle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700 text-base mb-2">لا توجد نقاط ضعف!</h3>
          <p className="text-slate-400 text-sm">أحسنت! استمر في الممارسة لرصد نقاط الضعف.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <div>
            <h2 className="font-bold text-rose-800 text-sm">نقاط الضعف</h2>
            <p className="text-rose-600 text-xs mt-0.5">{weakQuestions.length} سؤال تحتاج تحسين</p>
          </div>
        </div>
        <button
          onClick={onStartWeak}
          className="flex items-center gap-1.5 bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-rose-600 shadow active:scale-[0.97]"
        >
          <span>تدرب عليها</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        {weakQuestions.map((q) => {
          const ans = data?.answers[q.id];
          const attempts = ans?.attempts || 0;
          const intensity = attempts >= 3 ? 'high' : attempts >= 2 ? 'medium' : 'low';

          return (
            <div key={q.id} className={`bg-white border-2 rounded-xl p-4 shadow-sm ${
              intensity === 'high' ? 'border-rose-200' :
              intensity === 'medium' ? 'border-amber-200' : 'border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 mt-0.5 ${
                  intensity === 'high' ? 'bg-rose-100 text-rose-600' :
                  intensity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'
                }`}>
                  {attempts}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{q.category}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      intensity === 'high' ? 'bg-rose-100 text-rose-600' :
                      intensity === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {attempts} {attempts === 1 ? 'خطأ' : 'أخطاء'}
                    </span>
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed">{q.text}</p>
                  <p className="text-xs text-slate-400 mt-2">
                    <span className="font-medium">الإجابة الصحيحة: </span>
                    <span className="text-emerald-600 font-medium">{q.options[q.correct]}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
