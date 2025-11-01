'use client';

import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { Analytics, DesignServices } from '@mui/icons-material';

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
          This site contains tools & utilities to help Commander cube designers build and understand their cubes.
        </Typography>

        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            component={Link}
            href="/design"
            variant="contained"
            size="large"
            startIcon={<DesignServices />}
            sx={{ px: 4, py: 1.5 }}
          >
            Commander Cube design tool
          </Button>
          <Button
            component={Link}
            href="/analyze"
            variant="contained"
            size="large"
            startIcon={<Analytics />}
            sx={{ px: 4, py: 1.5 }}
          >
            Commander Cube analysis tool
          </Button>
        </Box>
      </Box>
    </Container>
  );
}