"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordGateProps {
    children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const HARDCODED_PASSWORD = "design_secret";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === HARDCODED_PASSWORD) {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4 relative">
            {/* Background ambient glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6"
                        >
                            <Lock className="w-6 h-6 text-white/70" strokeWidth={1.5} />
                        </motion.div>
                        <h1 className="text-3xl font-bold mb-3 font-heading tracking-tight">Confidential Case Study</h1>
                        <p className="text-white/50 text-lg leading-relaxed">
                            This project is under an NDA. Please enter the access password to view the process.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            animate={error ? { x: [-4, 4, -4, 4, 0] } : {}}
                            transition={{ duration: 0.4 }}
                            className="relative"
                        >
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 pr-14 outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all text-center text-xl placeholder:text-white/20`}
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/20 hover:text-white/50 transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </motion.div>

                        <button
                            type="submit"
                            className="w-full bg-white text-black font-semibold py-4 rounded-2xl hover:bg-opacity-90 active:scale-[0.98] transition-all text-lg shadow-lg shadow-white/5"
                        >
                            Access Case Study
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button
                            onClick={() => window.history.back()}
                            className="text-white/30 hover:text-white/60 transition-colors text-sm font-medium"
                        >
                            ← Go back
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

