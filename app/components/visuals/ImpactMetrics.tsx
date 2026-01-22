'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MessageSquare, ShieldCheck, Zap, TrendingDown } from 'lucide-react';

const Counter = ({ value, duration = 2, suffix = "" }: { value: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const end = value;
            const totalMiliseconds = duration * 1000;
            const incrementTime = totalMiliseconds / end;

            const timer = setInterval(() => {
                start += 1;
                setCount(start);
                if (start === end) clearInterval(timer);
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

export default function ImpactMetrics() {
    return (
        <div className="my-24 grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Primary Stat Card */}
            <motion.div
                className="col-span-1 md:col-span-7 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-rose-500/10 via-transparent to-transparent border border-rose-500/20 p-10 md:p-14 flex flex-col justify-between group min-h-[420px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {/* Background Glow */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-rose-500/20 transition-colors duration-700" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-rose-400 mb-8">
                        <div className="p-2.5 rounded-xl bg-rose-500/10">
                            <TrendingDown size={28} />
                        </div>
                        <span className="text-sm font-bold tracking-[0.2em] uppercase">Core Achievement</span>
                    </div>

                    <h3 className="text-8xl md:text-9xl font-bold text-white tracking-tighter mb-4">
                        <Counter value={72} suffix="%" />
                    </h3>
                    <p className="font-serif text-3xl md:text-4xl text-white/90 leading-tight italic max-w-md">
                        Reduction in payment-related confusion
                    </p>
                </div>

                <div className="relative z-10 mt-8 pt-8 border-t border-white/5 flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#121212] bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-white/40 font-medium">Verified by support ticket volume analysis</p>
                </div>
            </motion.div>

            {/* Supporting Cards */}
            <div className="col-span-1 md:col-span-5 flex flex-col gap-6">

                {/* Trust Card */}
                <motion.div
                    className="flex-1 relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 flex flex-col justify-between group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="absolute top-0 right-0 p-8 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors duration-500">
                        <ShieldCheck size={120} />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                            <ShieldCheck size={28} />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">Trust Restored</h4>
                        <p className="text-white/50 text-base leading-relaxed">
                            Users stopped calling the delay "fraud" and started understanding it as <span className="text-white/80 font-medium italic">"processing time."</span>
                        </p>
                    </div>
                </motion.div>

                {/* Efficiency Card */}
                <motion.div
                    className="flex-1 relative overflow-hidden rounded-[2rem] bg-white/[0.02] border border-white/10 p-8 flex flex-col justify-between group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover:text-blue-500/20 transition-colors duration-500">
                        <Zap size={120} />
                    </div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
                            <Zap size={28} />
                        </div>
                        <h4 className="text-2xl font-bold text-white mb-2">Ops Efficiency</h4>
                        <p className="text-white/50 text-base leading-relaxed">
                            The Ops team no longer acts as a <span className="text-white/80 font-medium italic">"manual invoice printer"</span> for customers.
                        </p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
