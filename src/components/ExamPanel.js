'use client';
import { useState } from 'react';
import { BookOpen, List, XCircle, Bookmark, FlaskConical } from 'lucide-react';
import { questions } from '../data/questions';

export default function ExamPanel({ data, onStart }) {
  const wrongCount = Object.values(data?.answers || {}).filter(a => a.status === 'wrong').length;
  const reviewCount = data?.reviewList?.length || 0;

  const [showRangeConfig, setShowRangeConfig] = useState(false);
  const [rangeFrom, setRangeFrom] = useState(1);
  const [rangeTo, setRangeTo] = useState(Math.min(50, questions.length));

  const handleRangeStart = () => {
    const from = Math.max(1, Math.min(rangeFrom, questions.length));
    const to = Math.max(from, Math.min(rangeTo, questions.length));
    onStart('range', { from, to });
    setShowRangeConfig(false);
  };

  const examModes = [
    {
      id: 'all',
      Icon: BookOpen,
      iconColor: 'text-sky-600',
      title: 'جميع الأسئلة',
      desc: `حل جميع الأسئلة (${questions.length} سؤال)`,
      borderColor: 'border-sky-200',
      bgColor: 'bg-sky-50',
      action: () => onStart('all'),
      disabled: false,
    },
    {
      id: 'range',
      Icon: List,
      iconColor: 'text-violet-600',
      title: 'اختبار حسب النطاق',
      desc: 'اختر من → إلى واختبر نطاقاً محدداً',
      borderColor: showRangeConfig ? 'border-violet-400' : 'border-violet-200',
      bgColor: 'bg-violet-50',
      action: () => setShowRangeConfig(v => !v),
      disabled: false,
    },
    {
      id: 'wrong',
      Icon: XCircle,
      iconColor: 'text-rose-600',
      title: 'أسئلة الأخطاء',
      desc: wrongCount > 0 ? `لديك ${wrongCount} سؤال خاطئ` : 'لا توجد أخطاء بعد',
      borderColor: 'border-rose-200',
      bgColor: 'bg-rose-50',
      action: () => wrongCount > 0 && onStart('wrong'),
      disabled: wrongCount === 0,
    },
    {
      id: 'review',
      Icon: Bookmark,
      iconColor: 'text-amber-600',
      title: 'قائمة المراجعة',
      desc: reviewCount > 0 ? `لديك ${reviewCount} سؤال للمراجعة` : 'لم تضف أسئلة بعد',
      borderColor: 'border-amber-200',
      bgColor: 'bg-amber-50',
      action: () => reviewCount > 0 && onStart('review'),
      disabled: reviewCount === 0,
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3">
        <FlaskConical className="w-5 h-5 text-slate-500" />
        <div>
          <h2 className="font-bold text-slate-800 text-base leading-none">أوضاع الامتحان</h2>
          <p className="text-slate-400 text-xs mt-0.5">اختر الوضع المناسب لك</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {examModes.map(mode => (
          <button
            key={mode.id}
            onClick={mode.action}
            disabled={mode.disabled}
            className={`${mode.bgColor} border-2 ${mode.borderColor} rounded-2xl p-4 text-right transition-all hover:shadow-md active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <mode.Icon className={`w-8 h-8 mb-2 ${mode.iconColor}`} />
            <div className="font-bold text-slate-800 text-sm">{mode.title}</div>
            <div className="text-xs text-slate-500 mt-1 leading-relaxed">{mode.desc}</div>
          </button>
        ))}
      </div>

      {/* Range config panel — shown when range card is selected */}
      {showRangeConfig && (
        <div className="bg-violet-50 border-2 border-violet-300 rounded-2xl p-5 shadow-sm animate-fade-in">
          <h3 className="font-bold text-violet-800 text-sm mb-4">اختر نطاق الأسئلة</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs font-medium text-violet-700 block mb-1.5">من سؤال</label>
              <input
                type="number"
                min={1}
                max={questions.length}
                value={rangeFrom}
                onChange={e => setRangeFrom(Number(e.target.value))}
                className="w-full border-2 border-violet-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm font-bold focus:outline-none focus:border-violet-400 bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-violet-700 block mb-1.5">إلى سؤال</label>
              <input
                type="number"
                min={rangeFrom}
                max={questions.length}
                value={rangeTo}
                onChange={e => setRangeTo(Number(e.target.value))}
                className="w-full border-2 border-violet-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm font-bold focus:outline-none focus:border-violet-400 bg-white"
              />
            </div>
          </div>
          <p className="text-xs text-violet-600 mb-4 font-medium">
            عدد الأسئلة: {Math.max(0, Math.min(rangeTo, questions.length) - Math.max(1, rangeFrom) + 1)} سؤال
          </p>
          <button
            onClick={handleRangeStart}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2.5 rounded-xl font-bold text-sm shadow hover:shadow-md active:scale-[0.98]"
          >
            ابدأ الاختبار
          </button>
        </div>
      )}
    </div>
  );
}
