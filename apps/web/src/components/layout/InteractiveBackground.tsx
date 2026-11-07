'use client';

import React, { useState, useEffect } from 'react';

interface InteractiveBackgroundProps {
  children?: React.ReactNode;
}

export function InteractiveBackground({ children }: InteractiveBackgroundProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 15 });

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

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden transition-colors duration-500">
      {/* Light Horizon Glow */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-300 ease-out dark:hidden"
        style={{
          background: `radial-gradient(125% 125% at ${mousePos.x}% ${mousePos.y}%, #ffffff 40%, #475569 100%)`,
        }}
      />
      {/* Dark Horizon Glow */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-300 ease-out hidden dark:block"
        style={{
          background: `radial-gradient(125% 125% at ${mousePos.x}% ${mousePos.y}%, #000000 40%, #0d1a36 100%)`,
        }}
      />
      <div className="relative z-10 w-full min-h-screen flex flex-col">{children}</div>
    </div>
  );
}
