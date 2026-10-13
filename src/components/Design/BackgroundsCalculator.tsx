"use client";

import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

export function BackgroundsCalculator() {
  const [choosers, setChoosers] = useState(25);
  const [backgrounds, setBackgrounds] = useState(25);
  const result = choosers * backgrounds;

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
        label="Choose a Background creatures"
        type="number"
        size="small"
        value={choosers}
        onChange={(e) => setChoosers(Math.max(0, Number(e.target.value)))}
        sx={{ width: 220 }}
        slotProps={{ htmlInput: { min: 0 } }}
      />
      <Typography>×</Typography>
      <TextField
        label="Backgrounds"
        type="number"
        size="small"
        value={backgrounds}
        onChange={(e) => setBackgrounds(Math.max(0, Number(e.target.value)))}
        sx={{ width: 140 }}
        slotProps={{ htmlInput: { min: 0 } }}
      />
      <Typography>=</Typography>
      <Typography variant="h6" component="span" color="primary">
        {result.toLocaleString()} pairings
      </Typography>
    </Box>
  );
}
