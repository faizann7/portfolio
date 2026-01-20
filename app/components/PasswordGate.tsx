"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Linkedin } from "lucide-react";
import StackedWorkCards from "./StackedWorkCards";
import Toast from "./Toast";

interface PasswordGateProps {
    children: React.ReactNode;
    projectId?: string;
}

export default function PasswordGate({ children, projectId = "" }: PasswordGateProps) {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const HARDCODED_PASSWORD = "design_secret";
    const email = 'mohammad.faizan6th@gmail.com';

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

    const copyEmailToClipboard = (e: React.MouseEvent) => {
        e.preventDefault();
        navigator.clipboard.writeText(email).then(() => {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
        });
    };

    if (isAuthenticated) {
        return <>{children}</>;
    }

    return (
        <div className="pt-32 pb-24">
            <div className="min-h-[60vh] flex items-center justify-center px-4 relative mb-24">
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
                            <p className="text-white/50 text-lg leading-relaxed mb-6">
                                Please enter the access password to view the process.
                            </p>

                            <div className="flex flex-col items-center gap-4 text-sm">
                                <span className="text-white/20 uppercase tracking-widest text-[10px] font-bold">Request access?</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={copyEmailToClipboard}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                                    >
                                        <Mail className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                                        <span className="text-white/60 group-hover:text-white transition-colors">Email</span>
                                    </button>
                                    <a
                                        href="https://www.linkedin.com/in/faizann/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                                    >
                                        <Linkedin className="w-3.5 h-3.5 text-white/40 group-hover:text-white transition-colors" />
                                        <span className="text-white/60 group-hover:text-white transition-colors">LinkedIn</span>
                                    </a>
                                </div>
                            </div>
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

            <div className="w-full">
                <StackedWorkCards currentProjectId={projectId} />
            </div>

            <Toast
                message="Email copied to clipboard!"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />
        </div>
    );
}

