'use client';
import { useState } from 'react';
import { BookOpen, List, XCircle, Bookmark, FlaskConical } from 'lucide-react';
import { questions } from '../data/questions';

export default function ExamPanel({ data, onStart }) {
  const wrongCount = Object.values(data?.answers || {}).filter(a => a.status === 'wrong').length;
  const reviewCount = data?.reviewList?.length || 0;

  const [showRangeConfig, setShowRangeConfig] = useState(false);
  const [rangeFrom, setRangeFrom] = useState(1);

  const PAGE_SIZE = 20;

  const handleRangeStart = () => {
    const from = Math.max(1, Math.min(rangeFrom, questions.length));
    onStart('range', { from });
    setShowRangeConfig(false);
  };

  const availableFromHere = Math.min(PAGE_SIZE, Math.max(0, questions.length - rangeFrom + 1));

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

      {/* Range config panel — single "from" input, auto-picks 20 questions */}
      {showRangeConfig && (
        <div className="bg-violet-50 border-2 border-violet-300 rounded-2xl p-5 shadow-sm animate-fade-in">
          <h3 className="font-bold text-violet-800 text-sm mb-1">ابدأ من أي سؤال؟</h3>
          <p className="text-xs text-violet-500 mb-4">سيتم عرض {PAGE_SIZE} سؤال ابتداءً من الرقم الذي تختاره</p>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1">
              <label className="text-xs font-medium text-violet-700 block mb-1.5">ابدأ من السؤال رقم</label>
              <input
                type="number"
                min={1}
                max={questions.length}
                value={rangeFrom}
                onChange={e => setRangeFrom(Number(e.target.value))}
                className="w-full border-2 border-violet-200 rounded-xl px-3 py-2.5 text-slate-800 text-sm font-bold focus:outline-none focus:border-violet-400 bg-white text-center"
              />
            </div>
            <div className="text-center pt-5">
              <div className="bg-violet-100 border border-violet-200 rounded-xl px-3 py-2.5">
                <p className="text-xs text-violet-500 leading-none">حتى</p>
                <p className="font-black text-violet-700 text-sm leading-none mt-0.5">
                  {Math.min(rangeFrom + PAGE_SIZE - 1, questions.length)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-violet-100 rounded-xl px-3 py-2 mb-4">
            <span className="text-xs text-violet-600 font-medium">عدد الأسئلة المتاحة</span>
            <span className="font-black text-violet-700 text-sm">{availableFromHere} سؤال</span>
          </div>

          <button
            onClick={handleRangeStart}
            disabled={availableFromHere === 0}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2.5 rounded-xl font-bold text-sm shadow hover:shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ابدأ الاختبار
          </button>
        </div>
      )}
    </div>
  );
}
