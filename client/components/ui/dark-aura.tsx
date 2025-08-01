import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Vertex shader
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Fragment shader dengan noise dan efek aura
const fragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColorCenter;
  uniform vec3 uColorEdge;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Noise function
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
    
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    
    for (int i = 0; i < 6; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }
  
  void main() {
    vec2 st = vUv * 3.0;
    vec2 center = vec2(0.5, 0.3);
    
    // Create triangular shape with jagged edges
    float triangleHeight = 0.8;
    float triangleWidth = 0.6;
    
    // Distance from center point (bottom of triangle)
    vec2 toCenter = vUv - center;
    
    // Create basic triangle shape
    float triangleMask = 1.0;
    
    // Bottom edge
    if (toCenter.y < 0.0) {
      triangleMask = 0.0;
    }
    
    // Side edges with slope
    float sideDistance = abs(toCenter.x) / triangleWidth + (1.0 - toCenter.y) / triangleHeight;
    if (sideDistance > 0.5) {
      triangleMask = 0.0;
    }
    
    // Add noise for jagged edges
    float edgeNoise = fbm(st + uTime * 0.5) * 0.3;
    float distanceFromEdge = 0.5 - sideDistance;
    
    // Create jagged edge effect
    float jaggedEdge = smoothstep(0.0, 0.2, distanceFromEdge + edgeNoise);
    triangleMask *= jaggedEdge;
    
    // Create inner energy effect
    float innerNoise = fbm(st * 2.0 + uTime * 0.8) * 0.5 + 0.5;
    float pulseEffect = sin(uTime * 3.0) * 0.3 + 0.7;
    float flickerEffect = sin(uTime * 8.0 + noise(st)) * 0.2 + 0.8;
    
    // Distance from center for radial gradient
    float distFromCenter = length(toCenter);
    float radialGradient = 1.0 - smoothstep(0.0, 0.4, distFromCenter);
    
    // Combine effects
    float intensity = triangleMask * innerNoise * pulseEffect * flickerEffect * uIntensity;
    intensity *= radialGradient;
    
    // Color mixing
    vec3 finalColor = mix(uColorEdge, uColorCenter, intensity);
    
    // Add glow effect
    float glowIntensity = pow(intensity, 0.5) * 1.5;
    finalColor += vec3(0.3, 0.1, 0.5) * glowIntensity;
    
    // Alpha for transparency and glow
    float alpha = intensity * 0.8;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function DarkAura() {
  const meshRef = useRef();
  const materialRef = useRef();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: 1.0 },
    uColorCenter: { value: new THREE.Color('#E6E6FA') }, // Light purple center
    uColorEdge: { value: new THREE.Color('#4B0082') }    // Dark purple/indigo edge
  }), []);
  
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Add subtle intensity variation
      const baseIntensity = 1.0;
      const variation = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      materialRef.current.uniforms.uIntensity.value = baseIntensity + variation;
    }
  });
  
  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[4, 4, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />
      
      {/* Point light for additional illumination */}
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#8A2BE2" />
      
      {/* Main aura effect */}
      <DarkAura />
      
      {/* Additional background aura layer for depth */}
      <mesh position={[0, 0, -0.1]} scale={1.2}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial 
          color="#2E0854" 
          transparent={true} 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Camera controls */}
      <OrbitControls 
        enableZoom={true} 
        enablePan={true} 
        enableRotate={true}
        maxDistance={10}
        minDistance={2}
      />
    </>
  );
}

export default function DarkPurpleAura() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
      className="absolute inset-0 w-full h-full" // Add Tailwind classes for full coverage
    >
      <Scene />
    </Canvas>
  );
}