'use client';

import { Container, Typography, Box } from "@mui/material";

export default function DesignPage() {
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
        <Typography variant="h2" component="h1" gutterBottom>
          Design Your Cube
        </Typography>

        <Typography variant="body1" color="text.secondary">
          This page is under construction.
        </Typography>
      </Box>
    </Container>
  );
}
