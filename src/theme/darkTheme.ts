import { createTheme } from '@mui/material/styles';

// Electric orange accent with deep dark background
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6b35', // Electric orange
      light: '#ff8c5a',
      dark: '#e55a25',
    },
    secondary: {
      main: '#00d4ff', // Electric cyan
      light: '#5ce1ff',
      dark: '#00a8cc',
    },
    background: {
      default: '#0a0a0f',
      paper: 'rgba(20, 20, 30, 0.7)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '0.15em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
    h3: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 300,
      letterSpacing: '0.02em',
    },
    body2: {
      fontWeight: 300,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
          minHeight: '100vh',
        },
      },
    },
  },
});

export default darkTheme;

