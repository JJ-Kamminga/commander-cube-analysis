'use client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CubeListForm } from "@/components/CubeListForm/CubeListForm";
import { Avatar, Container, createTheme, Grid2, CssBaseline, ThemeProvider, useColorScheme } from "@mui/material";

import Box from '@mui/material/Box';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Link from 'next/link';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export function Home() {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  return (
    <CssBaseline>
      <main>
        <Container sx={{ padding: 5 }} >
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <Avatar
                src="/ddh-65-deep-analysis.jpg"
                alt="Illustration of Deep Analysis by Jesper Ejsing"
                sx={{ width: 100, height: 100 }}
              />
            </Grid2>
            <Grid2 size={8}>
              <h1 style={
                {
                  display: 'inline',
                  position: 'absolute',
                  top: '50',
                }
              } > Commander Cube Analysis</h1>
            </Grid2>
          </Grid2>
        </Container>
        <Container>
          <CubeListForm />
        </Container>
        <Container
          sx={{
            border: 3,
            padding: 5,
            margin: 5,
          }}
        >
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
          Image credits:
          <ul>
            <li>Jesper Ejsing, Deep Analysis (published by Wizards of the Coast)</li>
          </ul>
          Site credits:
          <ul>
            <li>Created with <Link href="https://nextjs.org/">Next.js</Link> by <Link href='https://github.com/JJ-Kamminga'>Jakob Jan Kamminga
            </Link></li>
            <li>Cube data supplied by
              <Link href='https://cubecobra.com/'> Cube Cobra</Link>
            </li>
            <li>Magic Card data is supplied by <Link href='https://scryfall.com/'>Scryfall</Link> and copyrighted by Wizards of the Coast</li>
            <li>My work was made much easier with <b>ahmattox</b>&apos;s <Link href="https://github.com/ahmattox/mtg-scripting-toolkit">MTG Scripting Toolkit</Link></li>
          </ul>
        </Container>
      </main>
    </CssBaseline>
  );
}

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}