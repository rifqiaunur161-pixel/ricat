'use client';

import React, { useState, useEffect } from 'react';

interface InteractiveBackgroundProps {
  theme?: 'dark' | 'light';
  children?: React.ReactNode;
}

/**
 * InteractiveBackground Component
 * Provides smooth interactive mouse-following radial gradient:
 * - Dark Horizon Glow: radial-gradient(125% 125% at ${x}% ${y}%, #000000 40%, #0d1a36 100%)
 * - Light Horizon Glow: radial-gradient(125% 125% at ${x}% ${y}%, #ffffff 40%, #475569 100%)
 */
export function InteractiveBackground({ theme = 'dark', children }: InteractiveBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 10 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = Math.round((e.clientX / innerWidth) * 100);
      const y = Math.round((e.clientY / innerHeight) * 100);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const gradientStyle =
    theme === 'dark'
      ? `radial-gradient(125% 125% at ${mousePos.x}% ${mousePos.y}%, #000000 40%, #0d1a36 100%)`
      : `radial-gradient(125% 125% at ${mousePos.x}% ${mousePos.y}%, #ffffff 40%, #475569 100%)`;

  return (
    <div className="min-h-screen w-full relative overflow-hidden transition-colors duration-500">
      {/* Interactive Radial Gradient Layer */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-150 ease-out"
        style={{
          background: gradientStyle,
        }}
      />
      {/* Content Layer */}
      <div className="relative z-10 w-full min-h-screen">
        {children}
      </div>
    </div>
  );
}

