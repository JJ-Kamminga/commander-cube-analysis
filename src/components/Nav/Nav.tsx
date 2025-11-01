'use client';

import { Avatar, Container, Grid2, Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, DesignServices, Analytics } from '@mui/icons-material';

export function Nav() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home /> },
    { href: '/design', label: 'Design', icon: <DesignServices /> },
    { href: '/analyze', label: 'Analyze', icon: <Analytics /> },
  ];

  return (
    <Container component='nav' sx={{ padding: 5 }}>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar
              src="/ddh-65-deep-analysis.jpg"
              alt="Illustration of Deep Analysis by Jesper Ejsing"
              sx={{ width: 100, height: 100 }}
            />
            <Typography variant="h5" component="h1" sx={{ margin: 0 }}>
              Commander Cube Toolkit
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: { xs: 'center', md: 'flex-end' },
              flexWrap: 'wrap'
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.href}
                component={Link}
                href={link.href}
                startIcon={link.icon}
                variant={pathname === link.href ? 'contained' : 'outlined'}
                sx={{ minWidth: '120px' }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}
