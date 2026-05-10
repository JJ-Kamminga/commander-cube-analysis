"use client";

import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

type Props = {
  defaultPlayers?: number;
  defaultCardsPerPack?: number;
  /** When provided, the burn input is shown with this default. */
  defaultBurnPerPack?: number;
};

export function WheelingCalculator({
  defaultPlayers = 8,
  defaultCardsPerPack = 15,
  defaultBurnPerPack,
}: Props) {
  const showBurn = defaultBurnPerPack !== undefined;

  const [players, setPlayers] = useState(defaultPlayers);
  const [cardsPerPack, setCardsPerPack] = useState(defaultCardsPerPack);
  const [burnPerPack, setBurnPerPack] = useState(defaultBurnPerPack ?? 0);

  // Each pass removes (1 + burn) cards, so a pack comes back around with
  // (1 + burn) * N fewer cards than it started with.
  const removalPerPass = 1 + burnPerPack;
  const seenTwice = Math.max(0, cardsPerPack - removalPerPass * players);
  const seenThrice = Math.max(0, cardsPerPack - removalPerPass * 2 * players);

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
        label="Players"
        type="number"
        size="small"
        value={players}
        onChange={(e) => setPlayers(Math.max(1, Number(e.target.value)))}
        sx={{ width: 100 }}
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
      {showBurn && (
        <TextField
          label="Burn per pass"
          type="number"
          size="small"
          value={burnPerPack}
          onChange={(e) => setBurnPerPack(Math.max(0, Number(e.target.value)))}
          sx={{ width: 130 }}
          slotProps={{ htmlInput: { min: 0 } }}
        />
      )}
      <Typography>=</Typography>
      <Box>
        <Typography variant="h6" component="span" color="primary">
          {seenTwice} card{seenTwice !== 1 ? "s" : ""} wheel (seen twice)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {seenThrice} card{seenThrice !== 1 ? "s" : ""} wheel twice (seen
          thrice)
        </Typography>
      </Box>
    </Box>
  );
}
