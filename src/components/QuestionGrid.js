'use client';
import { questions } from '../data/questions';

function cellStyle(status) {
  if (status === 'correct') return { bg: 'bg-emerald-400', ring: 'ring-emerald-500', text: 'text-white' };
  if (status === 'wrong')   return { bg: 'bg-rose-400',    ring: 'ring-rose-500',    text: 'text-white' };
  return { bg: 'bg-slate-100', ring: 'ring-slate-300', text: 'text-slate-400' };
}

export default function QuestionGrid({ data, onStartQuiz }) {
  const answers = data?.answers || {};

  const total   = questions.length;
  const correct = Object.values(answers).filter(a => a.status === 'correct').length;
  const wrong   = Object.values(answers).filter(a => a.status === 'wrong').length;
  const solved  = correct + wrong;

  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-sm p-4 space-y-3">

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
           <p className="text-xs text-slate-400 mt-0.5">
            اضغط على أي سؤال للبدء منه
          </p>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-slate-100 rounded-lg px-2 py-1 shrink-0">
          {solved} / {total}
        </span>
      </div>

   

      {/* Grid — left-to-right, top-to-bottom, vertical scroll */}
      <div className="overflow-y-auto rounded-xl" style={{ maxHeight: 300 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
            gap: 3,
          }}
        >
          {questions.map(q => {
            const status = answers[q.id]?.status || 'unanswered';
            const { bg, ring, text } = cellStyle(status);
            return (
              <button
                key={q.id}
                title={`#${q.id}${status === 'correct' ? ' ✓' : status === 'wrong' ? ' ✗' : ''}`}
                onClick={() => onStartQuiz('range', { from: q.id })}
                className={`${bg} ${text} hover:ring-2 ${ring} active:scale-90 transition-all duration-75 rounded-md flex items-center justify-center`}
                style={{ height: 36 }}
              >
                <span style={{ fontSize: 9, fontWeight: 700, lineHeight: 1 }}>
                  {q.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom counts */}
      <div className="flex justify-between text-xs font-medium pt-0.5">
        <span className="text-emerald-600">{correct} صحيح</span>
        <span className="text-slate-400">{total - solved} متبقي</span>
        <span className="text-rose-500">{wrong} خطأ</span>
      </div>

    </div>
  );
}
