import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Center } from '@react-three/drei';
import { Group, Mesh } from 'three';

interface RotatingModelProps {
  url: string;
}

function RotatingModel({ url }: RotatingModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(url);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Apply a metallic material to the model
  scene.traverse((child) => {
    if (child instanceof Mesh) {
      child.material.metalness = 0.8;
      child.material.roughness = 0.2;
    }
  });

  return (
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} scale={1} />
      </group>
    </Center>
  );
}

function FallbackGeometry() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial
        color="#ff6b35"
        metalness={0.9}
        roughness={0.1}
        emissive="#ff6b35"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

interface Model3DProps {
  modelUrl?: string;
}

export default function Model3D({ modelUrl }: Model3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <ambientLight intensity={0.3} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#ff6b35"
      />
      <spotLight
        position={[-10, -10, -10]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#00d4ff"
      />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffffff" />
      
      <Suspense fallback={null}>
        {modelUrl ? (
          <RotatingModel url={modelUrl} />
        ) : (
          <FallbackGeometry />
        )}
        <Environment preset="city" />
      </Suspense>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate={false}
      />
    </Canvas>
  );
}

