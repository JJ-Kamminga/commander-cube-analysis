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
import { type PickStyle, seenPerPlayer } from "@/utils/draft";

type Props = {
  defaultCubeSize?: number;
  defaultPlayers?: number;
  defaultPacks?: number;
  defaultCardsPerPack?: number;
  /** When provided, the pick style selector is shown with this default. */
  defaultPickStyle?: PickStyle;
  /** Each player burns this many cards alongside their pick. Shows the "Burn per pick" input. */
  defaultBurnPerPick?: number;
  /** When this many cards remain in the pack, they are burned rather than passed. Must be less than players. Shows the "Burn at end of pack" input. */
  defaultBurnAtEndOfPack?: number;
};

export function DraftPoolCalculator({
  defaultCubeSize = 480,
  defaultPlayers = 8,
  defaultPacks = 3,
  defaultCardsPerPack = 20,
  defaultPickStyle,
  defaultBurnPerPick,
  defaultBurnAtEndOfPack,
}: Props) {
  const showPickStyle = defaultPickStyle !== undefined;

  const [cubeSize, setCubeSize] = useState(defaultCubeSize);
  const [players, setPlayers] = useState(defaultPlayers);
  const [packs, setPacks] = useState(defaultPacks);
  const [cardsPerPack, setCardsPerPack] = useState(defaultCardsPerPack);
  const [pickStyle, setPickStyle] = useState<PickStyle>(
    defaultPickStyle ?? "standard",
  );
  const [burnPerPick, setBurnPerPick] = useState(defaultBurnPerPick ?? 0);
  const [burnAtEnd, setBurnAtEnd] = useState(defaultBurnAtEndOfPack ?? 0);

  const poolSize = players * packs * cardsPerPack;
  const percentOfCubeInPool =
    cubeSize > 0 ? Math.round((poolSize / cubeSize) * 100) : 0;

  const seen = seenPerPlayer(
    players,
    cardsPerPack,
    packs,
    pickStyle,
    burnPerPick,
    burnAtEnd,
  );
  const percentOfPoolSeen =
    poolSize > 0 ? Math.round((seen / poolSize) * 100) : 0;
  const percentOfCubeSeen =
    cubeSize > 0 ? Math.round((seen / cubeSize) * 100) : 0;

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
        onChange={(e) => {
          const p = Math.max(1, Number(e.target.value));
          setPlayers(p);
          setBurnAtEnd((b) => Math.min(b, p - 1));
        }}
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
      {showPickStyle && (
        <FormControl size="small" sx={{ width: 220 }}>
          <InputLabel>Pick style</InputLabel>
          <Select
            label="Pick style"
            value={pickStyle}
            onChange={(e) => setPickStyle(e.target.value as PickStyle)}
          >
            <MenuItem value="standard">Standard (pick 1)</MenuItem>
            <MenuItem value="double-masters">
              Double Masters (pick 2 first)
            </MenuItem>
            <MenuItem value="commander-legends">
              Commander Legends (pick 2)
            </MenuItem>
          </Select>
        </FormControl>
      )}
      {defaultBurnPerPick !== undefined && (
        <TextField
          label="Burn per pick"
          type="number"
          size="small"
          value={burnPerPick}
          onChange={(e) => setBurnPerPick(Math.max(0, Number(e.target.value)))}
          sx={{ width: 130 }}
          slotProps={{ htmlInput: { min: 0 } }}
        />
      )}
      {defaultBurnAtEndOfPack !== undefined && (
        <TextField
          label="Burn at end of pack"
          type="number"
          size="small"
          value={burnAtEnd}
          onChange={(e) =>
            setBurnAtEnd(
              Math.min(players - 1, Math.max(0, Number(e.target.value))),
            )
          }
          sx={{ width: 160 }}
          slotProps={{ htmlInput: { min: 0, max: players - 1 } }}
        />
      )}
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
