import { Box } from '@mui/material';
import Model3D from './components/Model3D';
import ComingSoonCard from './components/ComingSoonCard';

function App() {
  // Set to your model path when you have a GLB file
  // e.g., '/model.glb' if placed in public folder
  const modelUrl = undefined; // Uses fallback geometry until you add your model

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 70%)',
      }}
    >
      {/* Background gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 20%, rgba(0, 212, 255, 0.06) 0%, transparent 40%)
          `,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* 3D Model Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.6,
          zIndex: 0,
        }}
      >
        <Model3D modelUrl={modelUrl} />
      </Box>

      {/* Coming Soon Card */}
      <ComingSoonCard />
    </Box>
  );
}

export default App;

