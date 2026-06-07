'use client';
import { Target, Trophy, Flame, BookOpen, Star } from 'lucide-react';
import { BADGES_CONFIG } from '../utils/storage';

const BADGE_ICON_MAP = {
  'target': Target,
  'trophy': Trophy,
  'flame': Flame,
  'book-open': BookOpen,
  'star': Star,
};

export default function BadgeToast({ badgeId }) {
  if (!badgeId) return null;
  const badge = BADGES_CONFIG().find(b => b.id === badgeId);
  if (!badge) return null;

  const BadgeIcon = BADGE_ICON_MAP[badge.iconKey] || Star;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce-in pointer-events-none">
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
        <BadgeIcon className="w-8 h-8 text-white shrink-0" />
        <div>
          <p className="text-xs opacity-80 font-medium">شارة جديدة!</p>
          <p className="font-black text-base">{badge.label}</p>
        </div>
      </div>
    </div>
  );
}
