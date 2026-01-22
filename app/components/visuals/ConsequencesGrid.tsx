'use client';

import { Quote, TriangleAlert, PiggyBank, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        name: "Lucas Hartman",
        date: "8/15/2024",
        quote: "“They are scamming me”",
        description: "Users interpreted the silence as malice, frequently accusing the platform of fraud in support tickets.",
        id: "lucas",
        icon: TriangleAlert,
        color: "text-rose-400",
        gradient: "from-rose-500/20 to-rose-900/5",
        border: "border-rose-500/20"
    },
    {
        name: "Maya Thompson",
        date: "9/30/2024",
        quote: "“Dispute Overload”",
        description: "Because the app didn't provide proof, users disputed valid charges by default.",
        id: "maya",
        icon: PiggyBank,
        color: "text-orange-400",
        gradient: "from-orange-500/20 to-orange-900/5",
        border: "border-orange-500/20"
    },
    {
        name: "Evelyn Carter",
        date: "12/5/2024",
        quote: "“Ops Paralysis”",
        description: "Support agents spent hours manually downloading government PDFs to prove fines were real.",
        id: "evelyn",
        icon: Clock,
        color: "text-blue-400",
        gradient: "from-blue-500/20 to-blue-900/5",
        border: "border-blue-500/20"
    }
];

export default function ConsequencesGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-16 auto-rows-[minmax(0,auto)]">

            {/* Primary Card - Lucas */}
            {(() => {
                const Icon = testimonials[0].icon;
                return (
                    <motion.div
                        className={`col-span-1 md:col-span-7 md:row-span-2 relative group overflow-hidden rounded-3xl bg-gradient-to-br ${testimonials[0].gradient} border ${testimonials[0].border} backdrop-blur-sm p-6 flex flex-col justify-between min-h-[400px]`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="absolute right-0 top-0 p-32 opacity-[0.03] transform translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            {Icon && <Icon size={400} />}
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-red-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-rose-900/20`}>
                                    LH
                                </div>
                                <div>
                                    <p className="font-bold text-white text-lg tracking-wide">Lucas Hartman</p>
                                    <p className="text-white/40 text-sm font-medium">8/15/2024</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                                    {testimonials[0].quote}
                                </h3>
                                <p className="text-xl text-white/80 font-light leading-relaxed max-w-md">
                                    {testimonials[0].description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-rose-300/60 text-sm font-medium uppercase tracking-wider">
                            <TriangleAlert size={16} />
                            <span>Severe Friction</span>
                        </div>
                    </motion.div>
                );
            })()}

            {/* Secondary Card - Maya */}
            {(() => {
                const Icon = testimonials[1].icon;
                return (
                    <motion.div
                        className={`col-span-1 md:col-span-5 relative group overflow-hidden rounded-3xl bg-gradient-to-br ${testimonials[1].gradient} border ${testimonials[1].border} backdrop-blur-sm p-6 flex flex-col justify-center min-h-[200px]`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="absolute -right-4 -bottom-4 opacity-[0.05] pointer-events-none group-hover:rotate-12 transition-transform duration-500">
                            {Icon && <Icon size={120} />}
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-900/20`}>
                                        MT
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">Maya Thompson</p>
                                        <p className="text-white/40 text-xs">9/30/2024</p>
                                    </div>
                                </div>
                                <Quote className="text-orange-400/20" size={24} />
                            </div>

                            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                {testimonials[1].quote}
                            </h3>
                            <p className="text-base text-white/70 font-light leading-relaxed">
                                {testimonials[1].description}
                            </p>
                        </div>
                    </motion.div>
                );
            })()}

            {/* Tertiary Card - Evelyn */}
            {(() => {
                const Icon = testimonials[2].icon;
                return (
                    <motion.div
                        className={`col-span-1 md:col-span-5 relative group overflow-hidden rounded-3xl bg-gradient-to-br ${testimonials[2].gradient} border ${testimonials[2].border} backdrop-blur-sm p-6 flex flex-col justify-center min-h-[200px]`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="absolute -right-4 -bottom-4 opacity-[0.05] pointer-events-none group-hover:rotate-12 transition-transform duration-500">
                            {Icon && <Icon size={120} />}
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-900/20`}>
                                        EC
                                    </div>
                                    <div>
                                        <p className="font-bold text-white text-sm">Evelyn Carter</p>
                                        <p className="text-white/40 text-xs">12/5/2024</p>
                                    </div>
                                </div>
                                <Quote className="text-blue-400/20" size={24} />
                            </div>

                            <h3 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                {testimonials[2].quote}
                            </h3>
                            <p className="text-base text-white/70 font-light leading-relaxed">
                                {testimonials[2].description}
                            </p>
                        </div>
                    </motion.div>
                );
            })()}

        </div>
    );
}
