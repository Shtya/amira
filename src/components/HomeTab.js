'use client';
import { useState } from 'react';
import { Flame, FileText, Check, X, Target, Zap, Calendar, Shuffle, ChevronLeft, List } from 'lucide-react';
import { getAccuracy, getLevel, getDailyStats } from '../utils/storage';
import { questions } from '../data/questions';
import QuestionGrid from './QuestionGrid';

const PAGE_SIZES = [20, 50, 100];

export default function HomeTab({ data, onStartQuiz }) {
  const accuracy = data ? getAccuracy(data) : 0;
  const level = data ? getLevel(data) : { label: 'مبتدئ', color: 'text-slate-500' };
  const daily = data ? getDailyStats(data) : { solved: 0, correct: 0, wrong: 0 };
  const totalSolved = data ? Object.keys(data.answers).length : 0;
  const streak = data?.streak?.current || 0;

  const correctIds = Object.entries(data?.answers || {}).filter(([, v]) => v.status === 'correct').map(([k]) => Number(k));
  const wrongIds = Object.entries(data?.answers || {}).filter(([, v]) => v.status === 'wrong').map(([k]) => Number(k));

  const PAGE_SIZE = 20;

  // Range picker state
  const [showRangePicker, setShowRangePicker] = useState(false);
  const [rangeFrom, setRangeFrom] = useState(1);

  const handleRangeStart = () => {
    const from = Math.max(1, Math.min(rangeFrom, questions.length));
    onStartQuiz('range', { from });
    setShowRangePicker(false);
  };

  const availableFromHere = Math.min(PAGE_SIZE, Math.max(0, questions.length - rangeFrom + 1));

  return (
    <div className="space-y-4 animate-fade-in">
 

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

      {/* Question progress grid */}
      <QuestionGrid data={data} onStartQuiz={onStartQuiz} />

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

        {/* Range picker inline — single "from" input, auto 20 questions */}
        {showRangePicker && (
          <div className="mt-4 bg-white/15 rounded-xl p-4 border border-white/20 animate-fade-in">
            <p className="text-white/90 text-xs font-bold mb-1">ابدأ من أي سؤال؟</p>
            <p className="text-white/60 text-xs mb-3">سيتم عرض {PAGE_SIZE} سؤال تلقائياً</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1">
                <label className="text-white/70 text-xs block mb-1">ابدأ من السؤال رقم</label>
                <input
                  type="number"
                  min={1}
                  max={questions.length}
                  value={rangeFrom}
                  onChange={e => setRangeFrom(Number(e.target.value))}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm font-bold placeholder-white/50 focus:outline-none focus:border-white/60 text-center"
                />
              </div>
              <div className="text-center pt-5">
                <div className="bg-white/20 border border-white/30 rounded-lg px-3 py-2">
                  <p className="text-white/60 text-xs leading-none">حتى</p>
                  <p className="font-black text-white text-sm leading-none mt-0.5">
                    {Math.min(rangeFrom + PAGE_SIZE - 1, questions.length)}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleRangeStart}
              disabled={availableFromHere === 0}
              className="w-full bg-white text-sky-600 font-black py-2.5 rounded-xl text-sm shadow hover:bg-sky-50 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ابدأ ({availableFromHere} سؤال)
            </button>
          </div>
        )}
      </div>
 
 
    </div>
  );
}
