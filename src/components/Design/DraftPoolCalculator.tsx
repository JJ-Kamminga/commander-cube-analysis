"use client";

import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

type Props = {
  defaultCubeSize?: number;
  defaultPlayers?: number;
  defaultPacks?: number;
  defaultCardsPerPack?: number;
};

export function DraftPoolCalculator({
  defaultCubeSize = 480,
  defaultPlayers = 8,
  defaultPacks = 3,
  defaultCardsPerPack = 20,
}: Props) {
  const [cubeSize, setCubeSize] = useState(defaultCubeSize);
  const [players, setPlayers] = useState(defaultPlayers);
  const [packs, setPacks] = useState(defaultPacks);
  const [cardsPerPack, setCardsPerPack] = useState(defaultCardsPerPack);

  const poolSize = players * packs * cardsPerPack;
  const percentage = cubeSize > 0 ? Math.round((poolSize / cubeSize) * 100) : 0;

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
        label="Cube size"
        type="number"
        size="small"
        value={cubeSize}
        onChange={(e) => setCubeSize(Math.max(1, Number(e.target.value)))}
        sx={{ width: 110 }}
        slotProps={{ htmlInput: { min: 1 } }}
      />
      <TextField
        label="Players"
        type="number"
        size="small"
        value={players}
        onChange={(e) => setPlayers(Math.max(1, Number(e.target.value)))}
        sx={{ width: 100 }}
        slotProps={{ htmlInput: { min: 1 } }}
      />
      <TextField
        label="Packs per player"
        type="number"
        size="small"
        value={packs}
        onChange={(e) => setPacks(Math.max(1, Number(e.target.value)))}
        sx={{ width: 140 }}
        slotProps={{ htmlInput: { min: 1 } }}
      />
      <TextField
        label="Cards per pack"
        type="number"
        size="small"
        value={cardsPerPack}
        onChange={(e) => setCardsPerPack(Math.max(1, Number(e.target.value)))}
        sx={{ width: 140 }}
        slotProps={{ htmlInput: { min: 1 } }}
      />
      <Typography>=</Typography>
      <Box>
        <Typography variant="h6" component="span" color="primary">
          {poolSize.toLocaleString()} card pool
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {percentage}% of cube in draft pool
        </Typography>
      </Box>
    </Box>
  );
}
