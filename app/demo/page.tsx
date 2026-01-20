'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Footer from '../components/Footer';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

// ============================================================================
// SCROLL-TELLING "HOW I WORK" SECTION
// A 3-scene narrative: messy reality → insight → execution
// ============================================================================

// Scene content configuration
const scenes = [
    {
        id: 1,
        headline: "Uncovering the Signal",
        subline: "Funnels, recordings, patterns — the raw inputs.",
        color: "rgba(139, 92, 246, 0.15)", // Soft violet
    },
    {
        id: 2,
        headline: "Shaping the Hypothesis",
        subline: "Insight distilled, smallest test defined.",
        color: "rgba(59, 130, 246, 0.15)", // Soft blue
    },
    {
        id: 3,
        headline: "Executing with Precision",
        subline: "Design systems, AI as multiplier, scalable output.",
        color: "rgba(16, 185, 129, 0.15)", // Soft emerald
    },
];

// ============================================================================
// VISUAL ARTIFACTS COMPONENTS
// ============================================================================

// Scene 1: Messy Inputs - Blurred funnel/heatmap + sticky notes
const MessyInputsVisual = ({ progress }: { progress: number }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Blurred Funnel/Heatmap Panel */}
            <motion.div
                className="absolute w-64 h-80 md:w-80 md:h-96 rounded-xl overflow-hidden"
                style={{
                    filter: `blur(${Math.max(0, 8 - progress * 12)}px)`,
                    opacity: 0.3 + progress * 0.5,
                    x: -20 + progress * 20,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-violet-900/40 via-purple-800/30 to-indigo-900/40" />
                {/* Funnel visualization */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4">
                    <div className="w-full h-6 bg-violet-500/30 rounded" />
                    <div className="w-4/5 h-5 bg-violet-400/25 rounded" />
                    <div className="w-3/5 h-4 bg-purple-400/20 rounded" />
                    <div className="w-2/5 h-3 bg-purple-300/15 rounded" />
                    <div className="w-1/4 h-2 bg-indigo-300/10 rounded" />
                </div>
                {/* Heatmap dots */}
                <div className="absolute inset-0">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-orange-500/30"
                            style={{
                                left: `${20 + (i % 4) * 20}%`,
                                top: `${15 + Math.floor(i / 4) * 25}%`,
                                scale: 0.5 + Math.random() * 1.5,
                            }}
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Messy Sticky Notes Cluster */}
            <motion.div
                className="absolute right-4 md:right-16 top-1/4"
                style={{
                    rotate: -5 + progress * 8,
                    y: 30 - progress * 40,
                    opacity: 0.2 + progress * 0.6,
                }}
            >
                <div className="relative">
                    {/* Sticky 1 */}
                    <motion.div
                        className="absolute w-20 h-20 md:w-24 md:h-24 bg-amber-300/80 rounded shadow-lg"
                        style={{ rotate: -8, x: -40, y: 10 }}
                    >
                        <div className="p-2 text-[8px] md:text-[10px] text-amber-900/60 font-mono leading-tight">
                            drop-off at step 3?
                            <br />check funnel...
                        </div>
                    </motion.div>
                    {/* Sticky 2 */}
                    <motion.div
                        className="absolute w-18 h-18 md:w-22 md:h-22 bg-pink-300/70 rounded shadow-lg"
                        style={{ rotate: 12, x: 20, y: -20 }}
                    >
                        <div className="p-2 text-[8px] md:text-[10px] text-pink-900/60 font-mono leading-tight">
                            user spoke about...
                            <br />→ interview #4
                        </div>
                    </motion.div>
                    {/* Sticky 3 */}
                    <motion.div
                        className="absolute w-16 h-16 md:w-20 md:h-20 bg-sky-200/70 rounded shadow-lg"
                        style={{ rotate: 3, x: -10, y: 50 }}
                    >
                        <div className="p-2 text-[7px] md:text-[9px] text-sky-900/60 font-mono">
                            pattern?
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Recording wave visualization */}
            <motion.div
                className="absolute bottom-8 left-8 md:left-16 flex items-end gap-[2px] h-8"
                style={{ opacity: 0.3 + progress * 0.4 }}
            >
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-1 bg-violet-400/60 rounded-full"
                        animate={{ height: [4, 8 + Math.random() * 16, 4] }}
                        transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.05 }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

// Scene 2: Insight & Decisions - Insight cards emerging
const InsightVisual = ({ progress }: { progress: number }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Central insight cards */}
            <div className="relative flex flex-col gap-4 items-center">
                {/* Main Insight Card */}
                <motion.div
                    className="w-72 md:w-80 p-6 rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-blue-500/20 shadow-2xl"
                    style={{
                        y: 40 - progress * 50,
                        opacity: progress,
                        scale: 0.9 + progress * 0.1,
                    }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-xs font-medium text-blue-300/80 uppercase tracking-wide">Hypothesis</span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                        "Users abandon at step 3 because the value isn't clear yet."
                    </p>
                    <div className="mt-4 flex gap-2">
                        <span className="px-2 py-1 text-[10px] bg-blue-500/10 text-blue-300 rounded">Validated</span>
                        <span className="px-2 py-1 text-[10px] bg-slate-700 text-slate-400 rounded">Funnel Data</span>
                    </div>
                </motion.div>

                {/* Supporting Insight Card */}
                <motion.div
                    className="w-64 md:w-72 p-4 rounded-xl bg-slate-800/60 border border-slate-600/30 shadow-lg"
                    style={{
                        y: 60 - progress * 60,
                        opacity: progress * 0.8,
                        x: -20 + progress * 20,
                    }}
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span className="text-[10px] font-medium text-cyan-300/70 uppercase tracking-wide">Test</span>
                    </div>
                    <p className="text-xs text-slate-300/80">
                        Add value preview before step 3 checkout.
                    </p>
                </motion.div>

                {/* Tertiary card */}
                <motion.div
                    className="w-56 md:w-64 p-3 rounded-lg bg-slate-800/40 border border-slate-700/20"
                    style={{
                        y: 80 - progress * 70,
                        opacity: progress * 0.6,
                        x: 15 - progress * 15,
                    }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-emerald-400" />
                        <span className="text-[9px] text-emerald-300/60">Smallest test: 2-day sprint</span>
                    </div>
                </motion.div>
            </div>

            {/* Connection lines (faint) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: progress * 0.3 }}>
                <motion.line
                    x1="35%" y1="30%" x2="50%" y2="45%"
                    stroke="rgba(59, 130, 246, 0.3)" strokeWidth="1" strokeDasharray="4,4"
                />
                <motion.line
                    x1="65%" y1="25%" x2="55%" y2="45%"
                    stroke="rgba(59, 130, 246, 0.2)" strokeWidth="1" strokeDasharray="4,4"
                />
            </svg>
        </div>
    );
};

// Scene 3: Execution - UI frames, AI snippet, component grid
const ExecutionVisual = ({ progress }: { progress: number }) => {
    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {/* UI Frames Grid */}
            <motion.div
                className="absolute left-4 md:left-16 grid grid-cols-2 gap-3"
                style={{
                    y: 30 - progress * 40,
                    opacity: progress,
                    x: -20 + progress * 20,
                }}
            >
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="w-20 h-14 md:w-28 md:h-20 rounded-lg bg-gradient-to-br from-slate-700/60 to-slate-800/60 border border-emerald-500/20 overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        style={{ scale: 0.9 + progress * 0.1 }}
                    >
                        {/* Mini UI mockup */}
                        <div className="p-2 space-y-1">
                            <div className="w-full h-1.5 bg-emerald-500/30 rounded" />
                            <div className="w-3/4 h-1 bg-slate-600/50 rounded" />
                            <div className="w-1/2 h-1 bg-slate-600/30 rounded" />
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Central polished output */}
            <motion.div
                className="relative w-64 h-44 md:w-80 md:h-56 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 shadow-2xl overflow-hidden"
                style={{
                    scale: 0.85 + progress * 0.15,
                    opacity: 0.5 + progress * 0.5,
                }}
            >
                {/* Browser chrome mockup */}
                <div className="h-6 bg-slate-700/50 flex items-center gap-1.5 px-3">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    <div className="ml-4 flex-1 h-3 bg-slate-600/50 rounded text-[8px] text-slate-400 flex items-center justify-center">
                        app.example.com
                    </div>
                </div>
                {/* Content */}
                <div className="p-4 space-y-3">
                    <div className="flex gap-2">
                        <div className="w-8 h-8 rounded bg-emerald-500/20" />
                        <div className="flex-1 space-y-1">
                            <div className="w-3/4 h-2 bg-slate-600/60 rounded" />
                            <div className="w-1/2 h-1.5 bg-slate-700/60 rounded" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <div className="h-8 rounded bg-emerald-500/10 border border-emerald-500/20" />
                        <div className="h-8 rounded bg-emerald-500/10 border border-emerald-500/20" />
                        <div className="h-8 rounded bg-emerald-500/10 border border-emerald-500/20" />
                    </div>
                    <div className="w-full h-2 bg-emerald-500/30 rounded-full">
                        <motion.div
                            className="h-full bg-emerald-400/60 rounded-full"
                            animate={{ width: ["30%", "70%", "30%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>
            </motion.div>

            {/* AI Prompt Snippet */}
            <motion.div
                className="absolute right-4 md:right-16 bottom-1/4 w-52 md:w-64 p-4 rounded-xl bg-slate-900/90 border border-violet-500/20 shadow-xl"
                style={{
                    y: 40 - progress * 50,
                    opacity: progress * 0.9,
                    rotate: 2 - progress * 4,
                }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                        <span className="text-[8px] text-white font-bold">AI</span>
                    </div>
                    <span className="text-[10px] text-violet-300/70 font-mono">synthesis</span>
                </div>
                <p className="text-[11px] text-slate-300/80 font-mono leading-relaxed">
                    → 3 patterns found<br />
                    → component library ready<br />
                    → handoff in 48h
                </p>
            </motion.div>
        </div>
    );
};

// ============================================================================
// STICKY STAGE SCROLL SCENE
// ============================================================================

const ScrollStage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Check for prefers-reduced-motion
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // Scene progress values (each scene takes 1/3 of the scroll)
    const scene1Progress = useTransform(smoothProgress, [0, 0.33], [0, 1]);
    const scene2Progress = useTransform(smoothProgress, [0.33, 0.66], [0, 1]);
    const scene3Progress = useTransform(smoothProgress, [0.66, 1], [0, 1]);

    // Scene visibility (fade in/out)
    const scene1Opacity = useTransform(smoothProgress, [0, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
    const scene2Opacity = useTransform(smoothProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const scene3Opacity = useTransform(smoothProgress, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0.8]);

    // Active scene index
    const [activeScene, setActiveScene] = useState(0);

    // Track which scene is active
    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (latest) => {
            if (latest < 0.35) setActiveScene(0);
            else if (latest < 0.65) setActiveScene(1);
            else setActiveScene(2);
        });
        return () => unsubscribe();
    }, [smoothProgress]);

    // For reduced motion: render static stacked layout
    if (prefersReducedMotion) {
        return (
            <section className="py-24 px-4 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-heading text-center mb-16 text-[var(--text-heading)]">
                        How I work
                    </h2>
                    <div className="space-y-24">
                        {scenes.map((scene, i) => (
                            <div key={scene.id} className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)]">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-bold tracking-widest uppercase opacity-60">
                                        Scene {scene.id}
                                    </span>
                                </div>
                                <h3 className="text-3xl font-heading mb-2 text-[var(--text-heading)]">{scene.headline}</h3>
                                <p className="text-[var(--text-paragraph)] text-lg">{scene.subline}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-sm text-[var(--text-paragraph)] opacity-60 mt-16">
                        Impact + methodology is detailed inside each case study.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section ref={containerRef} className="relative" style={{ height: '300vh' }}>
            {/* Sticky Stage */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
                {/* Background gradient based on active scene */}
                <motion.div
                    className="absolute inset-0 transition-colors duration-700"
                    style={{
                        background: scenes[activeScene]?.color || 'transparent',
                    }}
                />

                {/* Section Title */}
                <motion.div
                    className="absolute top-8 md:top-12 left-0 right-0 text-center z-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-heading text-[var(--text-heading)]">
                        How I work
                    </h2>
                </motion.div>

                {/* Visual Stage Container */}
                <div className="relative w-full max-w-5xl mx-auto h-[60vh] md:h-[70vh]">
                    {/* Scene 1: Messy Inputs */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ opacity: scene1Opacity }}
                    >
                        <MessyInputsVisual progress={scene1Progress.get()} />
                    </motion.div>

                    {/* Scene 2: Insight */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ opacity: scene2Opacity }}
                    >
                        <InsightVisual progress={scene2Progress.get()} />
                    </motion.div>

                    {/* Scene 3: Execution */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ opacity: scene3Opacity }}
                    >
                        <ExecutionVisual progress={scene3Progress.get()} />
                    </motion.div>
                </div>

                {/* Scene Copy Overlay */}
                <div className="absolute bottom-16 md:bottom-24 left-0 right-0 px-4 z-20">
                    <div className="max-w-xl mx-auto text-center">
                        {scenes.map((scene, i) => (
                            <motion.div
                                key={scene.id}
                                className="absolute inset-0 flex flex-col items-center justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: activeScene === i ? 1 : 0,
                                    y: activeScene === i ? 0 : 20,
                                }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >
                                <span className="text-xs font-medium tracking-widest uppercase opacity-50 mb-2">
                                    {String(scene.id).padStart(2, '0')}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-heading text-[var(--text-heading)] mb-2">
                                    {scene.headline}
                                </h3>
                                <p className="text-base md:text-lg text-[var(--text-paragraph)] opacity-80">
                                    {scene.subline}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                    {scenes.map((scene, i) => (
                        <motion.div
                            key={scene.id}
                            className="w-2 h-2 rounded-full border border-[var(--border-color)] transition-colors duration-300"
                            style={{
                                background: activeScene === i ? 'var(--text-heading)' : 'transparent',
                            }}
                        />
                    ))}
                </div>

                {/* Scroll hint (only at start) */}
                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                    animate={{ opacity: activeScene === 0 ? 0.5 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <span className="text-[10px] uppercase tracking-widest text-[var(--text-paragraph)]">Scroll</span>
                    <motion.div
                        className="w-px h-6 bg-[var(--text-paragraph)]"
                        animate={{ scaleY: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ transformOrigin: 'top' }}
                    />
                </motion.div>
            </div>

            {/* Credibility Line (after scroll section) */}
            <div className="absolute bottom-8 left-0 right-0 text-center px-4">
                <p className="text-sm text-[var(--text-paragraph)] opacity-50 italic">
                    Impact + methodology is detailed inside each case study.
                </p>
            </div>
        </section>
    );
};

// ============================================================================
// DEMO PAGE
// ============================================================================

export default function DemoPage() {
    useSmoothScroll();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header spacer */}
            <div className="h-24 md:h-32" />

            {/* Intro Section */}
            <section className="text-center px-4 md:px-8 mb-8">
                <p className="text-sm font-medium tracking-widest uppercase opacity-60 mb-4">
                    Demo: Scroll-Telling Prototype
                </p>
                <h1 className="text-4xl md:text-6xl font-heading text-[var(--text-heading)] mb-6">
                    How I work
                </h1>
                <p className="text-lg text-[var(--text-paragraph)] max-w-2xl mx-auto opacity-80">
                    A 3-scene narrative that transforms messy reality into insight, then execution.
                </p>
            </section>

            {/* Scroll-Telling Section */}
            <ScrollStage />

            {/* Spacer for demo */}
            <div className="h-32" />

            <Footer />
        </div>
    );
}
