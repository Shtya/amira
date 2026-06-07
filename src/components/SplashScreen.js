'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import bearAnimation from '../animations/bear.json';

const SENTENCES = [
  'اللي ناقص وصل 🤍', 'كل التفاصيل دي كانت مستنياكِ ✨',
  'المكان ده صنعته عشانك 🌸', 'الدنيا بخير، جيتِ 💫',
  'وأخيراً جيتِ 🤍', 'أهلاً بأحلى حاجة في الدنيا ✨',
  'بيتك التاني هنا 🌸', 'أهلاً بالقلب 🤍',
  'نورتِ يا ستي ✨', 'حياكِ الله يا أميرة 💫',
];

const STORAGE_KEY = 'amira_splash_idx';

function getNextSentence() {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    const cur = s !== null ? parseInt(s, 10) : -1;
    const nxt = (cur + 1) % SENTENCES.length;
    localStorage.setItem(STORAGE_KEY, String(nxt));
    return SENTENCES[nxt];
  } catch { return SENTENCES[0]; }
}

let _initialized = false;

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const [sentence, setSentence] = useState('');

  useEffect(() => {
    if (_initialized) return;
    _initialized = true;
    setSentence(getNextSentence());
    setVisible(true);

    setTimeout(() => setFading(true), 2800);
    setTimeout(() => setVisible(false), 3800);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 45%, #fb923c 100%)' }}
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Bear Lottie animation */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 160, damping: 18 }}
        className="z-10 w-56 h-56"
      >
        <Lottie
          animationData={bearAnimation}
          loop
          autoplay
          style={{ width: '100%', height: '100%' }}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-6xl font-black text-white mb-3 drop-shadow-lg z-10"
        style={{ fontFamily: "'Cairo', sans-serif" }}
      >
        أميرة
      </motion.h1>

      {/* Rotating sentence */}
      <motion.p
        key={sentence}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="text-white/90 text-lg font-semibold text-center px-8 z-10"
      >
        {sentence}
      </motion.p>

      {/* Progress bar */}
      <div className="absolute bottom-14 w-56 h-1.5 bg-white/30 rounded-full overflow-hidden z-10">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 3.2, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}
