"use client";

import { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { wheelingCards } from "@/utils/draft";

type Props = {
  defaultPlayers?: number;
  defaultCardsPerPack?: number;
  /** Each player burns this many cards alongside their pick. Shows the "Burn per pick" input. */
  defaultBurnPerPick?: number;
  /** When this many cards remain in the pack, they are burned rather than passed. Must be less than players. Shows the "Burn at end of pack" input. */
  defaultBurnAtEndOfPack?: number;
};

export function WheelingCalculator({
  defaultPlayers = 8,
  defaultCardsPerPack = 15,
  defaultBurnPerPick,
  defaultBurnAtEndOfPack,
}: Props) {
  const [players, setPlayers] = useState(defaultPlayers);
  const [cardsPerPack, setCardsPerPack] = useState(defaultCardsPerPack);
  const [burnPerPick, setBurnPerPick] = useState(defaultBurnPerPick ?? 0);
  const [burnAtEnd, setBurnAtEnd] = useState(defaultBurnAtEndOfPack ?? 0);

  const { seenTwice, seenThrice } = wheelingCards(cardsPerPack, players, burnPerPick, burnAtEnd);

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
        onChange={(e) => {
          const p = Math.max(1, Number(e.target.value));
          setPlayers(p);
          setBurnAtEnd((b) => Math.min(b, p - 1));
        }}
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
            setBurnAtEnd(Math.min(players - 1, Math.max(0, Number(e.target.value))))
          }
          sx={{ width: 160 }}
          slotProps={{ htmlInput: { min: 0, max: players - 1 } }}
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
