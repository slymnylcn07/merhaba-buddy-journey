import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { InfoBox, StatHighlight, TipsList } from "@/components/ArticleCharts";
import PremiumCTA from "@/components/PremiumCTA";
import type { ArticleExport } from "./types";

import heroImage from "@/assets/article-hero-knee-pain-squatting.jpg";

const faqs = [
  {
    question: "Why do my knees hurt when squatting?",
    answer: "Squatting requires deep knee flexion, which compresses the kneecap against the thigh bone with significant force — often 6–8 times your body weight at the deepest point. If your quadriceps are tight, your glutes are weak, or your form places excessive forward pressure, the knee joint absorbs more stress than it can comfortably handle.",
  },
  {
    question: "Is knee pain when squatting normal?",
    answer: "Mild discomfort during squats is common, especially if you're new to the movement or returning after a break. However, persistent or sharp pain during every squat — particularly with swelling, clicking, or instability — is not normal and should be evaluated by a healthcare professional.",
  },
  {
    question: "Why do I feel sharp knee pain during squats?",
    answer: "Sharp pain during squats may be related to increased patellar tendon stress, meniscus irritation, or cartilage pressure — especially at deeper angles. A sudden increase in training intensity or squatting too deep without adequate preparation can trigger these sharp sensations.",
  },
  {
    question: "How can I fix knee pain when squatting?",
    answer: "Focus on improving squat mechanics: keep your knees tracking over your toes, engage your glutes and hips, keep heels planted firmly, and control squat depth. Strengthening your glutes and improving ankle mobility can also reduce knee stress. Start with partial-range squats and gradually increase depth over time.",
  },
  {
    question: "Can squats damage the knees?",
    answer: "When performed with proper form and appropriate load, squats are generally considered safe and beneficial for knee health. Damage risk increases with poor mechanics — such as knees collapsing inward, excessive forward lean, or sudden heavy loading without preparation. Gradual progression is key.",
  },
  {
    question: "Is knee pain during squats related to meniscus problems?",
    answer: "It can be. The meniscus absorbs compressive forces during squatting, and irritation or tears can cause pain — particularly on the inner or outer knee. Meniscus-related discomfort often includes catching, clicking, or a locking sensation during deep knee bending.",
  },
  {
    question: "What squat adjustments reduce knee pain?",
    answer: "Widening your stance slightly, turning toes outward 15–30 degrees, keeping heels firmly on the ground, and limiting squat depth to a comfortable range can all reduce knee stress. Activating your glutes before squatting and warming up with mobility exercises also helps.",
  },
  {
    question: "Should I stop squatting if my knees hurt?",
    answer: "You don't necessarily need to stop entirely. Try reducing depth, lowering intensity, and improving your form first. If pain persists despite adjustments, take a break and consult a healthcare professional. Pain-free partial squats are often a good alternative while your knees adapt.",
  },
];

// ── SVG Diagrams ──

const SquatBiomechanicsDiagram = () => (
  <figure className="my-10">
    <svg viewBox="0 0 600 420" className="w-full max-w-xl mx-auto" role="img" aria-label="Squat biomechanics diagram showing force distribution through the knee joint">
      <rect width="600" height="420" fill="#F8F6F3" rx="16" />
      <text x="300" y="32" textAnchor="middle" className="fill-foreground" fontSize="17" fontWeight="700">Squat Biomechanics: Force Distribution</text>

      {/* Standing figure */}
      <g transform="translate(130,60)">
        <text x="40" y="0" textAnchor="middle" fontSize="13" fontWeight="600" className="fill-foreground">Standing</text>
        {/* Head */}
        <circle cx="40" cy="30" r="14" fill="#E8DDD3" stroke="#6B5E50" strokeWidth="2" />
        {/* Torso */}
        <line x1="40" y1="44" x2="40" y2="120" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        {/* Arms */}
        <line x1="40" y1="60" x2="15" y2="95" stroke="#6B5E50" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="40" y1="60" x2="65" y2="95" stroke="#6B5E50" strokeWidth="2.5" strokeLinecap="round" />
        {/* Hips */}
        <line x1="25" y1="120" x2="55" y2="120" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        {/* Legs */}
        <line x1="28" y1="120" x2="25" y2="200" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        <line x1="52" y1="120" x2="55" y2="200" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        {/* Knee dots */}
        <circle cx="26" cy="170" r="5" fill="#A3C9A8" stroke="#6B5E50" strokeWidth="1.5" />
        <circle cx="54" cy="170" r="5" fill="#A3C9A8" stroke="#6B5E50" strokeWidth="1.5" />
        {/* Feet */}
        <line x1="15" y1="200" x2="35" y2="200" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        <line x1="45" y1="200" x2="65" y2="200" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        {/* Force label */}
        <text x="40" y="230" textAnchor="middle" fontSize="11" className="fill-muted-foreground">1x body weight</text>
        <text x="40" y="245" textAnchor="middle" fontSize="11" className="fill-muted-foreground">on each knee</text>
      </g>

      {/* Squat figure */}
      <g transform="translate(380,60)">
        <text x="40" y="0" textAnchor="middle" fontSize="13" fontWeight="600" className="fill-foreground">Deep Squat</text>
        {/* Head */}
        <circle cx="40" cy="50" r="14" fill="#E8DDD3" stroke="#6B5E50" strokeWidth="2" />
        {/* Torso - angled forward */}
        <line x1="40" y1="64" x2="35" y2="130" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        {/* Arms forward */}
        <line x1="38" y1="80" x2="65" y2="100" stroke="#6B5E50" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="80" x2="68" y2="95" stroke="#6B5E50" strokeWidth="2.5" strokeLinecap="round" />
        {/* Hips - seated position */}
        <line x1="20" y1="132" x2="50" y2="130" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        {/* Upper legs - horizontal */}
        <line x1="22" y1="132" x2="0" y2="145" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        <line x1="48" y1="130" x2="70" y2="145" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        {/* Lower legs - vertical */}
        <line x1="0" y1="145" x2="5" y2="200" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        <line x1="70" y1="145" x2="65" y2="200" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        {/* Knee dots - highlighted */}
        <circle cx="0" cy="145" r="7" fill="#E57373" stroke="#C62828" strokeWidth="2" />
        <circle cx="70" cy="145" r="7" fill="#E57373" stroke="#C62828" strokeWidth="2" />
        {/* Feet */}
        <line x1="-5" y1="200" x2="15" y2="200" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        <line x1="55" y1="200" x2="75" y2="200" stroke="#6B5E50" strokeWidth="3" strokeLinecap="round" />
        {/* Force label */}
        <text x="35" y="230" textAnchor="middle" fontSize="11" fill="#C62828" fontWeight="600">6-8x body weight</text>
        <text x="35" y="245" textAnchor="middle" fontSize="11" fill="#C62828" fontWeight="600">on each knee</text>
      </g>

      {/* Arrow between */}
      <path d="M 225 180 L 310 180" stroke="#6B5E50" strokeWidth="2" markerEnd="url(#arrowhead)" />
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#6B5E50" />
        </marker>
      </defs>
      <text x="268" y="170" textAnchor="middle" fontSize="11" className="fill-muted-foreground">Deep flexion</text>

      {/* Bottom bar */}
      <rect x="40" y="340" width="520" height="55" rx="10" fill="#FFF8E1" stroke="#FFD54F" strokeWidth="1" />
      <text x="300" y="362" textAnchor="middle" fontSize="12" fontWeight="600" className="fill-foreground">Knee joint compression increases significantly with squat depth</text>
      <text x="300" y="380" textAnchor="middle" fontSize="11" className="fill-muted-foreground">Deeper angles = more force on the kneecap and cartilage</text>
    </svg>
    <figcaption className="text-center text-sm text-muted-foreground mt-3">Diagram: Force on the knee joint increases dramatically during deep squats compared to standing.</figcaption>
  </figure>
);

const KneeCompressionDiagram = () => (
  <figure className="my-10">
    <svg viewBox="0 0 600 380" className="w-full max-w-xl mx-auto" role="img" aria-label="Knee joint compression at different squat angles">
      <rect width="600" height="380" fill="#F8F6F3" rx="16" />
      <text x="300" y="32" textAnchor="middle" className="fill-foreground" fontSize="17" fontWeight="700">Knee Compression at Different Squat Depths</text>

      {/* Bar chart */}
      <g transform="translate(80,60)">
        {/* Y-axis */}
        <line x1="0" y1="0" x2="0" y2="240" stroke="#6B5E50" strokeWidth="1.5" />
        <text x="-10" y="125" textAnchor="middle" fontSize="11" className="fill-muted-foreground" transform="rotate(-90,-10,125)">Patellofemoral Force (x body weight)</text>

        {/* Bars */}
        {[
          { label: "Standing\n(0°)", value: 30, color: "#A3C9A8", force: "0.5x" },
          { label: "Quarter\nSquat (45°)", value: 75, color: "#81C784", force: "2x" },
          { label: "Half\nSquat (70°)", value: 130, color: "#FFB74D", force: "4x" },
          { label: "Parallel\nSquat (90°)", value: 175, color: "#FF8A65", force: "5.5x" },
          { label: "Deep\nSquat (120°+)", value: 220, color: "#E57373", force: "7-8x" },
        ].map((bar, i) => (
          <g key={i} transform={`translate(${i * 90 + 30},0)`}>
            <rect x="-25" y={240 - bar.value} width="50" height={bar.value} rx="4" fill={bar.color} opacity="0.85" />
            <text x="0" y={230 - bar.value} textAnchor="middle" fontSize="11" fontWeight="600" className="fill-foreground">{bar.force}</text>
            {bar.label.split("\n").map((line, li) => (
              <text key={li} x="0" y={260 + li * 14} textAnchor="middle" fontSize="10" className="fill-muted-foreground">{line}</text>
            ))}
          </g>
        ))}

        {/* X-axis */}
        <line x1="0" y1="240" x2="450" y2="240" stroke="#6B5E50" strokeWidth="1.5" />
      </g>

      {/* Legend */}
      <rect x="80" y="335" width="440" height="30" rx="8" fill="#FFF8E1" stroke="#FFD54F" strokeWidth="1" />
      <text x="300" y="355" textAnchor="middle" fontSize="11" className="fill-foreground">Deeper squat angles create exponentially more kneecap pressure</text>
    </svg>
    <figcaption className="text-center text-sm text-muted-foreground mt-3">Diagram: Patellofemoral compression force increases with squat depth.</figcaption>
  </figure>
);

const ProperVsImproperSquatDiagram = () => (
  <figure className="my-10">
    <svg viewBox="0 0 600 400" className="w-full max-w-xl mx-auto" role="img" aria-label="Proper versus improper squat knee alignment">
      <rect width="600" height="400" fill="#F8F6F3" rx="16" />
      <text x="300" y="32" textAnchor="middle" className="fill-foreground" fontSize="17" fontWeight="700">Proper vs. Improper Squat Alignment</text>

      {/* Proper squat - LEFT */}
      <g transform="translate(80,55)">
        <rect x="-55" y="-15" width="145" height="310" rx="12" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1.5" />
        <text x="17" y="5" textAnchor="middle" fontSize="13" fontWeight="600" fill="#2E7D32">Proper Form</text>

        {/* Leg - front view */}
        {/* Thigh */}
        <line x1="17" y1="40" x2="17" y2="130" stroke="#6B5E50" strokeWidth="4" strokeLinecap="round" />
        {/* Knee */}
        <circle cx="17" cy="130" r="8" fill="#A3C9A8" stroke="#388E3C" strokeWidth="2" />
        {/* Shin */}
        <line x1="17" y1="138" x2="17" y2="220" stroke="#6B5E50" strokeWidth="4" strokeLinecap="round" />
        {/* Foot */}
        <ellipse cx="17" cy="225" rx="18" ry="6" fill="#D7CCC8" stroke="#6B5E50" strokeWidth="1.5" />

        {/* Alignment line */}
        <line x1="17" y1="35" x2="17" y2="230" stroke="#388E3C" strokeWidth="1" strokeDasharray="4,4" />

        {/* Labels */}
        <text x="17" y="255" textAnchor="middle" fontSize="10" fill="#2E7D32" fontWeight="500">Knees track over toes</text>
        <text x="17" y="270" textAnchor="middle" fontSize="10" fill="#2E7D32" fontWeight="500">Heels stay planted</text>
        <text x="17" y="285" textAnchor="middle" fontSize="10" fill="#2E7D32" fontWeight="500">Hips engaged</text>
      </g>

      {/* Improper squat - RIGHT */}
      <g transform="translate(380,55)">
        <rect x="-55" y="-15" width="145" height="310" rx="12" fill="#FFEBEE" stroke="#EF9A9A" strokeWidth="1.5" />
        <text x="17" y="5" textAnchor="middle" fontSize="13" fontWeight="600" fill="#C62828">Improper Form</text>

        {/* Thigh */}
        <line x1="17" y1="40" x2="17" y2="130" stroke="#6B5E50" strokeWidth="4" strokeLinecap="round" />
        {/* Knee - caving inward */}
        <circle cx="5" cy="132" r="8" fill="#E57373" stroke="#C62828" strokeWidth="2" />
        {/* Shin - angled inward */}
        <line x1="5" y1="140" x2="-5" y2="220" stroke="#6B5E50" strokeWidth="4" strokeLinecap="round" />
        {/* Foot */}
        <ellipse cx="17" cy="225" rx="18" ry="6" fill="#D7CCC8" stroke="#6B5E50" strokeWidth="1.5" />

        {/* Misalignment arrow */}
        <path d="M 17 100 Q 0 115 5 132" stroke="#C62828" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />

        {/* Labels */}
        <text x="17" y="255" textAnchor="middle" fontSize="10" fill="#C62828" fontWeight="500">Knees collapse inward</text>
        <text x="17" y="270" textAnchor="middle" fontSize="10" fill="#C62828" fontWeight="500">Heels lifting off floor</text>
        <text x="17" y="285" textAnchor="middle" fontSize="10" fill="#C62828" fontWeight="500">Hips not engaged</text>
      </g>

      {/* Bottom note */}
      <rect x="60" y="355" width="480" height="30" rx="8" fill="#FFF8E1" stroke="#FFD54F" strokeWidth="1" />
      <text x="300" y="375" textAnchor="middle" fontSize="11" className="fill-foreground">Proper alignment distributes force evenly — poor form concentrates stress on the kneecap</text>
    </svg>
    <figcaption className="text-center text-sm text-muted-foreground mt-3">Diagram: Correct knee alignment during squats vs. common mistakes that increase knee stress.</figcaption>
  </figure>
);

const PatellaMovementDiagram = () => (
  <figure className="my-10">
    <svg viewBox="0 0 600 380" className="w-full max-w-xl mx-auto" role="img" aria-label="Patella movement and pressure during squatting">
      <rect width="600" height="380" fill="#F8F6F3" rx="16" />
      <text x="300" y="32" textAnchor="middle" className="fill-foreground" fontSize="17" fontWeight="700">Patella (Kneecap) Pressure During Squatting</text>

      {/* Knee at low flexion - LEFT */}
      <g transform="translate(120,60)">
        <text x="50" y="0" textAnchor="middle" fontSize="12" fontWeight="600" className="fill-foreground">Low Flexion (30°)</text>
        {/* Femur */}
        <rect x="30" y="20" width="40" height="100" rx="8" fill="#E8DDD3" stroke="#6B5E50" strokeWidth="1.5" />
        <text x="50" y="75" textAnchor="middle" fontSize="9" className="fill-muted-foreground">Femur</text>
        {/* Patella - floating freely */}
        <ellipse cx="50" cy="130" rx="16" ry="12" fill="#A3C9A8" stroke="#388E3C" strokeWidth="2" />
        <text x="50" y="134" textAnchor="middle" fontSize="8" fill="#2E7D32" fontWeight="600">Patella</text>
        {/* Tibia */}
        <rect x="30" y="150" width="40" height="80" rx="8" fill="#E8DDD3" stroke="#6B5E50" strokeWidth="1.5" />
        <text x="50" y="195" textAnchor="middle" fontSize="9" className="fill-muted-foreground">Tibia</text>
        {/* Low pressure indicator */}
        <text x="50" y="250" textAnchor="middle" fontSize="11" fill="#388E3C" fontWeight="600">Low Pressure</text>
        <rect x="20" y="258" width="60" height="6" rx="3" fill="#A3C9A8" />
      </g>

      {/* Knee at deep flexion - RIGHT */}
      <g transform="translate(380,60)">
        <text x="50" y="0" textAnchor="middle" fontSize="12" fontWeight="600" className="fill-foreground">Deep Flexion (90°+)</text>
        {/* Femur */}
        <rect x="30" y="20" width="40" height="100" rx="8" fill="#E8DDD3" stroke="#6B5E50" strokeWidth="1.5" />
        <text x="50" y="75" textAnchor="middle" fontSize="9" className="fill-muted-foreground">Femur</text>
        {/* Patella - compressed */}
        <ellipse cx="50" cy="125" rx="16" ry="10" fill="#E57373" stroke="#C62828" strokeWidth="2.5" />
        <text x="50" y="129" textAnchor="middle" fontSize="8" fill="#C62828" fontWeight="600">Patella</text>
        {/* Compression arrows */}
        <line x1="50" y1="108" x2="50" y2="117" stroke="#C62828" strokeWidth="2" markerEnd="url(#arrowRed)" />
        <line x1="50" y1="142" x2="50" y2="133" stroke="#C62828" strokeWidth="2" markerEnd="url(#arrowRed)" />
        {/* Tibia */}
        <rect x="30" y="145" width="40" height="80" rx="8" fill="#E8DDD3" stroke="#6B5E50" strokeWidth="1.5" />
        <text x="50" y="190" textAnchor="middle" fontSize="9" className="fill-muted-foreground">Tibia</text>
        {/* High pressure indicator */}
        <text x="50" y="250" textAnchor="middle" fontSize="11" fill="#C62828" fontWeight="600">High Pressure</text>
        <rect x="10" y="258" width="80" height="6" rx="3" fill="#E57373" />
      </g>

      <defs>
        <marker id="arrowRed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#C62828" />
        </marker>
      </defs>

      {/* Bottom note */}
      <rect x="60" y="320" width="480" height="40" rx="10" fill="#FFF8E1" stroke="#FFD54F" strokeWidth="1" />
      <text x="300" y="338" textAnchor="middle" fontSize="11" fontWeight="600" className="fill-foreground">At deep flexion, the patella is compressed between the femur and tibia</text>
      <text x="300" y="353" textAnchor="middle" fontSize="10" className="fill-muted-foreground">This is the primary source of kneecap discomfort during squats</text>
    </svg>
    <figcaption className="text-center text-sm text-muted-foreground mt-3">Diagram: Patella pressure increases significantly during deep knee flexion in squats.</figcaption>
  </figure>
);

const HipKneeLoadDiagram = () => (
  <figure className="my-10">
    <svg viewBox="0 0 600 380" className="w-full max-w-xl mx-auto" role="img" aria-label="Hip to knee load distribution during squatting">
      <rect width="600" height="380" fill="#F8F6F3" rx="16" />
      <text x="300" y="32" textAnchor="middle" className="fill-foreground" fontSize="17" fontWeight="700">Hip-Knee Load Distribution</text>

      {/* Left: Good hip engagement */}
      <g transform="translate(70,55)">
        <rect x="-30" y="-10" width="170" height="280" rx="12" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="1.5" />
        <text x="55" y="10" textAnchor="middle" fontSize="12" fontWeight="600" fill="#2E7D32">Strong Hip Engagement</text>

        {/* Hip circle */}
        <circle cx="55" cy="60" r="28" fill="#A3C9A8" stroke="#388E3C" strokeWidth="2" />
        <text x="55" y="58" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2E7D32">Hips</text>
        <text x="55" y="70" textAnchor="middle" fontSize="9" fill="#2E7D32">55%</text>

        {/* Arrow down */}
        <line x1="55" y1="90" x2="55" y2="120" stroke="#6B5E50" strokeWidth="2" />

        {/* Knee circle */}
        <circle cx="55" cy="148" r="28" fill="#C8E6C9" stroke="#66BB6A" strokeWidth="2" />
        <text x="55" y="146" textAnchor="middle" fontSize="9" fontWeight="600" fill="#388E3C">Knees</text>
        <text x="55" y="158" textAnchor="middle" fontSize="9" fill="#388E3C">45%</text>

        {/* Label */}
        <text x="55" y="200" textAnchor="middle" fontSize="10" fill="#2E7D32" fontWeight="500">Load shared evenly</text>
        <text x="55" y="215" textAnchor="middle" fontSize="10" fill="#2E7D32" fontWeight="500">Less knee stress</text>
        <text x="55" y="230" textAnchor="middle" fontSize="10" fill="#2E7D32" fontWeight="500">More comfortable</text>
      </g>

      {/* Right: Poor hip engagement */}
      <g transform="translate(360,55)">
        <rect x="-30" y="-10" width="170" height="280" rx="12" fill="#FFEBEE" stroke="#EF9A9A" strokeWidth="1.5" />
        <text x="55" y="10" textAnchor="middle" fontSize="12" fontWeight="600" fill="#C62828">Weak Hip Engagement</text>

        {/* Hip circle - small */}
        <circle cx="55" cy="60" r="18" fill="#FFCDD2" stroke="#EF9A9A" strokeWidth="2" />
        <text x="55" y="58" textAnchor="middle" fontSize="9" fontWeight="600" fill="#C62828">Hips</text>
        <text x="55" y="70" textAnchor="middle" fontSize="9" fill="#C62828">25%</text>

        {/* Arrow down - thick */}
        <line x1="55" y1="80" x2="55" y2="110" stroke="#C62828" strokeWidth="3" />

        {/* Knee circle - large, stressed */}
        <circle cx="55" cy="148" r="35" fill="#E57373" stroke="#C62828" strokeWidth="2.5" />
        <text x="55" y="146" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Knees</text>
        <text x="55" y="158" textAnchor="middle" fontSize="9" fill="#fff">75%</text>

        {/* Label */}
        <text x="55" y="205" textAnchor="middle" fontSize="10" fill="#C62828" fontWeight="500">Knees absorb most load</text>
        <text x="55" y="220" textAnchor="middle" fontSize="10" fill="#C62828" fontWeight="500">More knee stress</text>
        <text x="55" y="235" textAnchor="middle" fontSize="10" fill="#C62828" fontWeight="500">Higher discomfort risk</text>
      </g>

      {/* Bottom note */}
      <rect x="60" y="340" width="480" height="28" rx="8" fill="#FFF8E1" stroke="#FFD54F" strokeWidth="1" />
      <text x="300" y="359" textAnchor="middle" fontSize="11" className="fill-foreground">Strong glutes and hip muscles share the load — reducing knee joint pressure</text>
    </svg>
    <figcaption className="text-center text-sm text-muted-foreground mt-3">Diagram: When hips are properly engaged, the knee absorbs less force during squats.</figcaption>
  </figure>
);

// ── Article Content ──

const articleContent = (
  <>
    <Helmet>
      <script id="ld-article" type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Knee Pain When Squatting: Biomechanics & At-Home Adjustments",
        "description": "Learn why knee pain happens during squats. Explore squat biomechanics, common causes, and at-home adjustments for knee comfort.",
        "image": "https://flexi-knee.com/og-knee-pain-squatting.jpg",
        "author": { "@type": "Organization", "name": "FlexiKnee" },
        "publisher": { "@type": "Organization", "name": "FlexiKnee", "logo": { "@type": "ImageObject", "url": "https://flexi-knee.com/logo.png" } },
        "datePublished": "2026-03-05",
        "dateModified": "2026-03-05",
      })}</script>
    </Helmet>
    <Helmet>
      <script id="ld-breadcrumb" type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://flexi-knee.com/" },
          { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://flexi-knee.com/guides" },
          { "@type": "ListItem", "position": 3, "name": "Knee Pain When Squatting", "item": "https://flexi-knee.com/guides/knee-pain-when-squatting" },
        ],
      })}</script>
    </Helmet>
    <Helmet>
      <script id="ld-faq" type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
        })),
      })}</script>
    </Helmet>
    <Helmet>
      <script id="ld-howto" type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Reduce Knee Pain When Squatting",
        "description": "Step-by-step adjustments to reduce knee discomfort during squatting movements.",
        "step": [
          { "@type": "HowToStep", "name": "Warm Up Your Lower Body", "text": "Spend 5-10 minutes warming up with light walking, leg swings, and gentle hip circles before squatting." },
          { "@type": "HowToStep", "name": "Activate Your Glutes", "text": "Perform glute bridges or clamshells before squats to ensure your hip muscles are engaged and ready to share the load." },
          { "@type": "HowToStep", "name": "Check Your Stance Width", "text": "Stand with feet shoulder-width apart or slightly wider. Turn toes outward 15-30 degrees for better hip engagement." },
          { "@type": "HowToStep", "name": "Control Your Squat Depth", "text": "Start with quarter or half squats and gradually increase depth only as comfort allows." },
          { "@type": "HowToStep", "name": "Keep Heels Planted", "text": "Ensure your heels stay firmly on the ground throughout the squat. Use a small wedge under your heels if ankle mobility is limited." },
          { "@type": "HowToStep", "name": "Apply Warmth After Squatting", "text": "Use gentle warmth on the knee area after squatting to support comfortable recovery." },
        ],
      })}</script>
    </Helmet>

    {/* Section 1: Why Squatting Places Unique Stress */}
    <h2>Why Squatting Places Unique Stress on the Knee Joint</h2>
    <p>
      Squatting is one of the most demanding movements for the knee joint. Unlike walking or standing — where the knee stays relatively straight — a squat requires deep flexion that pushes the kneecap (patella) firmly against the thigh bone (femur).
    </p>
    <p>
      At the bottom of a deep squat, knee joint compression can reach <strong>6 to 8 times your body weight</strong>. For someone weighing 160 pounds, that's nearly 1,300 pounds of force pressing through each knee. This is significantly more than walking (about 1.5x body weight) or even stair climbing (3–4x body weight).
    </p>

    <StatHighlight
      stat="6-8x"
      label="body weight in knee compression during a deep squat"
      description="Significantly more than walking or standing"
    />

    <p>
      The deeper you squat, the more your kneecap is pressed into its groove on the femur. This creates a specific type of stress called <strong>patellofemoral compression</strong>, which is why so many people feel discomfort at the front of the knee during squats — even when other activities feel perfectly fine.
    </p>
    <p>
      Additionally, squatting requires the hips, ankles, and knees to work together in a coordinated chain. When one part of this chain is stiff, weak, or poorly positioned, the knee often absorbs the excess stress — leading to discomfort that may feel like it comes from nowhere.
    </p>

    <SquatBiomechanicsDiagram />

    <InfoBox title="Key Insight" emoji="💡">
      Knee pain during squats is rarely about the knee alone — it's usually related to how your hips, ankles, and quadriceps share the load. Understanding this chain helps you address the root cause rather than just the symptom.
    </InfoBox>

    {/* Section 2: Common Causes */}
    <h2>Common Causes of Knee Pain When Squatting</h2>
    <p>
      Not all squat-related knee discomfort comes from the same source. Understanding the most common causes can help you identify what may be contributing to your experience.
    </p>

    <h3>Poor Squat Mechanics</h3>
    <p>
      When knees cave inward, heels lift off the ground, or the torso leans too far forward, the knee joint absorbs forces it wasn't designed to handle alone. Poor form is one of the most correctable causes of knee discomfort during squats. Even small adjustments — like keeping your weight in your heels and pushing your knees outward — can reduce kneecap pressure significantly.
    </p>

    <h3>Weak Glutes or Hip Stabilizers</h3>
    <p>
      Your gluteus muscles are designed to be the primary movers in a squat. When they're weak or inactive, your quadriceps and knee joint take on excess load. This is one of the most common patterns behind <Link to="/guides/knee-pain-after-exercise" className="text-primary hover:underline">knee discomfort after exercise</Link> — especially in people who sit for extended periods throughout the day.
    </p>

    <h3>Tight Quadriceps</h3>
    <p>
      Tight quads can pull the kneecap upward and press it more firmly into the femoral groove during knee bending. This increases patellofemoral friction and can create a grinding or aching sensation during squats.
    </p>

    <h3>Patellofemoral Pain Syndrome</h3>
    <p>
      Often called "runner's knee," this condition involves irritation of the cartilage behind the kneecap. It's one of the most common reasons for <strong>pain in the knee when squatting</strong> — producing a dull ache at the front of the knee that worsens with deep flexion, prolonged sitting, or repetitive bending.
    </p>

    <h3>Meniscus Irritation</h3>
    <p>
      The meniscus is a C-shaped piece of cartilage that cushions the knee joint. During squatting, it absorbs compressive and rotational forces. If the meniscus is irritated or torn, squatting can produce catching, clicking, or sharp pain — often on the inner or outer side of the knee. This discomfort pattern is common in adults over 40, where age-related changes make the meniscus more vulnerable.
    </p>

    <h3>Sudden Increase in Training Intensity</h3>
    <p>
      Jumping from no squats to heavy squats — or suddenly adding depth or weight — can overwhelm the knee joint before it has time to adapt. This is related to <Link to="/guides/sudden-knee-pain-guide" className="text-primary hover:underline">sudden knee pain patterns</Link> that often resolve with gradual progression.
    </p>

    <KneeCompressionDiagram />

    {/* Section 3: Sharp Pain */}
    <h2>Sharp Knee Pain When Squatting: What It May Indicate</h2>
    <p>
      Experiencing <strong>sudden sharp knee pain when squatting</strong> can be alarming. While it doesn't always indicate a serious problem, sharp pain deserves attention and understanding.
    </p>

    <h3>Patellar Tendon Stress</h3>
    <p>
      The patellar tendon connects the kneecap to the shinbone. During squats, this tendon is under significant tension — especially at the bottom of the movement. When the tendon is overloaded or slightly irritated, it can produce a sharp, localized pain just below the kneecap.
    </p>

    <h3>Meniscus Irritation at Depth</h3>
    <p>
      Deep squats place the meniscus under combined compressive and rotational stress. If there's existing irritation or a small tear, this combination can trigger sudden sharp sensations — particularly if the knee rotates slightly during the movement.
    </p>

    <h3>Cartilage Pressure</h3>
    <p>
      The cartilage behind the kneecap experiences peak compression during deep knee flexion. When this cartilage is worn or softened — a condition sometimes called chondromalacia — the contact pressure can cause sharp, burning-type discomfort that resolves when the knee straightens.
    </p>

    <h3>Sudden Load Increase</h3>
    <p>
      Adding weight too quickly, squatting deeper than usual, or performing explosive squat variations without preparation can create sudden sharp pain. The joint structures haven't had time to adapt to the new demands, and the sharp sensation is often the body's signal to slow down.
    </p>

    <InfoBox title="When to Seek Professional Guidance" emoji="⚠️">
      If sharp knee pain during squats is accompanied by swelling, locking, giving way, or persists beyond a few days of rest and modification, consult a healthcare professional for proper evaluation.
    </InfoBox>

    <PremiumCTA
      headline="Support your knees after every squat session"
      text="FlexiKnee provides soothing warmth, red light, and gentle vibration to help your knees recover comfortably after squatting workouts."
    />

    {/* Section 4: Biomechanics Mistakes */}
    <h2>Biomechanics Mistakes That Increase Knee Stress</h2>
    <p>
      Many people unknowingly increase <strong>knee pressure during squats</strong> through common form errors. Understanding these patterns is the first step toward more comfortable squatting.
    </p>

    <h3>Knees Collapsing Inward (Valgus)</h3>
    <p>
      When the knees cave inward during a squat, it creates uneven pressure distribution across the knee joint. The inner compartment absorbs excessive force while the patella is pulled off its natural tracking path. This is often caused by weak glutes and hip external rotators.
    </p>

    <h3>Excessive Forward Knee Travel</h3>
    <p>
      While some forward knee movement is natural and necessary, excessive forward travel — where knees move well past the toes — shifts more load onto the kneecap and patellar tendon. The key is balance: the knees should track forward in line with the toes without the heels lifting.
    </p>

    <h3>Heels Lifting from the Ground</h3>
    <p>
      When heels lift during a squat, body weight shifts forward onto the balls of the feet. This increases pressure on the knee joint and often indicates limited ankle mobility — a common issue in adults over 40 that can be improved with consistent stretching.
    </p>

    <h3>Lack of Hip Engagement</h3>
    <p>
      A "quad-dominant" squat — where the hips barely move and the knees do all the work — is a frequent cause of <strong>knee pain when squatting down</strong>. Proper squats should involve a noticeable hip hinge, pushing the hips back as you descend. This shifts load away from the knees and toward the larger, more powerful glute muscles.
    </p>

    <h3>Squatting Too Deep Too Quickly</h3>
    <p>
      Depth should be earned progressively. Going from no squats to full-depth "ass-to-grass" squats without building up joint tolerance and muscle strength overloads the knee — particularly the <Link to="/guides/what-causes-knee-pain-guide" className="text-primary hover:underline">structures that cause knee pain</Link> including cartilage, meniscus, and tendons.
    </p>

    <ProperVsImproperSquatDiagram />

    {/* Section 5: At-Home Adjustments */}
    <h2>At-Home Adjustments That May Reduce Knee Discomfort</h2>
    <p>
      Small changes to your squatting technique and preparation can make a meaningful difference in how your knees feel during and after squats.
    </p>

    <h3>Stance Width Adjustments</h3>
    <p>
      Widening your stance slightly — and turning your toes outward 15–30 degrees — allows your hips to contribute more to the movement. This typically reduces the amount of knee flexion required to reach the same depth, lowering patellofemoral compression.
    </p>

    <h3>Hip Activation Exercises</h3>
    <p>
      Performing glute bridges, clamshells, or banded side walks before squatting "wakes up" your hip muscles. When your glutes are active, they absorb a greater share of the squat load — taking pressure off your knees. This is one of the most effective strategies for people who experience <strong>knees hurt when squatting</strong>.
    </p>

    <h3>Glute Strengthening</h3>
    <p>
      Beyond activation, building lasting glute strength through exercises like hip thrusts, single-leg deadlifts, and lunges creates a foundation that supports comfortable squatting long-term. Strong glutes are the most important muscle group for <Link to="/guides/knee-pain-exercises-guide" className="text-primary hover:underline">knee-supportive exercise routines</Link>.
    </p>

    <h3>Ankle Mobility Work</h3>
    <p>
      Limited ankle dorsiflexion forces the knee to compensate during squats, increasing forward knee travel and heel lifting. Simple daily ankle stretches — like wall ankle stretches and calf raises — can improve your squat mechanics and reduce knee strain over 2–4 weeks of consistent practice.
    </p>

    <h3>Controlling Squat Depth</h3>
    <p>
      You don't need to squat to full depth to benefit from the movement. Partial squats (quarter or half depth) significantly reduce patellofemoral force while still strengthening your legs. Start at a depth that feels comfortable and gradually increase over weeks as your strength and joint tolerance improve.
    </p>

    <TipsList tips={[
      "Widen your stance slightly and turn toes outward 15-30 degrees",
      "Activate your glutes with bridges or clamshells before squatting",
      "Keep your heels firmly planted — use a small wedge if needed",
      "Start with quarter squats and gradually increase depth",
      "Focus on hip hinge movement to reduce knee dominance",
      "Stretch your ankles daily with wall stretches",
    ]} />

    <HipKneeLoadDiagram />

    {/* Section 6: Beginners and Returning Exercisers */}
    <h2>Why Beginners and Returning Exercisers Experience More Knee Pain</h2>
    <p>
      If you're new to squatting or returning after a long break, you're more likely to experience <strong>knee pain when squatting down or kneeling</strong>. This isn't necessarily a sign of injury — it's often a sign that your body needs time to adapt.
    </p>

    <h3>Muscle Imbalance</h3>
    <p>
      Prolonged sitting weakens the glutes and hip muscles while tightening the hip flexors and quads. When you start squatting, these imbalances mean the knee absorbs stress that should be distributed across the entire lower body. This pattern is closely related to <Link to="/guides/knee-pain-getting-up-after-sitting" className="text-primary hover:underline">knee discomfort when getting up after sitting</Link>.
    </p>

    <h3>Sudden Load Changes</h3>
    <p>
      Your joints adapt to load gradually. Going from zero squats to daily squatting — or jumping to weighted squats too quickly — doesn't give your cartilage, tendons, and ligaments time to strengthen. A progressive approach (starting with bodyweight partial squats) is essential for joint comfort.
    </p>

    <h3>Joint Adaptation Lag</h3>
    <p>
      While muscles can strengthen relatively quickly (2–4 weeks), tendons and cartilage take much longer to adapt — often 8–12 weeks. This is why knee discomfort often appears after you feel "strong enough" to increase intensity. Patience and gradual progression protect your joints while your tissues catch up to your muscles. Adults over 40 may find this process takes even longer, as explained in our guide on <Link to="/guides/knee-pain-after-40" className="text-primary hover:underline">knee pain after 40</Link>.
    </p>

    <PatellaMovementDiagram />

    <InfoBox title="Recovery Timeline" emoji="📅">
      Muscles adapt in 2–4 weeks. Tendons and cartilage need 8–12 weeks. Give your joints time to catch up to your muscular strength — this patience prevents most squat-related knee discomfort.
    </InfoBox>

    {/* Section 7: Daily Habits */}
    <h2>Daily Habits That Support Knee Comfort for Squatting</h2>
    <p>
      Beyond squat technique, your everyday habits play a significant role in how your knees feel during and after squatting movements.
    </p>

    <h3>Proper Warm-Up Routines</h3>
    <p>
      A thorough warm-up increases blood flow to the knee joint, improves synovial fluid circulation, and prepares your muscles for load. Spend 5–10 minutes with light walking, gentle leg swings, bodyweight hip circles, and ankle rotations before any squatting session.
    </p>

    <h3>Gradual Training Progression</h3>
    <p>
      Follow the "10% rule" — increase squat depth, weight, or volume by no more than 10% per week. This gives your knee structures time to adapt without being overwhelmed. If discomfort increases, scale back and build up again more slowly.
    </p>

    <h3>Mobility Exercises</h3>
    <p>
      Daily mobility work targeting the ankles, hips, and thoracic spine improves your squat mechanics and reduces compensatory knee stress. Even 5 minutes of mobility work each morning can make a noticeable difference within 2–3 weeks — similar to the benefits described in our <Link to="/guides/knee-mobility-after-50" className="text-primary hover:underline">knee mobility after 50 guide</Link>.
    </p>

    <h3>Recovery Strategies</h3>
    <p>
      After squatting, gentle warmth and light movement can support comfortable recovery. Applying warmth to the knee area for 15–20 minutes after a workout helps maintain circulation and may support tissue recovery. Pair this with gentle quad stretches and foam rolling for a well-rounded recovery routine.
    </p>

    <h3>How to Squat with Less Knee Strain</h3>
    <p>
      Putting it all together, here's a step-by-step approach to squatting with less knee discomfort:
    </p>

    <TipsList tips={[
      "Warm up for 5-10 minutes with light movement and hip activation",
      "Stand with feet shoulder-width apart, toes turned slightly outward",
      "Initiate the squat by pushing your hips back first — not by bending your knees",
      "Keep your weight in your heels and mid-foot throughout",
      "Ensure knees track outward over your toes — never collapse inward",
      "Descend only to a comfortable depth — quarter or half squat is fine",
      "Rise by driving through your heels and squeezing your glutes",
      "Apply gentle warmth to your knees after your session",
    ]} />

    <PremiumCTA
      headline="Support your knees after squatting workouts"
      text="FlexiKnee combines soothing warmth, red light, and gentle vibration in one wireless device — designed for comfortable post-workout knee recovery."
    />
  </>
);

export const kneePainSquatting: ArticleExport = {
  article: {
    slug: "knee-pain-when-squatting",
    title: "Knee Pain When Squatting: Biomechanics & Adjustments",
    subtitle: "Why squats stress your knees — and what you can do at home",
    intro: "Squatting is one of the most fundamental human movements, yet many people experience knee pain during or after squats — even when walking, standing, and climbing stairs feel completely fine. Understanding the unique biomechanics of squatting reveals why this movement places such distinct stress on the knee joint and what simple adjustments can help you squat with greater comfort.",
    metaTitle: "Knee Pain When Squatting: Causes & Home Fixes",
    metaDescription: "Discover why knee pain happens during squats. Learn about squat biomechanics, patellofemoral stress, and at-home adjustments for comfortable squatting.",
    heroImage: heroImage,
    publishedDate: "March 5, 2026",
    nextSlug: "knee-pain-climbing-stairs",
    nextTitle: "Knee Pain When Climbing Stairs",
    faqs: faqs,
    seoTags: "knee pain when squatting,pain in knee when squatting,sharp knee pain when squatting,knee pain squatting down,squat knee biomechanics,patellofemoral pain squat,meniscus pain squatting,knees hurt when squatting,how to fix knee pain squatting,knee pressure during squat,squat form knee comfort,knee pain kneeling",
  },
  cta: "Support your knees after squatting workouts",
};
