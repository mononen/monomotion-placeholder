import { useRef, Suspense, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { Group, Mesh, Box3, Vector3 } from 'three';

interface RotatingModelProps {
  url: string;
}

function RotatingModel({ url }: RotatingModelProps) {
  const groupRef = useRef<Group>(null);
  const { scene } = useGLTF(url);
  const { camera } = useThree();

  // Clone the scene to avoid mutation issues
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (groupRef.current) {
      // Calculate bounding box
      const box = new Box3().setFromObject(groupRef.current);
      const size = new Vector3();
      const center = new Vector3();
      box.getSize(size);
      box.getCenter(center);
      
      // Get the largest dimension
      const maxDim = Math.max(size.x, size.y, size.z);
      
      // Scale model to fit nicely in view (target size ~3 units)
      const targetSize = 3;
      const scale = maxDim > 0 ? targetSize / maxDim : 1;
      groupRef.current.scale.setScalar(scale);
      
      // Center the model at origin
      groupRef.current.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale
      );
      
      // Position camera slightly above, looking down at the model
      camera.position.set(0, 2.5, 5.5);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    }
  }, [clonedScene, camera]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  // Apply a metallic material to the model
  clonedScene.traverse((child) => {
    if (child instanceof Mesh && child.material) {
      child.material.metalness = 0.8;
      child.material.roughness = 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
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
      camera={{ position: [0, 2.5, 5.5], fov: 35 }}
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
    </Canvas>
  );
}
