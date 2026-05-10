"use client";

import { useState } from "react";
import { Alert, Box, TextField, Typography } from "@mui/material";

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
  const percentOfCubeInPool = cubeSize > 0 ? Math.round((poolSize / cubeSize) * 100) : 0;

  // Cards seen per player per round = N*S - N*(N-1)/2 (unique cards from all N packs in rotation)
  const seenPerPlayer = packs * (players * cardsPerPack - (players * (players - 1)) / 2);
  const percentOfPoolSeen = poolSize > 0 ? Math.round((seenPerPlayer / poolSize) * 100) : 0;
  const percentOfCubeSeen = cubeSize > 0 ? Math.round((seenPerPlayer / cubeSize) * 100) : 0;

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
          {percentOfCubeInPool}% of cube in draft pool
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {percentOfPoolSeen}% of pool seen per player
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {percentOfCubeSeen}% of cube seen per player
        </Typography>
      </Box>
      {poolSize > cubeSize && (
        <Alert severity="warning" sx={{ width: "100%" }}>
          Pool size ({poolSize.toLocaleString()}) exceeds cube size ({cubeSize.toLocaleString()}).
        </Alert>
      )}
    </Box>
  );
}
