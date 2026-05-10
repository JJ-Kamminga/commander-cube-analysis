"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

type PickStyle = "standard" | "double-masters" | "commander-legends";

type Props = {
  defaultCubeSize?: number;
  defaultPlayers?: number;
  defaultPacks?: number;
  defaultCardsPerPack?: number;
  defaultPickStyle?: PickStyle;
};

function seenPerPlayerPerRound(
  players: number,
  cardsPerPack: number,
  pickStyle: PickStyle
): number {
  const N = players;
  const S = cardsPerPack;
  // Each formula sums the cards player 1 sees from each of the N packs in a round.
  // Pack j arrives having had j openers pick before player 1:
  //   Standard:           each pick removes 1  → pack j has S - j   cards left
  //   Commander Legends:  each pick removes 2  → pack j has S - 2j  cards left
  //   Double Masters:     opener removes 2, rest remove 1
  //                       → pack j (j≥1) has S - (j+1) cards left; j=0 has S
  switch (pickStyle) {
    case "standard":
      return N * S - (N * (N - 1)) / 2;
    case "commander-legends":
      return N * S - N * (N - 1);
    case "double-masters":
      return N * S - (N * (N + 1)) / 2 + 1;
  }
}

export function DraftPoolCalculator({
  defaultCubeSize = 480,
  defaultPlayers = 8,
  defaultPacks = 3,
  defaultCardsPerPack = 20,
  defaultPickStyle = "standard",
}: Props) {
  const [cubeSize, setCubeSize] = useState(defaultCubeSize);
  const [players, setPlayers] = useState(defaultPlayers);
  const [packs, setPacks] = useState(defaultPacks);
  const [cardsPerPack, setCardsPerPack] = useState(defaultCardsPerPack);
  const [pickStyle, setPickStyle] = useState<PickStyle>(defaultPickStyle);

  const poolSize = players * packs * cardsPerPack;
  const percentOfCubeInPool =
    cubeSize > 0 ? Math.round((poolSize / cubeSize) * 100) : 0;

  const seenPerPlayer =
    packs * seenPerPlayerPerRound(players, cardsPerPack, pickStyle);
  const percentOfPoolSeen =
    poolSize > 0 ? Math.round((seenPerPlayer / poolSize) * 100) : 0;
  const percentOfCubeSeen =
    cubeSize > 0 ? Math.round((seenPerPlayer / cubeSize) * 100) : 0;

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
      <FormControl size="small" sx={{ width: 200 }}>
        <InputLabel>Pick style</InputLabel>
        <Select
          label="Pick style"
          value={pickStyle}
          onChange={(e) => setPickStyle(e.target.value as PickStyle)}
        >
          <MenuItem value="standard">Standard (pick 1)</MenuItem>
          <MenuItem value="double-masters">Double Masters (pick 2 first)</MenuItem>
          <MenuItem value="commander-legends">Commander Legends (pick 2)</MenuItem>
        </Select>
      </FormControl>
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
          Pool size ({poolSize.toLocaleString()}) exceeds cube size (
          {cubeSize.toLocaleString()}).
        </Alert>
      )}
    </Box>
  );
}
