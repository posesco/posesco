import React from "react";
import { motion } from "motion/react";

export const DataCenterBackground = () => {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      <svg
        viewBox="0 0 1000 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-[0.25]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="corridor-gradient" x1="500" y1="0" x2="500" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="transparent" />
            <stop offset="0.5" stopColor="#6366f1" stopOpacity="0.15" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>
          
          <radialGradient id="vanishing-point-gradient" cx="500" cy="300" r="300" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#818cf8" stopOpacity="0.4" />
            <stop offset="0.4" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>

          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="30" result="blur" />
          </filter>

          <mask id="fade-mask">
            <radialGradient id="mask-gradient" cx="500" cy="300" r="500" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="white" />
              <stop offset="0.7" stopColor="white" stopOpacity="0.4" />
              <stop offset="1" stopColor="transparent" />
            </radialGradient>
            <rect width="1000" height="600" fill="url(#mask-gradient)" />
          </mask>
        </defs>

        <g mask="url(#fade-mask)">
          {/* Floor and Ceiling Perspective Lines */}
          {[...Array(12)].map((_, i) => {
            const angle = (i - 5.5) * 0.2;
            const x2 = 500 + Math.tan(angle) * 600;
            return (
              <React.Fragment key={i}>
                {/* Floor */}
                <line
                  x1="500" y1="300"
                  x2={x2} y2="600"
                  stroke="#6366f1"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
                {/* Ceiling */}
                <line
                  x1="500" y1="300"
                  x2={x2} y2="0"
                  stroke="#6366f1"
                  strokeOpacity="0.15"
                  strokeWidth="1"
                />
              </React.Fragment>
            );
          })}

          {/* Racks - Left Side */}
          {[...Array(8)].map((_, i) => {
            const progress = (i + 1) / 8;
            const scale = Math.pow(progress, 1.5);
            const x = 500 - 500 * scale;
            const width = 100 * scale;
            const height = 600 * scale;
            const y = 300 - height / 2;

            return (
              <g key={`rack-l-${i}`} opacity={0.4 + (progress * 0.6)}>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  stroke="#6366f1"
                  strokeOpacity="0.25"
                  strokeWidth={0.5 + progress}
                  fill="#0f172a"
                  fillOpacity="0.5"
                />
                {/* Rack LEDs/Details */}
                {[...Array(4)].map((_, j) => (
                  <motion.rect
                    key={j}
                    x={x + width * 0.2}
                    y={y + (height * (j + 1)) / 5}
                    width={width * 0.6}
                    height={2 * scale}
                    fill="#818cf8"
                    animate={{
                      opacity: [0.1, 0.8, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2 + j * 0.5,
                    }}
                  />
                ))}
              </g>
            );
          })}

          {/* Racks - Right Side */}
          {[...Array(8)].map((_, i) => {
            const progress = (i + 1) / 8;
            const scale = Math.pow(progress, 1.5);
            const x = 500 + (500 * scale) - (100 * scale);
            const width = 100 * scale;
            const height = 600 * scale;
            const y = 300 - height / 2;

            return (
              <g key={`rack-r-${i}`} opacity={0.4 + (progress * 0.6)}>
                <rect
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  stroke="#6366f1"
                  strokeOpacity="0.25"
                  strokeWidth={0.5 + progress}
                  fill="#0f172a"
                  fillOpacity="0.5"
                />
                {/* Rack LEDs/Details */}
                {[...Array(4)].map((_, j) => (
                  <motion.rect
                    key={j}
                    x={x + width * 0.2}
                    y={y + (height * (j + 1)) / 5}
                    width={width * 0.6}
                    height={2 * scale}
                    fill="#818cf8"
                    animate={{
                      opacity: [0.1, 0.8, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2 + j * 0.5 + 1,
                    }}
                  />
                ))}
              </g>
            );
          })}

          {/* Data Flow Lines */}
          {[...Array(6)].map((_, i) => {
            const side = i % 2 === 0 ? -1 : 1;
            const yPos = 300 + (i - 2.5) * 40;
            return (
              <motion.path
                key={i}
                d={`M 500 300 L ${500 + side * 600} ${yPos}`}
                stroke="url(#corridor-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ 
                  pathLength: [0, 1],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "linear"
                }}
              />
            );
          })}
        </g>
        
        {/* Central Glow */}
        <circle 
          cx="500" 
          cy="300" 
          r="250" 
          fill="url(#vanishing-point-gradient)" 
          filter="url(#glow-filter)"
        />
      </svg>
      
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-radial-[at_50%_50%] from-transparent via-slate-950/20 to-slate-950/80" />
    </div>
  );
};
