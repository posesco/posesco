import React, { memo } from "react";
import { motion } from "motion/react";

// CSS keyframes injected once
const ledStyle = `
@keyframes led-blink {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.8; }
}
`;

export const DataCenterBackground = memo(() => {
  const FOCAL_Y = 360; // Slightly lowered focal point

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      <style>{ledStyle}</style>
      <svg
        viewBox="0 0 1000 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-[0.3]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="corridor-gradient" x1="500" y1="0" x2="500" y2="600" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="transparent" />
            <stop offset="0.5" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="1" stopColor="transparent" />
          </linearGradient>
          <radialGradient id="vanishing-point-gradient" cx="500" cy={FOCAL_Y} r="400" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#818cf8" stopOpacity="0.2" />
            <stop offset="0.5" stopColor="#6366f1" stopOpacity="0.05" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
          <filter id="glow-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" result="blur" />
          </filter>
          <mask id="fade-mask">
            <radialGradient id="mask-gradient" cx="500" cy={FOCAL_Y} r="500" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="white" />
              <stop offset="0.8" stopColor="white" stopOpacity="0.5" />
              <stop offset="1" stopColor="transparent" />
            </radialGradient>
            <rect width="1000" height="600" fill="url(#mask-gradient)" />
          </mask>
        </defs>

        <g mask="url(#fade-mask)">
          {/* Perspective lines (Floor & Ceiling) */}
          {[...Array(16)].map((_, i) => {
            const angle = (i - 7.5) * 0.15;
            const x2 = 500 + Math.tan(angle) * 1000;
            return (
              <React.Fragment key={i}>
                <line x1="500" y1={FOCAL_Y} x2={x2} y2="700" stroke="#6366f1" strokeOpacity="0.1" strokeWidth="0.5" />
                <line x1="500" y1={FOCAL_Y} x2={x2} y2="-100" stroke="#6366f1" strokeOpacity="0.1" strokeWidth="0.5" />
              </React.Fragment>
            );
          })}

          {/* Depth Horizontal Lines (Grid) */}
          {[...Array(10)].map((_, i) => {
            const scale = Math.pow(i / 10, 2);
            const yTop = FOCAL_Y - (FOCAL_Y + 40) * scale;
            const yBottom = FOCAL_Y + (640 - FOCAL_Y) * scale;
            const xLeft = 500 - 500 * scale;
            const xRight = 500 + 500 * scale;
            return (
              <React.Fragment key={`grid-${i}`}>
                <line x1={xLeft} y1={yTop} x2={xRight} y2={yTop} stroke="#6366f1" strokeOpacity="0.05" strokeWidth="0.5" />
                <line x1={xLeft} y1={yBottom} x2={xRight} y2={yBottom} stroke="#6366f1" strokeOpacity="0.05" strokeWidth="0.5" />
              </React.Fragment>
            );
          })}

          {/* Ceiling & Floor Grid Lines */}
          {[...Array(6)].map((_, i) => {
            const scale = Math.pow(i / 6, 2);
            const yTop = FOCAL_Y - (FOCAL_Y + 100) * scale;
            const yBottom = FOCAL_Y + (600 - FOCAL_Y + 100) * scale;
            return (
              <React.Fragment key={`grid-lines-${i}`}>
                <line 
                  x1={500 - 500 * scale} y1={yTop} x2={500 + 500 * scale} y2={yTop} 
                  stroke="#6366f1" strokeOpacity="0.03" strokeWidth="0.5" 
                />
                <line 
                  x1={500 - 500 * scale} y1={yBottom} x2={500 + 500 * scale} y2={yBottom} 
                  stroke="#6366f1" strokeOpacity="0.03" strokeWidth="0.5" 
                />
              </React.Fragment>
            );
          })}

          {/* Industrial Lights (Ceiling & Floor) */}
          {([-1, 1] as const).map((ySide) => 
            [-500, 0, 500].map((xOffset) => (
              <g key={`lights-${ySide}-${xOffset}`}>
                {[...Array(6)].map((_, i) => {
                  const s1 = Math.pow((i + 1) / 6, 1.8);
                  const s2 = Math.pow((i + 0.3) / 6, 1.8);
                  
                  const x1 = 500 + xOffset * s1;
                  const x2 = 500 + xOffset * s2;
                  
                  const yHeight = ySide === -1 ? -450 : 220; 
                  const y1 = FOCAL_Y + yHeight * s1;
                  const y2 = FOCAL_Y + yHeight * s2;

                  return (
                    <React.Fragment key={i}>
                      <line
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#818cf8"
                        strokeWidth={6 * s1}
                        strokeOpacity={0.06 * (i / 6)}
                        strokeLinecap="round"
                      />
                      <line
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke="#e0e7ff"
                        strokeWidth={1.5 * s1}
                        strokeOpacity={0.18 * (i / 6)}
                        strokeLinecap="round"
                      />
                    </React.Fragment>
                  );
                })}
              </g>
            ))
          )}

          {/* Racks in Perspective */}
          {([-1, 1] as const).map((side) =>
            [...Array(8)].map((_, i) => {
              const s1 = Math.pow((i + 1) / 8, 1.5);
              const s2 = Math.pow((i + 0.6) / 8, 1.5); // Thickness

              const x1 = 500 + side * 500 * s1;
              const x2 = 500 + side * 500 * s2;
              
              const y1T = FOCAL_Y - (FOCAL_Y - 50) * s1;
              const y1B = FOCAL_Y + (550 - FOCAL_Y) * s1;
              const y2T = FOCAL_Y - (FOCAL_Y - 50) * s2;
              const y2B = FOCAL_Y + (550 - FOCAL_Y) * s2;

              const points = `${x1},${y1T} ${x1},${y1B} ${x2},${y2B} ${x2},${y2T}`;

              return (
                <g key={`rack-${side}-${i}`} opacity={0.3 + (i / 8) * 0.7}>
                  <polygon
                    points={points}
                    stroke="#6366f1"
                    strokeOpacity="0.2"
                    strokeWidth={0.5 + (i / 8)}
                    fill="#0f172a"
                    fillOpacity="0.6"
                  />
                  
                  {/* Vertical Perspective Blinking LEDs */}
                  {[...Array(3)].map((_, j) => {
                    const u = (j + 1) / 4;
                    const sLed = s2 + u * (s1 - s2);
                    const xLed = 500 + side * 500 * sLed;
                    const yLedT = FOCAL_Y - (FOCAL_Y - 100) * sLed;
                    const yLedB = FOCAL_Y + (500 - FOCAL_Y) * sLed;
                    
                    // LED Color Distribution: predominantly blue, some green, occasional red
                    const ledColors = ["#818cf8", "#818cf8", "#4ade80", "#818cf8", "#f87171"];
                    
                    // Divide into segments for blinking effect
                    return [...Array(4)].map((_, k) => {
                      const kStart = k / 4;
                      const kEnd = (k + 0.8) / 4;
                      const ySegT = yLedT + (yLedB - yLedT) * kStart;
                      const ySegB = yLedT + (yLedB - yLedT) * kEnd;
                      const color = ledColors[(i + j + k + (side === 1 ? 2 : 0)) % ledColors.length];

                      return (
                        <line
                          key={`led-${j}-${k}`}
                          x1={xLed} y1={ySegT} x2={xLed} y2={ySegB}
                          stroke={color}
                          strokeWidth={1 * sLed}
                          strokeLinecap="round"
                          style={{
                            animation: `led-blink ${1.5 + j * 0.5}s ease-in-out infinite`,
                            animationDelay: `${(i * 0.3 + j * 0.2 + k * 0.1).toFixed(1)}s`,
                          }}
                        />
                      );
                    });
                  })}
                </g>
              );
            })
          )}

          {/* Data flow lines */}
          {[...Array(8)].map((_, i) => {
            const side = i % 2 === 0 ? -1 : 1;
            const yEnd = FOCAL_Y + (Math.random() - 0.5) * 500;
            const xEnd = 500 + side * 600;
            return (
              <motion.path
                key={i}
                d={`M 500 ${FOCAL_Y} L ${xEnd} ${yEnd}`}
                stroke="url(#corridor-gradient)"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: [0, 1], opacity: [0, 0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
              />
            );
          })}
        </g>

          <circle cx="500" cy={FOCAL_Y} r="150" fill="url(#vanishing-point-gradient)" filter="url(#glow-filter)" />
      </svg>

      <div className="absolute inset-0 bg-radial-[at_50%_60%] from-transparent via-slate-950/10 to-slate-950/60" />
    </div>
  );
});

DataCenterBackground.displayName = "DataCenterBackground";
