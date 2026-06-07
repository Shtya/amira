'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const SPLASH_KEY = 'quiz_splash_shown_v1';

// Module-level flags survive React StrictMode's double-effect cycle.
// useRef would be reset; module variables are not.
let _initialized = false;
let _isVisible = false;
let _isFading = false;

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (_initialized) {
      // StrictMode second run — just sync state from module flags
      if (_isVisible) {
        setVisible(true);
        setFading(_isFading);
      }
      return;
    }
    _initialized = true;

    const shown = localStorage.getItem(SPLASH_KEY);
    if (shown) return;

    localStorage.setItem(SPLASH_KEY, '1');
    _isVisible = true;
    setVisible(true);
 
    setTimeout(() => { _isFading = true; setFading(true); }, 2400);
    setTimeout(() => { _isVisible = false; setVisible(false); }, 4000); 
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 45%, #fb923c 100%)' }}
      animate={{ opacity: fading ? 0 : 1, scale: fading ? 1.03 : 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 18 }}
        className="text-center px-8 z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="flex justify-center mb-7"
        >
          <Heart className="w-28 h-28 text-white fill-white drop-shadow-xl" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-6xl font-black text-white mb-4 drop-shadow-lg"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          أميرة
        </motion.h1>

        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex items-center justify-center gap-2.5 text-white/90 text-lg font-semibold"
        >
          <Sparkles className="w-5 h-5 shrink-0" />
          <span>أهلاً وسهلاً بكِ      </span>
          <Sparkles className="w-5 h-5 shrink-0" />
        </motion.div>
 
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-14 w-56 h-1.5 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
