/* eslint-disable linebreak-style */
/* eslint-disable prettier/prettier */

import baffle from 'baffle';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FlippingText = ({ words, className }: { words: string[]; className?: string }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Word cycling - exactly like the open source
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % words.length;
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(wordInterval);
  }, [words.length]);

  // Baffle effect - EXACTLY like the open source code
  useEffect(() => {
    const baffleElements = document.querySelectorAll('[data-baffle-flip]');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const baffleInstances: any[] = [];

    baffleElements.forEach((el) => {
      const b = baffle(el);
      b.set({
        characters: '█▓▒░█▓▒░<>$%@',
        speed: 75
      });
      b.start();
      baffleInstances.push(b);
    });

    const runBaffleAnimation = () => {
      baffleInstances.forEach((b, index) => {
        setTimeout(() => {
          b.reveal(1500); // Reveal duration in milliseconds
        }, index * 500); // 0.5 seconds delay for each element
      });
    };

    // Run the baffle animation initially
    runBaffleAnimation();

    // Re-run the baffle animation every 4 seconds
    const interval = setInterval(() => {
      baffleInstances.forEach((b) => b.start()); // Reset to scrambled state
      runBaffleAnimation(); // Reveal again
    }, 4000);

    return () => {
      clearInterval(interval);
      // Clean up baffle instances
      baffleInstances.forEach((b) => {
        try {
          b.destroy?.();
        } catch (error) {
          console.warn('Baffle cleanup failed:', error);
        }
      });
    };
  }, []);

  return (
    <span className={clsx('relative inline-block flipping-text', className)}>
      {words.map((word, index) => (
        <span
          key={index}
          className="tracking-tighter"
          data-baffle-flip
          style={{
            display: currentWordIndex === index ? 'inline' : 'none'
          }}
        >
          {word}
        </span>
      ))}
      <motion.span
        layout
        className="absolute -right-4 bottom-2 inline-block rounded-full bg-black"
        style={{
          width: '0.25em',
          height: '0.25em'
        }}
        animate={{
          backgroundColor: ['#60a5fa', '#22c55e', '#3b82f6']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
    </span>
  );
};

export default FlippingText;
