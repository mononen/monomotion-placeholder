import { Box, Typography, Fade } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

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

const CardContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  minWidth: '90vw',
  maxWidth: '90vw',
  background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.5) 0%, rgba(10, 10, 20, 0.6) 100%)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  borderRadius: '24px',
  border: '1px solid rgba(255, 107, 53, 0.2)',
  animation: `${pulseGlow} 4s ease-in-out infinite`,
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(6),
    minWidth: '450px',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(8),
    minWidth: '520px',
  },
}));

const BrandName = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c5a 50%, #00d4ff 100%)',
  backgroundSize: '200% auto',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${shimmer} 4s linear infinite, ${fadeInUp} 0.8s ease-out`,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
}));

const Divider = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '2px',
  background: 'linear-gradient(90deg, transparent, #ff6b35, transparent)',
  marginBottom: theme.spacing(3),
  animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
}));

const ComingSoonText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  color: theme.palette.text.primary,
  fontWeight: 600,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  animation: `${fadeInUp} 0.8s ease-out 0.4s both`,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.75rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}));

const Tagline = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  color: theme.palette.text.secondary,
  textAlign: 'center',
  maxWidth: '400px',
  lineHeight: 1.7,
  animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.1rem',
  },
}));

const DotsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(4),
  animation: `${fadeInUp} 0.8s ease-out 0.8s both`,
}));

interface DotProps {
  active?: boolean;
}

const Dot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<DotProps>(({ active }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: active ? '#ff6b35' : 'rgba(255, 107, 53, 0.3)',
  transition: 'all 0.3s ease',
}));

export default function ComingSoonCard() {
  return (
    <Fade in timeout={1000}>
      <CardContainer>
        <BrandName variant="h1">MONOMOTION</BrandName>
        <Divider />
        <ComingSoonText variant="h2">Coming Soon</ComingSoonText>
        <Tagline variant="body1">
          Premium power systems & batteries for Onewheel riders.
          <br />
          Check back soon.
        </Tagline>
        <DotsContainer>
          {[0, 1, 2].map((i) => (
            <Dot key={i} active={i === 1} />
          ))}
        </DotsContainer>
      </CardContainer>
    </Fade>
  );
}
