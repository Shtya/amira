'use client';
import { BarChart3, Calendar, CalendarDays, Target, Check, X, Clock, Medal, Flame, Trophy, AlertTriangle } from 'lucide-react';
import { Target as TargetIcon, Trophy as TrophyIcon, Flame as FlameIcon, BookOpen, Star } from 'lucide-react';
import { getDailyStats, getWeeklyStats, getPrevWeeklyStats, getAccuracy, getLevel, BADGES_CONFIG } from '../utils/storage';
import { questions } from '../data/questions';

const BADGE_ICON_MAP = {
  'target': TargetIcon,
  'trophy': TrophyIcon,
  'flame': FlameIcon,
  'book-open': BookOpen,
  'star': Star,
};

function ProgressBar({ value, max = 100, color = 'bg-sky-500', label, subLabel }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      {(label || subLabel) && (
        <div className="flex justify-between mb-1.5">
          {label && <span className="text-xs font-medium text-slate-600">{label}</span>}
          {subLabel && <span className="text-xs text-slate-400">{subLabel}</span>}
        </div>
      )}
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function StatsPanel({ data, onReset }) {
  if (!data) return null;

  const daily = getDailyStats(data);
  const weekly = getWeeklyStats(data);
  const prevWeekly = getPrevWeeklyStats(data);
  const accuracy = getAccuracy(data);
  const level = getLevel(data);
  const totalAnswers = Object.values(data.answers);
  const correctCount = totalAnswers.filter(a => a.status === 'correct').length;
  const wrongCount = totalAnswers.filter(a => a.status === 'wrong').length;
  const totalSolved = totalAnswers.length;
  const totalQ = questions.length;
  const earnedBadges = data.badges || [];
  const allBadges = BADGES_CONFIG();

  const weeklyImprovement = prevWeekly.solved > 0
    ? Math.round(((weekly.solved - prevWeekly.solved) / prevWeekly.solved) * 100)
    : weekly.solved > 0 ? 100 : 0;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Overall progress */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-4 opacity-80">
          <BarChart3 className="w-4 h-4" />
          <h2 className="font-bold text-sm">تقدمك الإجمالي</h2>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-black">{totalSolved}</div>
            <div className="text-xs opacity-80">محلول</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-black">{accuracy}%</div>
            <div className="text-xs opacity-80">دقة</div>
          </div>
          <div className="bg-white/20 rounded-xl p-3 text-center backdrop-blur-sm">
            <div className="text-2xl font-black">{data.streak.current}</div>
            <div className="flex items-center justify-center gap-1 text-xs opacity-80 mt-0.5">
              <Flame className="w-3 h-3" /> سلسلة
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1.5 opacity-80">
            <span>التقدم في الأسئلة</span>
            <span>{totalSolved} / {totalQ}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-700"
              style={{ width: `${(totalSolved / totalQ) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Daily & Weekly */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-slate-500" />
            <h3 className="font-bold text-slate-700 text-sm">اليوم</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">محلول</span>
              <span className="font-bold text-slate-700">{daily.solved}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1 text-emerald-500"><Check className="w-3 h-3" /> صحيح</span>
              <span className="font-bold text-emerald-600">{daily.correct}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1 text-rose-500"><X className="w-3 h-3" /> خطأ</span>
              <span className="font-bold text-rose-600">{daily.wrong}</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <CalendarDays className="w-4 h-4 text-slate-500" />
            <h3 className="font-bold text-slate-700 text-sm">هذا الأسبوع</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">محلول</span>
              <span className="font-bold text-slate-700">{weekly.solved}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-1 text-emerald-500"><Check className="w-3 h-3" /> صحيح</span>
              <span className="font-bold text-emerald-600">{weekly.correct}</span>
            </div>
            <div className="text-xs font-medium mt-1 flex items-center gap-1">
              <span className={weeklyImprovement >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
                {weeklyImprovement >= 0 ? '↑' : '↓'} {Math.abs(weeklyImprovement)}%
              </span>
              <span className="text-slate-400">مقارنة بالأسبوع الماضي</span>
            </div>
          </div>
        </div>
      </div>

      {/* Accuracy bars */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-slate-500" />
          <h3 className="font-bold text-slate-700 text-sm">تفصيل الأداء</h3>
        </div>
        <div className="space-y-3">
          <ProgressBar
            value={correctCount}
            max={totalSolved || 1}
            color="bg-emerald-500"
            label={`إجابات صحيحة (${correctCount})`}
            subLabel={`${totalSolved > 0 ? Math.round((correctCount / totalSolved) * 100) : 0}%`}
          />
          <ProgressBar
            value={wrongCount}
            max={totalSolved || 1}
            color="bg-rose-400"
            label={`إجابات خاطئة (${wrongCount})`}
            subLabel={`${totalSolved > 0 ? Math.round((wrongCount / totalSolved) * 100) : 0}%`}
          />
          <ProgressBar
            value={totalQ - totalSolved}
            max={totalQ}
            color="bg-slate-300"
            label={`لم يُحَل (${totalQ - totalSolved})`}
            subLabel={`${Math.round(((totalQ - totalSolved) / totalQ) * 100)}%`}
          />
        </div>
      </div>

      {/* Level & Streak */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-center">
            <Medal className="w-8 h-8 text-sky-400 mx-auto mb-1" />
            <div className={`font-black text-lg ${level.color}`}>{level.label}</div>
            <div className="text-xs text-slate-400 mt-1">مستواك الحالي</div>
            {level.next && (
              <div className="mt-2">
                <ProgressBar value={totalSolved} max={level.next} color="bg-sky-400" />
                <p className="text-xs text-slate-400 mt-1">{totalSolved}/{level.next} للمستوى التالي</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <div className="text-center">
            <Flame className="w-8 h-8 text-amber-500 mx-auto mb-1" />
            <div className="font-black text-3xl text-amber-500">{data.streak.current}</div>
            <div className="text-xs text-slate-400 mt-1">أيام متتالية</div>
            <div className="text-xs text-amber-500 font-medium mt-1">
              الأعلى: {data.streak.longest} يوم
            </div>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-slate-500" />
          <h3 className="font-bold text-slate-700 text-sm">الشارات</h3>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {allBadges.map(badge => {
            const earned = earnedBadges.includes(badge.id);
            const BadgeIcon = BADGE_ICON_MAP[badge.iconKey] || Star;
            return (
              <div
                key={badge.id}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1.5 border-2 transition-all ${
                  earned
                    ? 'border-amber-300 bg-amber-50 animate-pulse-once'
                    : 'border-slate-100 bg-slate-50 opacity-40'
                }`}
                title={badge.label}
              >
                <BadgeIcon className={`w-5 h-5 mb-0.5 ${earned ? 'text-amber-500' : 'text-slate-400'}`} />
                <span className="text-[9px] text-center text-slate-600 leading-tight font-medium">{badge.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-rose-600" />
          <h3 className="font-bold text-rose-700 text-sm">إعادة تعيين البيانات</h3>
        </div>
        <p className="text-rose-500 text-xs mb-3">سيتم حذف جميع بياناتك ولا يمكن التراجع.</p>
        <button
          onClick={onReset}
          className="bg-rose-500 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-rose-600 active:scale-[0.97]"
        >
          إعادة تعيين كل شيء
        </button>
      </div>
    </div>
  );
}
