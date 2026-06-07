'use client';
import { BookOpen, Flame, Target, HelpCircle, FlaskConical, Bookmark, BarChart3, AlertTriangle, Info, MessageCircleQuestion } from 'lucide-react';
import { getAccuracy, getLevel } from '../utils/storage';

const TAB_ICONS = {
  quiz: HelpCircle,
  exam: FlaskConical,
  review: Bookmark,
  stats: BarChart3,
  weak: AlertTriangle,
  info: Info,
  faq: MessageCircleQuestion,
};

export default function Header({ data, onTabChange, activeTab }) {
  const accuracy = data ? getAccuracy(data) : 0;
  const level = data ? getLevel(data) : { label: 'مبتدئ', color: 'text-slate-500' };
  const streak = data?.streak?.current || 0;

  const tabs = [
    { id: 'quiz', label: 'الاختبار' },
    { id: 'exam', label: 'الامتحانات' },
    { id: 'review', label: 'المراجعة' },
    { id: 'stats', label: 'إحصائياتي' },
    { id: 'weak', label: 'نقاط الضعف' },
    { id: 'info', label: 'المراجع' },
    { id: 'faq', label: 'البرومترك' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      {/* Top bar */}
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow">
            <BookOpen className="w-4 h-4" />
          </div>
          <h1 className="text-sm font-bold text-slate-800">منصة الاختبارات</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-100 rounded-full px-3 py-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-amber-600">{streak}</span>
            <span className="text-xs text-amber-500 hidden sm:block">يوم</span>
          </div>

          {/* Accuracy */}
          <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
            <Target className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-bold text-emerald-600">{accuracy}%</span>
          </div>

          {/* Level */}
          <div className="hidden md:flex items-center gap-1.5 bg-sky-50 border border-sky-100 rounded-full px-3 py-1.5">
            <span className="text-xs font-bold text-sky-600">{level.label}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-5xl mx-auto px-4 pb-0">
        <div className="flex gap-1 overflow-x-auto pb-0" style={{ scrollbarWidth: 'none' }}>
          {tabs.map(tab => {
            const Icon = TAB_ICONS[tab.id];
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-sky-600 border-sky-500'
                    : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
