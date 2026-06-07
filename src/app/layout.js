import './globals.css';

export const metadata = {
  title: 'منصة الاختبارات الذكية',
  description: 'نظام تعلم عربي تفاعلي ذكي',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-50 min-h-screen" style={{ fontFamily: "'Cairo', 'Tajawal', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
