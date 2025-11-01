'use client';

import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { Analytics } from '@mui/icons-material';

export default function HomePage() {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          textAlign: 'center',
          gap: 3,
        }}
      >
        <Typography variant="h2" component="h2" gutterBottom>
          What&apos;s this?
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Analyze your Commander Cube from Cube Cobra and get detailed insights about commander options, color identities, and draft configurations.
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Button
            component={Link}
            href="/analyze"
            variant="contained"
            size="large"
            startIcon={<Analytics />}
            sx={{ px: 4, py: 1.5 }}
          >
            Analyze Your Cube
          </Button>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="body1">
            This tool helps you:
          </Typography>
          <Typography variant="body2" component="div" color="text.secondary">
            <ul style={{ textAlign: 'left', maxWidth: '500px', margin: '0 auto' }}>
              <li>Fetch cube data from Cube Cobra</li>
              <li>Analyze commander options by type (legendary creatures, partners, planeswalkers, etc.)</li>
              <li>Examine color identity distribution</li>
              <li>Configure draft settings and see probability calculations</li>
            </ul>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}