'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAudio } from '../contexts/AudioContext';
import Confetti from './components/Confetti';
import Snowflakes from './components/Snowflakes';
import TypedText from './components/TypedText';

export default function Home() {
  const [name, setName] = useState('Thảo Vy');
  const [showBalloon, setShowBalloon] = useState(false);
  const { play } = useAudio();

  useEffect(() => {
    // Get name from URL if available
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('name');
      if (nameParam && nameParam !== name) {
        setName(nameParam);
      }
    }
    
    // Auto start và show balloon
    setShowBalloon(true);
    
    // Ensure audio is playing
    play();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-[#f0cccf] relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Snowflakes />

      {/* Main Content */}
      <Confetti />
          
      <motion.div 
        className="container mx-auto px-4 pt-4 md:pt-8 relative z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center gap-3 md:gap-4">
          {/* Banner Image */}
          <div className="w-full max-w-md md:max-w-lg">
            <Image
              src="/banner.png"
              alt="Happy Birthday Banner"
              width={800}
              height={400}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Name Display */}
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-[#C4515C] gap-2 bounce-animation"
                style={{
                  letterSpacing: '-1px',
                  textShadow: '0px 0px 5px #fff, 0px 0px 7px #fff',
                  fontFamily: 'Verdana, Arial, sans-serif'
                }}>
              {name}
            </h1>
          </div>

          {/* Typed Text */}
          <TypedText name={name} />

          {/* Cake Image */}
          <div className="mt-2 md:mt-4 w-full max-w-xs md:max-w-sm">
            <Image
              src="/cake.gif"
              alt="Birthday Cake"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>
      </motion.div>

      {/* Balloon Border */}
      {showBalloon && (
        <motion.div 
          className="fixed left-0 opacity-50 z-99999 balloon-animate"
          style={{ top: '100%' }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          <Image
            src="/Balloon-Border.png"
            alt="Balloons"
            width={1920}
            height={500}
            className="w-screen"
          />
        </motion.div>
      )}

      {/* Mewmew GIF */}
      <motion.div 
        className="fixed bottom-4 left-4 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6, delay: 0.8, type: 'spring', bounce: 0.5 }}
      >
        <Image
          src="/mewmew.gif"
          alt="Mewmew"
          width={150}
          height={150}
          className="w-20 md:w-28"
        />
      </motion.div>
    </motion.div>
  );
}
