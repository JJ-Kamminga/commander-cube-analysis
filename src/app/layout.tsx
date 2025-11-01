'use client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Nav } from "@/components/Nav/Nav";
import { Footer } from "@/components/Footer/Footer";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <main>
              <Nav />
              {children}
              <Footer />
            </main>
          </CssBaseline>
        </ThemeProvider>
      </body>
    </html>
  );
}
