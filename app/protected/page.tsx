"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "../components/Footer";

export default function ProtectedPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  // This is a client-side only protection. 
  // For higher security, verify via API.
  // TODO: Change this password
  const HARDCODED_PASSWORD = "design_secret";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === HARDCODED_PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      // Shake animation trigger
      setTimeout(() => setError(false), 500);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="pt-24 md:pt-32 px-4 min-h-screen flex flex-col">
        <div className="max-w-3xl mx-auto w-full flex-grow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 font-heading">
              Confidential Work
            </h1>
            <p className="text-xl opacity-80 mb-12">
              Welcome. This area contains protected case studies and work in progress.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Placeholder Content */}
              <div className="aspect-video bg-white/5 rounded-lg border border-white/10 p-8 flex items-center justify-center group hover:bg-white/10 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Project Alpha</div>
                  <div className="text-sm opacity-60">Coming Soon</div>
                </div>
              </div>
              <div className="aspect-video bg-white/5 rounded-lg border border-white/10 p-8 flex items-center justify-center group hover:bg-white/10 transition-colors cursor-pointer">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">Project Beta</div>
                  <div className="text-sm opacity-60">In Progress</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 font-heading">Protected Area</h1>
            <p className="opacity-60">Please enter the password to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <motion.div
              animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-white/30 transition-colors text-center text-lg placeholder:text-white/20"
                autoFocus
              />
            </motion.div>
            
            <button
              type="submit"
              className="mt-6 w-full bg-white text-black font-medium py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Enter
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
