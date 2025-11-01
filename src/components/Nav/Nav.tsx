'use client';

import { Avatar, Container, Grid2 } from "@mui/material";
import Link from "next/link";

export function Nav() {
  return (
    <Container component='nav' sx={{ padding: 5 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={4}>
          <Link href="/" style={{ cursor: 'pointer' }}>
            <Avatar
              src="/ddh-65-deep-analysis.jpg"
              alt="Illustration of Deep Analysis by Jesper Ejsing"
              sx={{ width: 100, height: 100 }}
            />
          </Link>
        </Grid2>
        <Grid2 size={8}>
          <h1 style={
            {
              display: 'inline',
              position: 'absolute',
              top: '50',
            }
          }>Commander Cube Toolkit</h1>
        </Grid2>
      </Grid2>
    </Container>
  );
}
