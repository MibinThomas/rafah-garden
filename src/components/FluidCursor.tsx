'use client';

import { useEffect, useRef } from 'react';

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const initFluid = async () => {
      if (typeof window !== 'undefined' && canvasRef.current) {
        try {
          // INTERCEPT canvas event listeners to bind them to window!
          // This allows the pointer-events-none canvas to flawlessly receive mouse movements
          // across the entire page without blocking interactions.
          const originalAddEventListener = canvasRef.current.addEventListener.bind(canvasRef.current);
          canvasRef.current.addEventListener = (type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => {
            // Bind mouse and touch events to window instead of canvas
            if (['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'].includes(type)) {
              window.addEventListener(type, listener, options);
            } else {
              originalAddEventListener(type, listener, options);
            }
          };

          // @ts-expect-error webgl-fluid has no types
          const webGLFluid = (await import('webgl-fluid')).default;
          webGLFluid(canvasRef.current, {
            IMMEDIATE: true, 
             // Behavior
            TRIGGER: 'hover',
            SIM_RESOLUTION: 128,
            DYE_RESOLUTION: 1024,
            CAPTURE_RESOLUTION: 512,
            DENSITY_DISSIPATION: 2.5,
            VELOCITY_DISSIPATION: 0.9,
            PRESSURE: 0.1,
            PRESSURE_ITERATIONS: 20,
            CURL: 3,
            SPLAT_RADIUS: 0.2,
            SPLAT_FORCE: 6000,
            SHADING: true,
            COLORFUL: true, // Colors that change over time!
            COLOR_UPDATE_SPEED: 10,
            PAUSED: false,
            // Visuals
            BACK_COLOR: { r: 0, g: 0, b: 0 },
            TRANSPARENT: true, // Highly important to see the rest of the website
            BLOOM: true,
            BLOOM_ITERATIONS: 8,
            BLOOM_RESOLUTION: 256,
            BLOOM_INTENSITY: 0.8,
            BLOOM_THRESHOLD: 0.6,
            BLOOM_SOFT_KNEE: 0.7,
            SUNRAYS: true,
            SUNRAYS_RESOLUTION: 196,
            SUNRAYS_WEIGHT: 1.0,
          });
        } catch (error) {
          console.error("Failed to initialize webgl-fluid", error);
        }
      }
    };

    initFluid();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[50]">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full" 
      />
    </div>
  );
}
