/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, X } from 'lucide-react';

// Simulation of the Android App in React for Preview
export default function App() {
  const [screen, setScreen] = useState<'splash' | 'menu' | 'game'>('splash');
  const [showExitDialog, setShowExitDialog] = useState(false);

  useEffect(() => {
    if (screen === 'splash') {
      const timer = setTimeout(() => {
        setScreen('menu');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  return (
    <div className="h-screen w-screen bg-black overflow-hidden font-sans text-white select-none">
      <AnimatePresence mode="wait">
        {screen === 'splash' && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full flex flex-col items-center justify-center bg-[#0A192F]"
          >
            <motion.div
              initial={{ x: '-150%', rotate: 0 }}
              animate={{ x: 0, rotate: 1080 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              onAnimationComplete={() => {
                // Shockwave effect simulation
              }}
              className="relative"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  x: [0, -5, 5, -5, 5, 0]
                }}
                transition={{ delay: 1.5, duration: 0.2 }}
                className="w-32 h-32 bg-black rounded-full border-4 border-white flex items-center justify-center shadow-2xl"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black text-4xl font-bold">8</span>
                </div>
              </motion.div>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-8 text-xl font-medium"
            >
              Loading...
            </motion.p>
          </motion.div>
        )}

        {screen === 'menu' && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full relative bg-[#0E4D2C] flex flex-col items-center justify-center p-6"
          >
            {/* Floating Balls Background */}
            <FloatingBall color="bg-yellow-400" num="1" delay={0} pos="top-10 left-10" size="w-16 h-16" />
            <FloatingBall color="bg-blue-600" num="2" delay={1} pos="bottom-20 right-10" size="w-12 h-12" />
            <FloatingBall color="bg-red-600" num="3" delay={2} pos="top-1/2 right-5" size="w-20 h-20" />
            <FloatingBall color="bg-purple-600" num="4" delay={0.5} pos="bottom-10 left-20" size="w-14 h-14" />

            <div className="z-10 text-center">
              <motion.h1 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-6xl font-black tracking-tighter drop-shadow-lg"
              >
                8 BALL
              </motion.h1>
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-yellow-400 tracking-widest mb-16"
              >
                BILLIARDS CLASSIC
              </motion.h2>

              <motion.button
                onClick={() => setScreen('game')}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="bg-[#1A1A1A] hover:bg-black text-white px-12 py-5 rounded-xl text-2xl font-bold shadow-2xl flex items-center gap-3 border-2 border-white/10"
              >
                <Play fill="currentColor" />
                PLAY NOW
              </motion.button>
            </div>
          </motion.div>
        )}

        {screen === 'game' && (
          <motion.div
            key="game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full bg-black relative"
          >
            <iframe 
              src="https://play.famobi.com/8-ball-billiards-classic"
              className="w-full h-full border-none"
              title="8 Ball Billiards Classic"
            />
            
            <button 
              onClick={() => setShowExitDialog(true)}
              className="absolute top-4 left-4 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
            >
              <X size={24} />
            </button>

            {showExitDialog && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-[#1A1A1A] p-8 rounded-2xl max-w-sm w-full border border-white/10 shadow-2xl"
                >
                  <h3 className="text-2xl font-bold mb-4">Exit Game</h3>
                  <p className="text-gray-400 mb-8">Apakah Anda ingin keluar dari game?</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setScreen('menu')}
                      className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold transition-colors"
                    >
                      Ya
                    </button>
                    <button 
                      onClick={() => setShowExitDialog(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-xl font-bold transition-colors"
                    >
                      Tidak
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingBall({ color, num, delay, pos, size }: { color: string, num: string, delay: number, pos: string, size: string }) {
  return (
    <motion.div
      animate={{ 
        y: [-20, 20, -20],
        rotate: [-5, 5, -5]
      }}
      transition={{ 
        duration: 4 + delay, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay 
      }}
      className={`absolute ${pos} ${size} ${color} rounded-full flex items-center justify-center shadow-xl opacity-40`}
    >
      <div className="w-1/2 h-1/2 bg-white rounded-full flex items-center justify-center">
        <span className="text-black text-[10px] font-bold">{num}</span>
      </div>
    </motion.div>
  );
}
