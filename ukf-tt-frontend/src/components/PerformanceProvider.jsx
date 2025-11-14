import React, { createContext, useContext, useEffect, useState } from 'react';
import { performanceMonitor, monitorMemoryUsage, FPSMonitor } from '../utils/performance';

const PerformanceContext = createContext();

export const usePerformance = () => {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
};

export const PerformanceProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({});
  const [fps, setFPS] = useState(60);
  const [memory, setMemory] = useState(null);
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  useEffect(() => {
    // Initialize performance monitoring
    performanceMonitor.init();

    // FPS monitoring
    const fpsMonitor = new FPSMonitor((currentFPS) => {
      setFPS(currentFPS);
      setIsLowPerformance(currentFPS < 30);
    });

    fpsMonitor.start();

    // Memory monitoring
    const memoryInterval = setInterval(() => {
      const memoryInfo = monitorMemoryUsage();
      if (memoryInfo) {
        setMemory(memoryInfo);
        
        // Check for memory pressure
        const memoryUsagePercent = (memoryInfo.used / memoryInfo.total) * 100;
        if (memoryUsagePercent > 80) {
          console.warn('High memory usage detected:', memoryInfo);
        }
      }
    }, 5000);

    // Update metrics periodically
    const metricsInterval = setInterval(() => {
      setMetrics(performanceMonitor.getMetrics());
    }, 2000);

    return () => {
      fpsMonitor.stop();
      clearInterval(memoryInterval);
      clearInterval(metricsInterval);
      performanceMonitor.disconnect();
    };
  }, []);

  const value = {
    metrics,
    fps,
    memory,
    isLowPerformance,
    // Performance optimization helpers
    shouldReduceAnimations: isLowPerformance || fps < 30,
    shouldReduceParticles: memory?.used > 100, // Over 100MB
    performanceLevel: fps > 50 ? 'high' : fps > 30 ? 'medium' : 'low'
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
};
