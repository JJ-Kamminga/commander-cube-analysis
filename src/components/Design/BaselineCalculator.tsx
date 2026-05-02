"use client";

import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

export function BaselineCalculator() {
  const [legendaries, setLegendaries] = useState(50);

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
        label="Legendary creatures"
        type="number"
        size="small"
        value={legendaries}
        onChange={(e) => setLegendaries(Math.max(0, Number(e.target.value)))}
        sx={{ width: 180 }}
        slotProps={{ htmlInput: { min: 0 } }}
      />
      <Typography>=</Typography>
      <Typography variant="h6" component="span" color="primary">
        {legendaries.toLocaleString()} commanders
      </Typography>
    </Box>
  );
}
