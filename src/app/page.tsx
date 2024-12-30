'use client';

import Image from "next/image";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CubeListForm } from "@/components/CubeListForm/CubeListForm";
import { Container, createTheme, CssBaseline, ThemeProvider, useColorScheme } from "@mui/material";

import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';


const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export function Home() {
  const { mode, setMode } = useColorScheme();
  console.log(mode);
  if (!mode) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <main>
          <ol>
            <li>
              Get started by editing <code>src/app/page.tsx</code>.
            </li>
            <li>Save and see your changes instantly.</li>
          </ol>
          <Container>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
                minHeight: '56px',
              }}
            >
              <FormControl>
                <FormLabel id="theme-toggle">Theme</FormLabel>
                <RadioGroup
                  aria-labelledby="theme-toggle"
                  name="theme-toggle"
                  row
                  value={mode}
                  onChange={(event) =>
                    setMode(event.target.value as 'system' | 'light' | 'dark')
                  }
                >
                  <FormControlLabel value="system" control={<Radio />} label="System" />
                  <FormControlLabel value="light" control={<Radio />} label="Light" />
                  <FormControlLabel value="dark" control={<Radio />} label="Dark" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Container>
          <Container>
            <CubeListForm />
          </Container>
          {/* <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div> */}
        </main>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}