'use client';
import { useState } from 'react';
import { ChevronDown, Info, Brain, Scissors, MapPin, Layers, Circle, AlertTriangle } from 'lucide-react';

// ── Shared accordion section ──────────────────────────────────────────────────
function Section({ title, subtitle, Icon, accentColor = 'bg-indigo-500', defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-slate-700 hover:bg-slate-600 transition-colors text-white"
      >
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 ${accentColor} rounded-lg flex items-center justify-center shrink-0`}>
            <Icon className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="text-right">
            <p className="font-bold text-sm leading-tight">{title}</p>
            {subtitle && <p className="text-xs text-slate-300 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 shrink-0 text-slate-300 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-4 py-4 bg-white">{children}</div>}
    </div>
  );
}

// ── Row with numbered badge ────────────────────────────────────────────────────
function Row({ num, term, desc }) {
  return (
    <div className="flex gap-3 py-2.5 border-b border-slate-100 last:border-0 items-start">
      <span className="shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-black text-indigo-700 mt-0.5">
        {num}
      </span>
      <div className="min-w-0">
        <p className="font-bold text-sm text-slate-800 leading-snug">{term}</p>
        {desc && <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>}
      </div>
    </div>
  );
}

// ── Fractures ─────────────────────────────────────────────────────────────────
function GroupHeader({ label }) {
  return (
    <p className="text-xs font-black text-slate-400 uppercase tracking-wider mt-4 mb-1 first:mt-0 px-0.5 border-b border-slate-100 pb-1">
      {label}
    </p>
  );
}

function FractureRow({ term, desc }) {
  return (
    <div className="flex gap-2 py-2 border-b border-slate-100 last:border-0 items-start">
      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5" />
      <div>
        <span className="font-bold text-sm text-slate-800">{term}</span>
        {desc && <span className="text-xs text-slate-500"> — {desc}</span>}
      </div>
    </div>
  );
}

// ── Lateral view image ────────────────────────────────────────────────────────
function LateralViewImage({ label = 'Lateral View — المنظر الجانبي للجمجمة' }) {
  const [status, setStatus] = useState('loading');
  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
      <p className="text-xs text-center text-slate-600 font-semibold py-2 bg-slate-100 border-b border-slate-200">
        {label}
      </p>
      <div className="relative">
        {status !== 'error' && (
          <img
            src="/lateral%20view.png"
            alt="Lateral View of Skull"
            className={`w-full object-contain max-h-96 transition-opacity duration-300 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
          />
        )}
        {status === 'loading' && (
          <div className="h-52 flex items-center justify-center">
            <div className="w-7 h-7 border-2 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
          </div>
        )}
        {status === 'error' && (
          <div className="h-32 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
            <Layers className="w-6 h-6 opacity-40" />
            <span>ضع الصورة في:</span>
            <code className="font-mono text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
              public/lateral view.png
            </code>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────
export default function InfoPanel() {
  return (
    <div className="space-y-3 pb-8">

      {/* Hero card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-4 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-1">
          <Info className="w-5 h-5 shrink-0" />
          <h2 className="font-black text-base">معلومات عامة مفيدة ومهمة</h2>
        </div>
        <p className="text-sm text-white/70">مرجع سريع للمعلومات التشريحية الأساسية</p>
      </div>

      {/* Lateral view image — directly below hero */}
      <LateralViewImage label="Lateral View of the Skull — المنظر الجانبي للجمجمة" />

      {/* ── 1. Surgical Sutures ── */}
      <Section title="الغرز الجراحية" subtitle="Surgical Sutures" Icon={Scissors} accentColor="bg-sky-500" defaultOpen>
        <Row num={1} term="Coronal Suture" desc="Divided Between Frontal And Parietal Bones" />
        <Row num={2} term="Sagittal Suture" desc="Divided Between The Parietal Bone Right & Left" />
        <Row num={3} term="Lambdoid Suture" desc="Divided Between The Occipital And Parietal Sutures" />
        <Row num={4} term="Temporal (Squamosal) Suture" desc="Divided Between The Temporal Bone And The Parietal" />
      </Section>

      {/* ── 2. Points Between Sutures ── */}
      <Section title="النقاط بين الغرز" subtitle="Points Between Sutures" Icon={MapPin} accentColor="bg-violet-500">
        <Row num={1} term="Bregma (Anterior)" desc="Junction Between The Coronal And Sagittal Sutures" />
        <Row num={2} term="Lambda (Posterosuperior)" desc="Junction Between The Lambdoid Suture And The Sagittal Suture" />
        <Row num={3} term="Pterion (Frontal-Sphenoidal)" desc="Junction Between Coronal Suture And Temporal (Squamosal) Suture" />
        <Row num={4} term="Asterion (Posterior Mastoid)" desc="Junction Between The Lambdoid Suture And The Temporal Suture" />
      </Section>

      {/* ── 3. Cranial Bones ── */}
      <Section title="مفصلات عظام الجمجمة" subtitle="Cranial Bone Articulations" Icon={Brain} accentColor="bg-emerald-500">
        <Row num={1} term="Frontal" desc="Four Cranial Bones (Right & Left Parietals, Sphenoid, Ethmoid) + Eight Facial Bones" />
        <Row num={2} term="Parietal" desc="Five Cranial Bones (Frontal, Occipital, Temporal, Sphenoid, Opposite Parietal)" />
        <Row num={3} term="Occipital" desc="Six Bones: Two Parietals + Two Temporals + Sphenoid + Atlas (First Cervical Vertebra)" />
        <Row num={4} term="Temporal" desc="Three Cranial Bones (Parietal, Occipital, Sphenoid)" />
        <Row num={5} term="Sphenoid" desc="All Seven Other Cranial Bones + Five Facial Bones" />
        <Row num={6} term="Ethmoid" desc="Two Cranial Bones (Frontal And Sphenoid) + Eleven Facial Bones" />
      </Section>

      {/* ── 4. Facial Bones ── */}
      <Section title="مفصلات عظام الوجه" subtitle="Facial Bone Articulations" Icon={Layers} accentColor="bg-teal-500">
        <Row num={1} term="Maxillae" desc="Two Cranial Bones (Frontal & Ethmoid) + Seven Facial Bones" />
        <Row num={2} term="Zygomatic" desc="Three Cranial Bones (Frontal, Sphenoid, Temporal) + One Facial Bone (Maxilla)" />
        <Row num={3} term="Lacrimal" desc="Two Cranial Bones (Frontal & Ethmoid) + Two Facial Bones (Maxilla & Inferior Nasal Concha)" />
        <Row num={4} term="Nasal" desc="Two Cranial Bones (Frontal & Ethmoid) + Two Facial Bones (Maxilla & Adjacent Nasal Bone)" />
        <Row num={5} term="Inferior Nasal Conchae" desc="One Cranial Bone (Ethmoid) + Three Facial Bones (Maxilla, Lacrimal, Palatine)" />
        <Row num={6} term="Palatine" desc="Two Cranial Bones (Sphenoid & Ethmoid) + Four Facial Bones" />
        <Row num={7} term="Vomer" desc="Two Cranial Bones (Sphenoid & Ethmoid) + Four Facial Bones + Septal Cartilage" />
      </Section>

      {/* ── 5. Circle of Willis ── */}
      <Section title="دائرة ويليس" subtitle="Circle of Willis" Icon={Circle} accentColor="bg-amber-500">
        <div className="divide-y divide-slate-100">
          <div className="flex gap-3 py-2.5 items-center">
            <span className="shrink-0 text-xs font-black text-indigo-600 w-12">Start</span>
            <p className="text-sm text-slate-700">Posterior Inferior Cerebral Artery</p>
          </div>
          <div className="flex gap-3 py-2.5 items-center">
            <span className="shrink-0 text-xs font-black text-indigo-600 w-12">End</span>
            <p className="text-sm text-slate-700">Anterior Superior Cerebral Artery</p>
          </div>
        </div>
      </Section>

      {/* ── 6. All Types of Fractures ── */}
      <Section title="أنواع الكسور" subtitle="All Types of Fractures" Icon={AlertTriangle} accentColor="bg-rose-500">
        <GroupHeader label="General" />
        <FractureRow term="Monteggia" desc="Fracture Ulna & Displacement Head Radius" />
        <FractureRow term="Depressed / Ping-Pong" desc="In Skull" />
        <FractureRow term="Stress" desc="Fracture Due Repeat Stress" />
        <FractureRow term="Stellate" desc="Lines Radiate From Centre (Classic In Patella)" />
        <FractureRow term="Trimalleolar" desc="Fracture In The Medial & Lateral Malleoli" />
        <FractureRow term="Tuft / Burst" desc="Comminuted DP Fracture Due To Crush Injury" />
        <FractureRow term="Closed / Simple" desc="No Communication Between Fracture Site And Skin Surface" />
        <FractureRow term="Open / Compound" desc="Wound Extends From Skin Surface To Fracture" />
        <FractureRow term="Lisfranc" desc="Fracture In One Or All Metatarso-Tarsal Joints, Displacement Of Tarsus" />
        <FractureRow term="Baseball / Mallet" desc="DPJ Due To Ball Hitting" />
        <FractureRow term="Hutchinson" desc="Fracture In Radial Styloid Process" />

        <GroupHeader label="Tibia / Fibula" />
        <FractureRow term="Bumper" desc="Fracture Of The Lateral Tibial Plateau Due To Car Bumper Impact" />
        <FractureRow term="Segond" desc="Avulsion Fracture Of The Lateral Tibial Condyle" />
        <FractureRow term="Gosselin" desc="V-Shaped Fracture Of The Tibia Into Anterior And Posterior Fragments" />
        <FractureRow term="Toddler's" desc="Undisplaced Spiral Fracture Of The Distal Third To Distal Half Of The Tibia" />

        <GroupHeader label="Fibula / Ankle" />
        <FractureRow term="Maisonneuve" desc="Spiral Fracture Of The Proximal Third Of The Fibula" />
        <FractureRow term="Bosworth" desc="Fracture Of The Proximal Fibula Due To Severe External Rotation Of The Ankle" />
        <FractureRow term="Pott" desc="Fracture Of Distal Fibula & Malleolus, Injury In Ankle" />

        <GroupHeader label="Hand / Foot (Metacarpals)" />
        <FractureRow term="Rolando" desc="Comminuted MCJ (Base Of 1st Metacarpal)" />
        <FractureRow term="Bennett's" desc="Extends From MCJ To CMCJ" />
        <FractureRow term="Boxer's" desc="Neck Of Metacarpal (In Hand)" />
        <FractureRow term="Jones" desc="Proximal Metacarpal (In Foot — 5th Metatarsal)" />

        <GroupHeader label="Radius / Ulna / Wrist" />
        <FractureRow term="Essex-Lopresti" desc="Fracture Of Radial Head + Dislocation Of Distal Radio-Ulnar Joint + Disruption Of Interosseous Membrane" />
        <FractureRow term="Galeazzi" desc="Fracture Of Radial Shaft + Dislocation Of Distal Radio-Ulnar Joint" />
        <FractureRow term="Colles'" desc="Distal Radius Fracture With Dorsal (Posterior) Displacement — 'Dinner Fork' Deformity" />
        <FractureRow term="Smith's" desc="Distal Radius Fracture With Volar (Anterior) Displacement — Reverse Colles'" />
        <FractureRow term="Barton's" desc="Intra-Articular Fracture Of The Distal Radius" />

        <GroupHeader label="Spine" />
        <FractureRow term="Jefferson" desc="C1 Burst Fracture" />
        <FractureRow term="Hangman's" desc="C2–C3 Bilateral Pedicle Fracture" />
        <FractureRow term="Flexion Teardrop" desc="Cervical Spine — Severe Flexion Injury" />
        <FractureRow term="Subluxation" desc="C5 (Unilateral Or Bilateral Facet)" />
        <FractureRow term="Compression" desc="Vertebral Body Compression" />
        <FractureRow term="Holdsworth" desc="Thoracolumbar Junction Fracture" />
      </Section>

    </div>
  );
}
