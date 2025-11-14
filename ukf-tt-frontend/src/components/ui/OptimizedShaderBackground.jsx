import React, { useEffect, useRef, useState, useCallback } from 'react';

export default function OptimizedShaderBackground({ enabled = true }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const programRef = useRef(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  // Performance monitoring
  const fpsRef = useRef({ frames: 0, lastTime: performance.now() });
  
  const checkVisibility = useCallback(() => {
    setIsVisible(!document.hidden);
  }, []);

  useEffect(() => {
    document.addEventListener('visibilitychange', checkVisibility);
    return () => document.removeEventListener('visibilitychange', checkVisibility);
  }, [checkVisibility]);

  useEffect(() => {
    if (!enabled || !isVisible || !isWebGLSupported) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      antialias: false, 
      depth: false, 
      stencil: false,
      alpha: false,
      powerPreference: 'low-power'
    });
    
    if (!gl) {
      console.warn('WebGL not supported, falling back to CSS animation');
      setIsWebGLSupported(false);
      return;
    }

    // Simplified vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Optimized fragment shader with reduced complexity
    const fragmentShaderSource = `
      precision lowp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec3 color = vec3(0.0);
        
        // Simplified streaks - only 4 layers instead of 8
        for (float i = 0.0; i < 4.0; i++) {
          float speed = 0.2 + hash(vec2(i)) * 0.3;
          float y = mod(uv.y + uv.x * 0.3 + u_time * speed, 1.0);
          
          float streak = smoothstep(0.0, 0.1, y) * smoothstep(1.0, 0.9, y);
          float width = 0.02;
          float xPos = hash(vec2(i * 2.0));
          streak *= smoothstep(width, 0.0, abs(uv.x - xPos));
          
          vec3 streakColor = mix(vec3(0.2, 0.5, 1.0), vec3(0.0, 0.8, 1.0), hash(vec2(i * 3.0)));
          color += streakColor * streak * 0.6;
        }
        
        color += vec3(0.05, 0.1, 0.15) * 0.2;
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program link error:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }
      return program;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    if (!program) {
      setIsWebGLSupported(false);
      return;
    }

    programRef.current = program;

    // Create buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    let startTime = Date.now();
    let frameCount = 0;

    function resizeCanvas() {
      const displayWidth = Math.min(canvas.clientWidth, 1920); // Cap resolution
      const displayHeight = Math.min(canvas.clientHeight, 1080);
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    function render() {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(render);
        return;
      }

      // FPS monitoring and throttling
      frameCount++;
      const now = performance.now();
      if (now - fpsRef.current.lastTime > 1000) {
        const fps = frameCount / ((now - fpsRef.current.lastTime) / 1000);
        frameCount = 0;
        fpsRef.current.lastTime = now;
        
        // If FPS drops below 30, reduce quality or skip frames
        if (fps < 30) {
          if (Math.random() > 0.5) { // Skip 50% of frames
            animationRef.current = requestAnimationFrame(render);
            return;
          }
        }
      }

      resizeCanvas();
      
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      const currentTime = (Date.now() - startTime) / 1000.0;
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (gl && program) {
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteProgram(program);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, [enabled, isVisible, isWebGLSupported]);

  if (!enabled) return null;

  // Fallback CSS animation if WebGL is not supported
  if (!isWebGLSupported) {
    return (
      <div 
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(0, 200, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
          animation: 'pulse 4s ease-in-out infinite alternate'
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        mixBlendMode: 'screen',
        opacity: 0.8
      }}
    />
  );
}
