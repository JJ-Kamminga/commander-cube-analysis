"use client";

import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

export function PartnersCalculator() {
  const [partners, setPartners] = useState(50);
  const result = Math.floor((partners * (partners - 1)) / 2);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        flexWrap: "wrap",
        my: 2,
        p: 2,
        borderRadius: 1,
        bgcolor: "action.hover",
      }}
    >
      <TextField
        label="Partners"
        type="number"
        size="small"
        value={partners}
        onChange={(e) => setPartners(Math.max(0, Number(e.target.value)))}
        sx={{ width: 140 }}
        slotProps={{ htmlInput: { min: 0 } }}
      />
      <Typography sx={{ fontFamily: "monospace" }}>
        × (partners − 1) ÷ 2
      </Typography>
      <Typography>=</Typography>
      <Typography variant="h6" component="span" color="primary">
        {result.toLocaleString()} pairings
      </Typography>
    </Box>
  );
}
