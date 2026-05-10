"use client";

import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";

type Props = {
  defaultPlayers?: number;
  defaultPacks?: number;
  defaultCardsPerPack?: number;
};

export function WheelingCalculator({
  defaultPlayers = 8,
  defaultCardsPerPack = 15,
}: Props) {
  const [players, setPlayers] = useState(defaultPlayers);
  const [cardsPerPack, setCardsPerPack] = useState(defaultCardsPerPack);

  const seenTwice = Math.max(0, cardsPerPack - players);
  const seenThrice = Math.max(0, cardsPerPack - 2 * players);

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
