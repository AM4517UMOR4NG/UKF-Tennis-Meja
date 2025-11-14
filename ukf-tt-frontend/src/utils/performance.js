// Performance monitoring utilities

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isSupported = 'PerformanceObserver' in window;
  }

  // Initialize performance monitoring
  init() {
    if (!this.isSupported) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTFB();
  }

  // Largest Contentful Paint
  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.metrics.set('LCP', lastEntry.startTime);
      this.reportMetric('LCP', lastEntry.startTime);
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    this.observers.set('LCP', observer);
  }

  // First Input Delay
  observeFID() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        const fid = entry.processingStart - entry.startTime;
        this.metrics.set('FID', fid);
        this.reportMetric('FID', fid);
      });
    });

    observer.observe({ entryTypes: ['first-input'] });
    this.observers.set('FID', observer);
  }

  // Cumulative Layout Shift
  observeCLS() {
    let clsValue = 0;
    let clsEntries = [];

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = clsEntries[0];
          const lastSessionEntry = clsEntries[clsEntries.length - 1];

          if (!firstSessionEntry || 
              entry.startTime - lastSessionEntry.startTime > 1000 ||
              entry.startTime - firstSessionEntry.startTime > 5000) {
            clsEntries = [entry];
          } else {
            clsEntries.push(entry);
          }

          clsValue = clsEntries.reduce((sum, e) => sum + e.value, 0);
          this.metrics.set('CLS', clsValue);
        }
      });
    });

    observer.observe({ entryTypes: ['layout-shift'] });
    this.observers.set('CLS', observer);

    // Report CLS when page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.reportMetric('CLS', clsValue);
      }
    });
  }

  // First Contentful Paint
  observeFCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          this.metrics.set('FCP', entry.startTime);
          this.reportMetric('FCP', entry.startTime);
        }
      });
    });

    observer.observe({ entryTypes: ['paint'] });
    this.observers.set('FCP', observer);
  }

  // Time to First Byte
  observeTTFB() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'navigation') {
          const ttfb = entry.responseStart - entry.requestStart;
          this.metrics.set('TTFB', ttfb);
          this.reportMetric('TTFB', ttfb);
        }
      });
    });

    observer.observe({ entryTypes: ['navigation'] });
    this.observers.set('TTFB', observer);
  }

  // Report metric to analytics service
  reportMetric(name, value) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}: ${Math.round(value)}ms`);
    }

    // In production, send to analytics service
    // Example: analytics.track('performance_metric', { name, value });
  }

  // Get all metrics
  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  // Cleanup observers
  disconnect() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}

// Memory usage monitoring
export function monitorMemoryUsage() {
  if ('memory' in performance) {
    const memory = performance.memory;
    return {
      used: Math.round(memory.usedJSHeapSize / 1048576), // MB
      total: Math.round(memory.totalJSHeapSize / 1048576), // MB
      limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
    };
  }
  return null;
}

// FPS monitoring
export class FPSMonitor {
  constructor(callback) {
    this.callback = callback;
    this.frames = 0;
    this.lastTime = performance.now();
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.tick();
  }

  stop() {
    this.isRunning = false;
  }

  tick() {
    if (!this.isRunning) return;

    this.frames++;
    const now = performance.now();

    if (now >= this.lastTime + 1000) {
      const fps = Math.round((this.frames * 1000) / (now - this.lastTime));
      this.callback(fps);
      this.frames = 0;
      this.lastTime = now;
    }

    requestAnimationFrame(() => this.tick());
  }
}

// Bundle size analyzer
export function analyzeBundleSize() {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'resource' && entry.name.includes('.js')) {
          console.log(`Bundle: ${entry.name.split('/').pop()} - ${Math.round(entry.transferSize / 1024)}KB`);
        }
      });
    });

    observer.observe({ entryTypes: ['resource'] });
    
    // Disconnect after 5 seconds
    setTimeout(() => observer.disconnect(), 5000);
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Auto-initialize in production
if (process.env.NODE_ENV === 'production') {
  performanceMonitor.init();
}

// Export for manual initialization
export default PerformanceMonitor;
