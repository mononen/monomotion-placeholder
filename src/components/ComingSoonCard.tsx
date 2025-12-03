import { Box, Typography, Fade } from '@mui/material';
import { keyframes } from '@mui/system';

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 107, 53, 0.3),
      0 0 40px rgba(255, 107, 53, 0.1),
      inset 0 0 60px rgba(255, 107, 53, 0.05);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(255, 107, 53, 0.5),
      0 0 60px rgba(255, 107, 53, 0.2),
      inset 0 0 80px rgba(255, 107, 53, 0.1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function ComingSoonCard() {
  return (
    <Fade in timeout={1000}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: 4, sm: 6, md: 8 },
          minWidth: { xs: '90vw', sm: '450px', md: '520px' },
          maxWidth: '90vw',
          background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.85) 0%, rgba(10, 10, 20, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 107, 53, 0.2)',
          animation: `${pulseGlow} 4s ease-in-out infinite`,
        }}
      >
        {/* Company Name */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 50%, #00d4ff 100%)',
            backgroundSize: '200% auto',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: `${shimmer} 4s linear infinite, ${fadeInUp} 0.8s ease-out`,
            textAlign: 'center',
            mb: 3,
          }}
        >
          MONOMOTION
        </Typography>

        {/* Divider Line */}
        <Box
          sx={{
            width: '80px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #ff6b35, transparent)',
            mb: 3,
            animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
          }}
        />

        {/* Coming Soon Text */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            color: 'text.primary',
            fontWeight: 600,
            textAlign: 'center',
            mb: 2,
            animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
          }}
        >
          Coming Soon
        </Typography>

        {/* Tagline */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
            color: 'text.secondary',
            textAlign: 'center',
            maxWidth: '400px',
            lineHeight: 1.7,
            animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
          }}
        >
          Premium power systems & batteries for Onewheel riders.
          <br />
          Check back soon.
        </Typography>

        {/* Accent Dots */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            mt: 4,
            animation: `${fadeInUp} 0.8s ease-out 0.8s both`,
          }}
        >
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: i === 1 ? 'primary.main' : 'rgba(255, 107, 53, 0.3)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>
    </Fade>
  );
}

