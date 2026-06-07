'use client';
import { useState } from 'react';
import { Flame, FileText, Check, X, Target, Zap, Calendar, Shuffle, ChevronLeft, List } from 'lucide-react';
import { getAccuracy, getLevel, getDailyStats } from '../utils/storage';
import { questions } from '../data/questions';

const PAGE_SIZES = [20, 50, 100];

export default function HomeTab({ data, onStartQuiz }) {
  const accuracy = data ? getAccuracy(data) : 0;
  const level = data ? getLevel(data) : { label: 'مبتدئ', color: 'text-slate-500' };
  const daily = data ? getDailyStats(data) : { solved: 0, correct: 0, wrong: 0 };
  const totalSolved = data ? Object.keys(data.answers).length : 0;
  const streak = data?.streak?.current || 0;

  const correctIds = Object.entries(data?.answers || {}).filter(([, v]) => v.status === 'correct').map(([k]) => Number(k));
  const wrongIds = Object.entries(data?.answers || {}).filter(([, v]) => v.status === 'wrong').map(([k]) => Number(k));

  // Range picker state
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [rangeFrom, setRangeFrom] = useState(1);
  const [rangeTo, setRangeTo] = useState(Math.min(20, questions.length));

  // Question viewer pagination
  const [visibleCount, setVisibleCount] = useState(20);
  const [pageSize, setPageSize] = useState(20);

  const handleRangeStart = () => {
    const from = Math.max(1, Math.min(rangeFrom, questions.length));
    const to = Math.max(from, Math.min(rangeTo, questions.length));
    onStartQuiz('range', { from, to });
    setShowRangePicker(false);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Streak banner */}
      {streak > 0 && (
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 text-white shadow-md animate-slide-up">
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 text-white shrink-0" />
            <div>
              <p className="font-bold text-sm">سلسلة رائعة!</p>
              <p className="text-white/80 text-xs">{streak} يوم دراسة متتالي. استمر!</p>
            </div>
          </div>
        </div>
      )}

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { Icon: FileText, value: totalSolved, label: 'محلول', color: 'bg-sky-50 text-sky-600', iconColor: 'text-sky-500' },
          { Icon: Check, value: correctIds.length, label: 'صحيح', color: 'bg-emerald-50 text-emerald-600', iconColor: 'text-emerald-500' },
          { Icon: X, value: wrongIds.length, label: 'خطأ', color: 'bg-rose-50 text-rose-600', iconColor: 'text-rose-500' },
          { Icon: Target, value: `${accuracy}%`, label: 'دقة', color: 'bg-violet-50 text-violet-600', iconColor: 'text-violet-500' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.color} rounded-xl p-3 text-center border border-current/10`}>
            <stat.Icon className={`w-4 h-4 mx-auto mb-1 ${stat.iconColor}`} />
            <div className="text-base font-black">{stat.value}</div>
            <div className="text-xs opacity-70 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Start quiz CTA */}
      <div className="bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-black mb-1">ابدأ الاختبار الآن!</h2>
            <p className="text-white/70 text-sm">
              {questions.length - totalSolved > 0
                ? `${questions.length - totalSolved} سؤال لم يُحَل بعد`
                : 'أتممت جميع الأسئلة!'}
            </p>
          </div>
          <Zap className="w-10 h-10 text-white/80 shrink-0" />
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/70 mb-1.5">
            <span>التقدم الكلي</span>
            <span>{totalSolved}/{questions.length}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${(totalSolved / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onStartQuiz('all')}
            className="flex-1 bg-white text-sky-600 font-black py-3 rounded-xl text-sm shadow-lg hover:bg-sky-50 active:scale-[0.97]"
          >
            كل الأسئلة
          </button>
          <button
            onClick={() => setShowRangePicker(v => !v)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white/20 text-white font-bold py-3 rounded-xl text-sm border border-white/30 hover:bg-white/30 active:scale-[0.97]"
          >
            <Shuffle className="w-4 h-4" />
            <span>نطاق محدد</span>
          </button>
        </div>

        {/* Range picker inline */}
        {showRangePicker && (
          <div className="mt-4 bg-white/15 rounded-xl p-4 border border-white/20 animate-fade-in">
            <p className="text-white/90 text-xs font-bold mb-3">اختر نطاق الأسئلة</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-white/70 text-xs block mb-1">من سؤال</label>
                <input
                  type="number"
                  min={1}
                  max={questions.length}
                  value={rangeFrom}
                  onChange={e => setRangeFrom(Number(e.target.value))}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm font-bold placeholder-white/50 focus:outline-none focus:border-white/60"
                />
              </div>
              <div>
                <label className="text-white/70 text-xs block mb-1">إلى سؤال</label>
                <input
                  type="number"
                  min={rangeFrom}
                  max={questions.length}
                  value={rangeTo}
                  onChange={e => setRangeTo(Number(e.target.value))}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm font-bold placeholder-white/50 focus:outline-none focus:border-white/60"
                />
              </div>
            </div>
            <button
              onClick={handleRangeStart}
              className="w-full bg-white text-sky-600 font-black py-2.5 rounded-xl text-sm shadow hover:bg-sky-50 active:scale-[0.97]"
            >
              ابدأ ({Math.max(0, Math.min(rangeTo, questions.length) - Math.max(1, rangeFrom) + 1)} سؤال)
            </button>
          </div>
        )}
      </div>

      {/* All questions viewer */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <List className="w-4 h-4 text-slate-500" />
            <h3 className="font-bold text-slate-700 text-sm">حالة جميع الأسئلة</h3>
            <span className="text-xs text-slate-400">({questions.length})</span>
          </div>
          <select
            value={pageSize}
            onChange={e => { setPageSize(Number(e.target.value)); setVisibleCount(Number(e.target.value)); }}
            className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-600 bg-slate-50 focus:outline-none focus:border-sky-300"
          >
            {PAGE_SIZES.map(n => (
              <option key={n} value={n}>{n} لكل مرة</option>
            ))}
          </select>
        </div>

        <div className="overflow-y-auto max-h-72 divide-y divide-slate-50">
          {questions.slice(0, visibleCount).map(q => {
            const ans = data?.answers[q.id];
            const status = ans?.status;
            return (
              <button
                key={q.id}
                onClick={() => onStartQuiz('range', { from: q.id, to: q.id })}
                className="w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                  status === 'correct'
                    ? 'bg-emerald-100 text-emerald-700'
                    : status === 'wrong'
                    ? 'bg-rose-100 text-rose-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {q.id}
                </span>
                <span className="flex-1 text-xs text-slate-700 text-right leading-snug line-clamp-1">{q.text}</span>
                {status === 'correct' && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                {status === 'wrong' && <X className="w-3.5 h-3.5 text-rose-400 shrink-0" />}
                {!status && <ChevronLeft className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
              </button>
            );
          })}
        </div>

        {visibleCount < questions.length && (
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
            <button
              onClick={() => setVisibleCount(c => Math.min(c + pageSize, questions.length))}
              className="w-full text-xs font-bold text-sky-600 hover:text-sky-700 py-1"
            >
              تحميل المزيد ({Math.min(pageSize, questions.length - visibleCount)} سؤال)
            </button>
          </div>
        )}

        {/* Legend */}
        <div className="flex gap-4 px-4 py-2.5 border-t border-slate-100 bg-slate-50/50">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-3 h-3 rounded bg-emerald-200 inline-block"></span> صحيح
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-3 h-3 rounded bg-rose-200 inline-block"></span> خطأ
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-3 h-3 rounded bg-slate-200 inline-block"></span> لم يُحَل
          </span>
        </div>
      </div>

      {/* Today's stats */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-slate-500" />
          <h3 className="font-bold text-slate-700 text-sm">إنجازات اليوم</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="text-xl font-black text-sky-600">{daily.solved}</div>
            <div className="text-xs text-slate-400">محلول</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-emerald-600">{daily.correct}</div>
            <div className="text-xs text-slate-400">صحيح</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-black text-rose-600">{daily.wrong}</div>
            <div className="text-xs text-slate-400">خطأ</div>
          </div>
        </div>
      </div>
    </div>
  );
}
