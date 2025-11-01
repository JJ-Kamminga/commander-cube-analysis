'use client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        {children}
      </CssBaseline>
    </ThemeProvider>
  );
}
