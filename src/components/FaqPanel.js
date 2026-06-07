'use client';
import { useState } from 'react';
import {
  ChevronDown, HelpCircle, Building2, Globe, CheckSquare,
  XSquare, FileText, CreditCard, Phone, ShieldCheck, AlertCircle,
} from 'lucide-react';

// ── helpers ──────────────────────────────────────────────────────────────────

function CategoryBadge({ label, color }) {
  return (
    <span className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full ${color} mb-4`}>
      {label}
    </span>
  );
}

function FaqItem({ question, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-white hover:bg-slate-50 transition-colors text-right"
      >
        <span className="font-semibold text-sm text-slate-800 leading-snug flex-1">{question}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-700 leading-relaxed space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

function Bullet({ children }) {
  return (
    <div className="flex gap-2 items-start">
      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5" />
      <span>{children}</span>
    </div>
  );
}

function LinkRow({ label, href, badge }) {
  return (
    <div className="flex flex-col gap-0.5 py-1.5 border-b border-slate-200 last:border-0">
      <div className="flex items-center gap-2">
        <span className="font-bold text-xs bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full shrink-0">{badge}</span>
        <span className="text-xs text-slate-600">{label}</span>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-sky-600 hover:underline break-all"
        dir="ltr"
      >
        {href}
      </a>
    </div>
  );
}

function SectionHeader({ Icon, title, subtitle, gradient }) {
  return (
    <div className={`rounded-2xl p-4 text-white shadow-md ${gradient}`}>
      <div className="flex items-center gap-2 mb-0.5">
        <Icon className="w-5 h-5 shrink-0" />
        <h3 className="font-black text-base">{title}</h3>
      </div>
      {subtitle && <p className="text-sm text-white/70 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FaqPanel() {
  return (
    <div className="space-y-6 pb-10">

      {/* ══════════════════════════════════════════
          PROMETRIC
      ══════════════════════════════════════════ */}
      <SectionHeader
        Icon={ShieldCheck}
        title="امتحان البرومترك"
        subtitle="Prometric Exam — معلومات شاملة"
        gradient="bg-gradient-to-br from-sky-600 to-blue-700"
      />

      <div className="space-y-2">
        <FaqItem question="ما هو امتحان البرومترك؟">
          <p>
            امتحان البرومترك هو امتحان يخضع له الأطباء والصيادلة والممرضون الراغبون في العمل بإحدى الدول العربية كالمملكة العربية السعودية والكويت والإمارات وعمان وقطر. بعد النجاح بالاختبار يحصل الممارس على ترخيص مزاولة المهنة في تلك الدول.
          </p>
          <p>
            بروماتريك هو موقع لحلول الاختبارات المدعومة بالتكنولوجيا لمنظمات الترخيص والشهادات ذات الشهرة العالمية، يُجري أكثر من 7 ملايين اختبار سنوياً في أكثر من 160 دولة حول العالم.
          </p>
        </FaqItem>

        <FaqItem question="المكاتب الرئيسية لامتحان البرومترك">
          <div className="grid grid-cols-2 gap-1.5">
            {[
              'الولايات المتحدة الأمريكية','اليابان','كندا','الهند',
              'الصين','أيرلندا','ماليزيا','كوريا الجنوبية',
              'الإمارات العربية المتحدة','المملكة المتحدة',
            ].map(c => (
              <div key={c} className="flex items-center gap-1.5 text-xs bg-sky-50 text-sky-800 px-2.5 py-1.5 rounded-lg border border-sky-100">
                <span className="w-1.5 h-1.5 bg-sky-400 rounded-full shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </FaqItem>

        <FaqItem question="أهمية امتحان البرومترك">
          <p>
            يتوجب على كل عامل في القطاع الطبي — سواء ممرض أو طبيب أو صيدلي — اجتياز امتحان البرومترك للحصول على ترخيص مزاولة المهنة في: المملكة العربية السعودية، الإمارات العربية المتحدة، قطر، عمان، والكويت.
          </p>
        </FaqItem>

        <FaqItem question="كيفية التقدم للامتحان">
          <Bullet>يجب أولاً حجز موعد وطباعة ورقة التأكيد قبل التوجه لأحد الفروع.</Bullet>
          <Bullet>إحضار أصل الهوية الشخصية الحكومية الخاصة بالمتقدم.</Bullet>
          <Bullet>يجب أن يتطابق الاسم على الهوية مع الاسم الموجود في خطاب التأكيد.</Bullet>
        </FaqItem>

        <FaqItem question="الممنوعات أثناء الخضوع للاختبار">
          {[
            'الطعام والشراب',
            'ارتداء السترات والقبعات',
            'استخدام المعاجم والقواميس',
            'استخدام أي أجهزة إلكترونية',
          ].map(item => <Bullet key={item}>{item}</Bullet>)}
          <p className="text-xs text-slate-500 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
            ملاحظة: إذا كان المتقدم يتناول أدوية دورية (كأدوية السكري) يجب تقديم طلب الموافقة المسبقة إلى بروماتريك قبل شهر على الأقل من تاريخ الاختبار.
          </p>
          <p className="text-xs text-slate-500">
            تتوفر خزائن في مراكز الاختبار لتخزين الأشياء الشخصية. تحتفظ المراكز بالحق في مطالبة الممتحنين بإخراج جيوبهم واستخدام عصا الكشف عن المعادن.
          </p>
        </FaqItem>

        <FaqItem question="نتيجة امتحان البرومترك">
          <p>
            تُسجَّل نتائج الاختبارات الموضوعية عن طريق جهاز الكمبيوتر في مركز الاختبار. ستصلك رسالة بريد إلكتروني خلال أسبوعين من جلسة الامتحان تُعلمك بأن تقرير التقدير متاح على موقع الهيئة.
          </p>
        </FaqItem>

        <FaqItem question="طرق حجز وتغيير موعد أو إلغائه">
          <p>أسرع طريقة هي الحجز عبر الإنترنت متاح على مدار 24 ساعة يومياً / 7 أيام أسبوعياً.</p>
          <Bullet>ابحث عن اسم الاختبار المطلوب ثم اتبع الإرشادات الظاهرة على الشاشة.</Bullet>
          <Bullet>اختر مركز الاختبار الأقرب إليك الذي يتوفر فيه الاختبار.</Bullet>
          <Bullet>أدخل معلوماتك الشخصية ثم أتم الدفع.</Bullet>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            يجب إجراء جميع عمليات الإلغاء أو التغيير قبل يومي عمل كاملين على الأقل من موعدك وإلا تُصادَر جميع الرسوم.
          </p>
        </FaqItem>

        <FaqItem question="المواقع المهمة للحجز والاستعلام">
          <div className="space-y-1">
            <LinkRow badge="SCHS" label="الهيئة السعودية للتخصصات الطبية" href="https://www.prometric.com/ar/test-takers/search/schs" />
            <LinkRow badge="OMSB" label="البرومترك العماني" href="https://www.prometric.com/test-takers/search/omsb" />
            <LinkRow badge="QCHP" label="قطر - وزارة الصحة العامة - إدارة المهن الصحية" href="https://www.prometric.com/test-takers/search/schq2" />
            <LinkRow badge="EMOH" label="وزارة الصحة ووقاية المجتمع الإماراتية" href="https://www.prometric.com/test-takers/search/emoh" />
            <LinkRow badge="DataFlow" label="موقع داتا فلو الرسمي" href="https://www.dataflowgroup.com/ar" />
            <LinkRow badge="ممارس+" label="موقع ممارس بلس" href="https://scfhs.org.sa/ar/Mumares" />
            <LinkRow badge="TrueProfile" label="موقع ترو بروفايل - السيرة الذاتية والتحقق من الوثائق" href="https://sso.trueprofile.io/register?mwr=c3a8922d" />
          </div>
        </FaqItem>
      </div>

      {/* ══════════════════════════════════════════
          MUMARIS PLUS
      ══════════════════════════════════════════ */}
      <SectionHeader
        Icon={Building2}
        title="نظام ممارس بلس"
        subtitle="Mumaris Plus — دليل شامل"
        gradient="bg-gradient-to-br from-emerald-600 to-teal-700"
      />

      <div className="space-y-2">
        <FaqItem question="ما هو نظام ممارس بلس؟">
          <p>
            ممارس بلس هو نظام أنشأته المملكة العربية السعودية لجميع العاملين في القطاع الصحي، يعمل بمثابة تذكير للعاملين بأخلاقيات المهنة وأسسها، كما ينشر قائمة الممنوعين من مزاولة المهنة.
          </p>
          <p>
            أُنشئ النظام عام 2017 في مدينة الرياض، ويهدف إلى رفع كفاءة العاملين في المجال الصحي وحماية المواطنين.
          </p>
        </FaqItem>

        <FaqItem question="خدمات ممارس بلس">
          {[
            'التصنيف المهني من داخل وخارج المملكة',
            'إعادة التصنيف المهني',
            'التسجيل المهني من داخل المملكة',
            'إعادة التسجيل المهني',
            'دراسة مؤهل جديد',
            'إصدار شهادة براءة مهنية',
            'إصدار خطاب تدريب',
            'عرض ساعات وسجل التطوير المهني المستمر (CPD)',
            'الاعتراف بساعات التطوير المهني',
            'الاستفسارات والخدمات الأخرى',
          ].map(s => <Bullet key={s}>{s}</Bullet>)}
        </FaqItem>

        <FaqItem question="كيف أقوم بإنشاء حساب على نظام ممارس بلس؟">
          {[
            'الدخول إلى موقع الهيئة السعودية للتخصصات الطبية.',
            'النقر فوق "إنشاء حساب جديد" وإدخال الاسم الأول والأخير.',
            'إدخال البريد الإلكتروني الشخصي (ليس بريد صاحب العمل).',
            'إعادة كتابة البريد الإلكتروني للتأكيد.',
            'إدخال كلمة المرور وإعادة كتابتها.',
            'قراءة والموافقة على شروط الاستخدام وسياسة الخصوصية.',
            'الضغط على "إنشاء حساب جديد".',
          ].map((s, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="shrink-0 w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full text-xs flex items-center justify-center font-bold">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </FaqItem>

        <FaqItem question="كيف أسجل في ممارس بلس؟">
          {[
            'تسجيل الدخول إلى الموقع ثم النقر فوق "حساب ممارس جديد".',
            'إدخال الاسم الأول واللقب.',
            'إدخال البريد الإلكتروني وتأكيده.',
            'كتابة كلمة المرور وتأكيدها.',
            'وضع علامة اختيار في مربع "أنا لست روبوتاً" ثم النقر فوق تسجيل.',
          ].map((s, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="shrink-0 w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full text-xs flex items-center justify-center font-bold">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </FaqItem>

        <FaqItem question="خطوات استكمال التسجيل في ممارس بلس">
          {[
            'الانتقال إلى نافذة تسجيل الدخول وكتابة البريد الإلكتروني وكلمة المرور.',
            'ملء البيانات الشخصية المطلوبة في حسابك.',
            'للاشتراك في التصنيف: الضغط على "خدماتي" ثم اختيار خدمة "التصنيف المهني".',
            'مراجعة المعلومات الشخصية ووضع بيانات المؤهلات والخبرة.',
            'الضغط على "تقديم الآن" لإتمام التقدم للتصنيف المهني.',
          ].map((s, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="shrink-0 w-5 h-5 bg-emerald-100 text-emerald-700 rounded-full text-xs flex items-center justify-center font-bold">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </FaqItem>

        <FaqItem question="ما هي شروط التسجيل في ممارس بلس؟">
          <Bullet>إصدار خطاب تعريف من جهة العمل قبل تقديم الطلب بثلاثة أشهر على الأقل، من إدارة الموارد البشرية أو الجهة المسؤولة.</Bullet>
          <Bullet>يجب أن يكون لدى مقدم الطلب بطاقة هوية سعودية سارية (أو بطاقة إقامة للمقيمين).</Bullet>
          <Bullet>يجب أن يكون الممارس مسجلاً صحياً وحاملاً بطاقة هوية سارية.</Bullet>
          <Bullet>تقديم تقرير طبي لمن هم فوق 65 سنة.</Bullet>
        </FaqItem>

        <FaqItem question="ما هي الخدمات التي تحتاج إلى توثيق؟">
          <Bullet>خدمة التصنيف المهني.</Bullet>
          <Bullet>خدمة الاعتراف بشهادة براءة مهنية.</Bullet>
          <Bullet>خدمة إعادة التصنيف المهني.</Bullet>
        </FaqItem>

        <FaqItem question="المستندات المطلوب توثيقها">
          <Bullet>المؤهلات العلمية للسعودي الحاصل على شهادات من خارج المملكة.</Bullet>
          <Bullet>المؤهلات العلمية للأجنبي الحاصل على درجة أكاديمية أو إكلينيكية من خارج المملكة.</Bullet>
          <Bullet>الرخصة المهنية الصادرة من المجلس المهني للدولة التي يمارس فيها الشخص مهنته.</Bullet>
          <Bullet>في حالة عدم وجود مجلس مهني يجب تقديم خطاب من وزارة الصحة.</Bullet>
          <Bullet>شهادة خبرة موثقة لا تقل مدتها عن سنة.</Bullet>
        </FaqItem>

        <FaqItem question="كيفية توثيق المستندات">
          <p>يجب توثيق المستندات عبر شركة توثيق داتا فلو قبل تقديم طلبك للهيئة السعودية للتخصصات الطبية.</p>
        </FaqItem>

        <FaqItem question="كيفية دفع رسوم الخدمة">
          <p className="font-semibold text-emerald-700">الرسوم الإدارية:</p>
          <Bullet>تُدفع قبل تقديم الطلب للهيئة السعودية للتخصصات الصحية.</Bullet>
          <Bullet>يمكن دفعها عبر خدمة سداد أو بطاقة ائتمانية.</Bullet>
          <Bullet>يجب الدفع خلال 30 يوماً من إصدار الفاتورة.</Bullet>
          <p className="font-semibold text-emerald-700 mt-2">رسوم الخدمة:</p>
          <Bullet>تُدفع بعد الموافقة المبدئية على الطلب.</Bullet>
          <Bullet>يختار الفرد طريقة الدفع التي تناسبه من حسابه الشخصي.</Bullet>
          <Bullet>يجب الدفع خلال 30 يوماً من تاريخ الموافقة وإلا يُلغى الطلب.</Bullet>
        </FaqItem>

        <FaqItem question="ما هي طريقة استرداد رسوم خدمات ممارس بلس؟">
          <Bullet>لا يحق استرداد الرسوم الإدارية في أي حال.</Bullet>
          <Bullet>لا يحق استرداد رسوم الخدمات التي تم تقديمها أو الاستفادة منها بالفعل.</Bullet>
          <Bullet>إذا تم رفض الطلب لعدم الامتثال لا يمكن استرداد المبلغ.</Bullet>
          <Bullet>يمكن استرداد 50% من الرسوم المدفوعة إذا لم يمر أكثر من شهر على طلب الخدمة.</Bullet>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            لتقديم طلب استرداد: يُقدَّم الطلب عبر التذكرة الإلكترونية، ويُبَلَّغ المتقدم بالموافقة أو الرفض خلال 15 يوم عمل. في حالة الموافقة، يتوجه المتقدم للإدارة المالية في مدة أقصاها 14 يوماً.
          </p>
        </FaqItem>

        <FaqItem question="نصائح عامة لنظام ممارس بلس">
          <Bullet>التحقق من جميع المعلومات المدخلة بشكل صحيح لضمان وضوح البيانات.</Bullet>
          <Bullet>اقرأ الأسئلة المطروحة جيداً قبل الإجابة.</Bullet>
          <Bullet>يمنح النظام حساباً واحداً فقط لكل فرد — يُحظر إنشاء حسابات متعددة.</Bullet>
          <Bullet>يمنح الممارس ثلاث فرص لاجتياز الاختبار؛ المحاولتان الأوليان مجانيتان والثالثة برسوم.</Bullet>
          <Bullet>تقدَّم امتحانات التصنيف المهني للمقيمين خارج المملكة أيضاً بعد الحصول على رقم الأهلية.</Bullet>
        </FaqItem>

        <FaqItem question="التواصل مع خدمة عملاء ممارس بلس">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-emerald-700" dir="ltr">920019393</span>
            </div>
            <Bullet>التواصل عبر الصفحة الرسمية على تويتر.</Bullet>
            <Bullet>البريد: ص.ب 94656 — الرمز البريدي: 11614</Bullet>
            <Bullet>أوقات العمل: الأحد–الخميس، 7:30 صباحاً حتى 3:30 مساءً.</Bullet>
          </div>
        </FaqItem>
      </div>

      {/* ══════════════════════════════════════════
          DATAFLOW
      ══════════════════════════════════════════ */}
      <SectionHeader
        Icon={Globe}
        title="مجموعة داتا فلو"
        subtitle="DataFlow Group — التحقق من الوثائق"
        gradient="bg-gradient-to-br from-violet-600 to-purple-700"
      />

      <div className="space-y-2">
        <FaqItem question="ما هي مجموعة داتا فلو؟">
          <p>
            داتا فلو متخصصة في إجراءات التحقق المتخصص من المصدر (Primary Source Verification)، وتوفر خدمات الامتثال وتدقيق الخلفية للهجرة. تستخدم شبكة واسعة تضم أكثر من 60,000 جهة مصدرة للشهادات في أكثر من 200 دولة ومنطقة.
          </p>
          <p>
            تتعامل سنوياً مع مئات الآلاف من طلبات الامتثال للهجرة نيابةً عن حكومات وجهات تنظيمية وشركات عالمية.
          </p>
        </FaqItem>

        <FaqItem question="كيف أتقدم للحصول على خدمة التحقق من الشهادات والوثائق؟">
          {[
            'زيارة الموقع الإلكتروني: http://www.dfscfhs.com',
            'إنشاء حساب مجموعة داتا فلو.',
            'قراءة التعليمات بانتباه وتحميل الوثائق المطلوبة مع التأكد من وضوحها لتفادي أي تأخير.',
          ].map((s, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span className="shrink-0 w-5 h-5 bg-violet-100 text-violet-700 rounded-full text-xs flex items-center justify-center font-bold">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </FaqItem>

        <FaqItem question="ما هي المعلومات والوثائق التي يجب تقديمها؟">
          <p>تقديم جميع الوثائق ذات الصلة بالعمل الذي تتقدم له كما هو موضح في طلب مجموعة داتا فلو على الموقع.</p>
        </FaqItem>

        <FaqItem question="ما هي الرسوم المطلوبة لتقديم الطلب؟">
          <p>تتفاوت الرسوم تبعاً لعدد الوثائق المحتاجة للتحقق.</p>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
            ملاحظة: الرسوم التي تطلبها مجموعة داتا فلو هي الرسوم الوحيدة المعتمدة خلال فترة تقديم الطلب. إذا طالبت جهة أخرى برسوم إضافية يُرجى إبلاغنا فوراً عبر صفحة "اتصل بنا".
          </p>
        </FaqItem>

        <FaqItem question="هل يمكن تقديم الوثائق في مرحلة لاحقة؟">
          <p>يجب إرفاق جميع المعلومات والوثائق المطلوبة عند تقديم الطلب. أي وثيقة تُقدَّم في مرحلة لاحقة ستخضع لعملية تحقق إضافية وتؤدي إلى تأخير التقرير النهائي.</p>
          <p className="text-xs text-slate-500">للإضافة لاحقاً: الضغط على "الوثائق الإضافية" في طلبك ثم إدخال الرقم المرجعي.</p>
        </FaqItem>

        <FaqItem question="كيف تتم عملية الدفع؟">
          <Bullet>الدفع عبر البطاقة الائتمانية عبر الإنترنت لجميع المتقدمين.</Bullet>
          <Bullet>مقدمو الطلبات من الهند والفلبين بإمكانهم تقديم طلباتهم عبر مراكز الخدمات.</Bullet>
          <p className="text-xs text-violet-700">
            للمزيد: <span dir="ltr" className="font-mono">https://corp.dataflowgroup.com</span>
          </p>
        </FaqItem>

        <FaqItem question="ماذا يحدث بعد تقديم طلبي عبر الإنترنت؟">
          <p>ستقوم مجموعة داتا فلو بإرسال جميع تفاصيل طلبك إلى هيئة التخصصات الصحية للبدء بعملية التحقق. عند الانتهاء:</p>
          <Bullet>المتقدمون الذين يحصلون على تقرير "إيجابي" سيتمكنون من الحصول على رخصة من الهيئة.</Bullet>
          <Bullet>المتقدمون الذين يحصلون على تقرير "سلبي" أو "تعذر التحقق" سيتم رفض طلباتهم.</Bullet>
        </FaqItem>

        <FaqItem question="كيف يمكنني متابعة حالة الطلب؟">
          <p>يمكن متابعة الطلب من خلال إدخال الرقم المرجعي للطلب ورقم جواز السفر على الموقع.</p>
        </FaqItem>

        <FaqItem question="هل يمكن استرداد الرسوم إذا تم رفض طلبي من الهيئة؟">
          <p>يجب تقديم طلب استرداد الرسوم خلال 48 ساعة كحد أقصى من تاريخ الدفع لمجموعة داتا فلو، مع مراجعة معايير الهيئة أولاً للتأكد من أهليتك.</p>
        </FaqItem>

        <FaqItem question='لقد استلمت تقرير "سلبي" أو "تعذر التحقق"، هل يمكن إعادة التحقق؟'>
          <p>نعم. قدِّم طلبك مع رقم المرجع الخاص بطلبك وأي وثائق ومعلومات إضافية مفيدة. سيراجع فريق داتا فلو استفساركم ويردون خلال 48 ساعة.</p>
        </FaqItem>

        <FaqItem question="هل هذه الخدمة إجبارية للحصول على الرخصة؟">
          <p>نعم، الخدمة إجبارية لجميع المهنيين الصحيين؛ الهدف منها تسريع عملية التسجيل وحماية الناس من الاحتيال المهني المحتمل.</p>
        </FaqItem>

        <FaqItem question="لقد نسيت كلمة السر، كيف أستطيع تجديدها؟">
          <Bullet>الضغط على "نسيت كلمة السر" وسيتم إرسال كلمة سر جديدة إلى بريدك الإلكتروني المسجل.</Bullet>
          <Bullet>إذا لم تنجح العملية، أرسل صورة لرسالة الخطأ التي تظهر لك وسيرد فريق داتا فلو.</Bullet>
        </FaqItem>

        <FaqItem question="هل يُسمح بتقديم طلب للحصول على رخصة قبل تأمين عقد عمل؟">
          <p>نعم، يُسمح بتقديم الطلب قبل تأمين عقد عمل، لكن يجب أن تتزامن هذه العملية مع امتحانات البرومترك وإرشادات الهيئة السعودية للتخصصات الصحية.</p>
        </FaqItem>

        <FaqItem question="هل يمكن لشخص آخر تقديم الوثائق بالنيابة عن مقدم الطلب؟">
          <p>تُقبَل الطلبات فقط عبر الإنترنت، ولا تُقبَل أي وثائق لدى مكتب مجموعة داتا فلو. يقوم موظفو المكتب بإرشاد المتقدمين والمؤسسات في العمليات المطلوبة فقط.</p>
        </FaqItem>

        <FaqItem question="هل أستطيع الدخول إلى حسابي لإضافة أو تعديل أو حذف الوثائق التي تم تحميلها؟">
          <p>يمكن الوصول إلى حسابك لإضافة أو تعديل الوثائق من خلال الرقم المرجعي للطلب. للاستفسار عن تفاصيل إضافية تواصل مع فريق الدعم عبر صفحة "اتصل بنا" على موقع داتا فلو.</p>
        </FaqItem>
      </div>

    </div>
  );
}
