'use client';

import { CubeListForm } from "@/components/CubeListForm/CubeListForm";
import { Box, Container, Typography } from "@mui/material";

export default function AnalyzePage() {
  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h2">Commander Cube analysis</Typography>
        <Typography variant="body1" color="text.secondary">
          Features:
          <ul style={{ textAlign: 'left', margin: '0 auto' }}>
            <li>Fetch cube data from Cube Cobra</li>
            <li>Analyze commander options by type (legendary creatures, partners, planeswalkers, etc.)</li>
            <li>Examine color identity distribution</li>
            <li>Configure draft settings and see probability calculations for subsets of the cube</li>
          </ul>
        </Typography>
      </Box>
      <CubeListForm />
    </Container>
  );
}
