import React, { useEffect, useRef } from 'react';

export default function AnimatedShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader source - animated light streaks/rain effect
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      vec3 getStreakColor(float t) {
        // Blue to cyan to purple gradient
        vec3 blue = vec3(0.2, 0.5, 1.0);
        vec3 cyan = vec3(0.0, 0.8, 1.0);
        vec3 purple = vec3(0.5, 0.2, 0.8);
        
        if (t < 0.33) {
          return mix(blue, cyan, t * 3.0);
        } else if (t < 0.66) {
          return mix(cyan, purple, (t - 0.33) * 3.0);
        } else {
          return mix(purple, blue, (t - 0.66) * 3.0);
        }
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv;
        
        vec3 color = vec3(0.0);
        
        // Create multiple layers of streaks
        for (float i = 0.0; i < 8.0; i++) {
          float id = i;
          float speed = 0.3 + random(vec2(id)) * 0.4;
          float offset = random(vec2(id * 2.0)) * 10.0;
          
          // Diagonal movement
          float y = mod(p.y + p.x * 0.5 + u_time * speed + offset, 1.0);
          
          // Create streak shape
          float streak = 1.0 - abs(y - 0.5) * 2.0;
          streak = pow(streak, 2.0 + random(vec2(id * 3.0)) * 3.0);
          
          // Add width variation
          float width = 0.01 + random(vec2(id * 5.0)) * 0.02;
          float xPos = random(vec2(id * 7.0));
          float dist = abs(p.x - xPos);
          streak *= smoothstep(width, 0.0, dist);
          
          // Add glow
          float glow = exp(-dist * 20.0) * 0.3;
          
          // Color variation
          float colorT = random(vec2(id * 11.0));
          vec3 streakColor = getStreakColor(colorT);
          
          color += streakColor * (streak + glow) * (0.4 + random(vec2(id * 13.0)) * 0.6);
        }
        
        // Add some ambient glow
        vec3 ambient = vec3(0.05, 0.1, 0.15) * 0.3;
        color += ambient;
        
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

    if (!program) return;

    // Create a buffer for the full screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Set up the attributes and uniforms
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    function resizeCanvas() {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
    }

    let animationFrameId;
    let startTime = Date.now();

    function render() {
      resizeCanvas();
      
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
      
      const currentTime = (Date.now() - startTime) / 1000.0;
      gl.uniform1f(timeLocation, currentTime);
      gl.uniform2f(resolutionLocation, gl.drawingBufferWidth, gl.drawingBufferHeight);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ 
        mixBlendMode: 'screen',
        opacity: 1.0
      }}
    />
  );
}

