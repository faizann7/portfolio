'use client';

import { ArrowRight, Package, Car, Receipt, Split } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MentalModelShift() {
    return (
        <div className="my-20 flex flex-col items-center">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto_1.2fr] gap-8 items-center">

                {/* OLD MODEL */}
                <motion.div
                    className="relative group overflow-hidden rounded-[var(--radius-card)] bg-white/[0.02] border border-white/10 p-[var(--card-padding)] flex flex-col items-center text-center"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="mb-6 p-4 rounded-[var(--radius-card-inner)] bg-white/5 text-white/40">
                        <Package size={32} />
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-white/30 font-bold mb-2">Old Mental Model</span>
                    <h4 className="text-2xl font-bold text-white mb-2">The "Everything" Dump</h4>
                    <p className="text-white/50 font-light italic">
                        "Wait, why is my booking summary showing a fine from 3 weeks ago?"
                    </p>
                </motion.div>

                {/* TRANSITION ARROW */}
                <div className="flex flex-col items-center justify-center py-4 md:py-0">
                    <motion.div
                        className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Split size={20} className="md:rotate-0 rotate-90" />
                    </motion.div>
                    <div className="hidden md:block w-px h-12 bg-gradient-to-b from-white/0 via-white/10 to-white/0 mt-2"></div>
                </div>

                {/* NEW MODEL */}
                <div className="grid grid-cols-1 gap-4">
                    <motion.div
                        className="relative group overflow-hidden rounded-[var(--radius-card-inner)] bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 p-[var(--card-padding-sm)] flex items-center gap-[var(--card-padding-sm)]"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="p-3 rounded-[var(--radius-button)] bg-emerald-500/10 text-emerald-400">
                            <Car size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-emerald-400/60 font-bold">Booking Summary</span>
                            <h4 className="text-lg font-bold text-white">Trip Context</h4>
                            <p className="text-sm text-white/50 font-light">"What car do I have right now?"</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative group overflow-hidden rounded-[var(--radius-card-inner)] bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 p-[var(--card-padding-sm)] flex items-center gap-[var(--card-padding-sm)]"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="p-3 rounded-[var(--radius-button)] bg-blue-500/10 text-blue-400">
                            <Receipt size={24} />
                        </div>
                        <div>
                            <span className="text-[10px] uppercase tracking-widest text-blue-400/60 font-bold">Payments Center</span>
                            <h4 className="text-lg font-bold text-white">Financial Ledger</h4>
                            <p className="text-sm text-white/50 font-light">"Why was I charged?"</p>
                        </div>
                    </motion.div>
                </div>

            </div>

            <motion.div
                className="mt-8 px-6 py-2 rounded-full bg-white/[0.03] border border-white/5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
            >
                <p className="text-xs text-white/30 tracking-wide font-medium">SHIFT: FROM TIMING TO TRANSPARENCY</p>
            </motion.div>
        </div>
    );
}
