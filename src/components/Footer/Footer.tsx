'use client';

import { Container, Link, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, useColorScheme } from "@mui/material";
import { GitHub } from '@mui/icons-material';

export function Footer() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  return (
    <Container
      component='footer'
      sx={{
        borderTop: 3,
        borderTopStyle: 'groove',
        padding: 5,
        margin: 5,
      }}
    >
      <h3>Theme</h3>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          bgcolor: 'background.default',
          color: 'text.primary',
          borderRadius: 1,
          p: 3,
          minHeight: '56px',
        }}
      >
        <FormControl>
          <FormLabel id="theme-toggle">Theme controls</FormLabel>
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
      <h3>Image credits</h3>
      <ul>
        <li>Jesper Ejsing, Deep Analysis (published by Wizards of the Coast)</li>
        <li><Link href="https://icons8.com/icon/6665/cube" target="_blank" rel="noopener noreferrer">Cube</Link> icon by <Link href="https://icons8.com" target="_blank" rel="noopener noreferrer">Icons8</Link></li>
      </ul>
      <h3>Site credits</h3>
      <ul>
        <li>Created with <Link href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</Link> by <Link href='https://github.com/JJ-Kamminga' target="_blank" rel="noopener noreferrer">Jakob Jan Kamminga</Link></li>
        <li>Cube data supplied by <Link href='https://cubecobra.com/' target="_blank" rel="noopener noreferrer">Cube Cobra</Link></li>
        <li>Magic Card data is supplied by <Link href='https://scryfall.com/' target="_blank" rel="noopener noreferrer">Scryfall</Link> and copyrighted by Wizards of the Coast</li>
        <li>My work was made much easier with <b>ahmattox</b>&apos;s <Link href="https://github.com/ahmattox/mtg-scripting-toolkit" target="_blank" rel="noopener noreferrer">MTG Scripting Toolkit</Link></li>
      </ul>
      <h3>Links</h3>
      <Link
        href="https://github.com/JJ-Kamminga/commander-cube-analysis"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          color: 'primary.main',
          '&:hover': {
            color: 'primary.dark',
          }
        }}
      >
        <GitHub />
      </Link>
    </Container>
  );
}
