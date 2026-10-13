/**
 * Calculates how many cards wheel (are seen more than once) in a draft.
 *
 * burnAtEnd cards are burned after all players have picked from the pack —
 * every player sees them, but they are removed before the pack comes back
 * around. This means burnAtEnd reduces the pack once per full pass, so it
 * is added to removedPerPass rather than subtracted from cardsPerPack.
 */
export function wheelingCards(
  cardsPerPack: number,
  players: number,
  burnPerPick: number = 0,
  burnAtEnd: number = 0,
): { seenTwice: number; seenThrice: number } {
  const removedPerPass = players * (1 + burnPerPick) + burnAtEnd;
  const seenTwice = Math.max(0, cardsPerPack - removedPerPass);
  const seenThrice = Math.max(0, cardsPerPack - 2 * removedPerPass);
  return { seenTwice, seenThrice };
}

export type PickStyle = "standard" | "double-masters" | "commander-legends";

/**
 * Unique cards player 1 sees across all packs received in one round.
 *
 * Each pack arrives having already had j picks (and j*burnPerPick burns) done
 * to it, so player 1 sees fewer cards from each successive pack they receive.
 *
 * cardsPerPack should already be reduced by burnAtEnd before calling — burned
 * cards at end of pack are seen but not draftable, so they are excluded from
 * the effective pack size at the call site.
 *
 *   Standard (pick 1):           removes 1+B per pass → pack j has C−(1+B)j left
 *   Commander Legends (pick 2):  removes 2+B per pass → pack j has C−(2+B)j left
 *   Double Masters (pick 2, then 1):
 *     opener removes 2+B; each later pass removes 1+B
 *     → pack j≥1 has C−(j+1)−Bj left; j=0 has C
 */
export function seenPerPlayerPerRound(
  players: number,
  cardsPerPack: number,
  pickStyle: PickStyle,
  burnPerPick: number = 0,
): number {
  const P = players;
  const C = cardsPerPack;
  const B = burnPerPick;
  switch (pickStyle) {
    case "standard":
      return Math.max(0, P * C - (1 + B) * ((P * (P - 1)) / 2));
    case "commander-legends":
      return Math.max(0, P * C - (2 + B) * ((P * (P - 1)) / 2));
    case "double-masters":
      return Math.max(0, P * C - (P * (P + 1)) / 2 + 1 - B * ((P * (P - 1)) / 2));
  }
}

/**
 * Total unique draftable cards player 1 sees across all rounds of a draft.
 *
 * burnAtEnd cards per pack are visible but not draftable, so the effective
 * pack size passed to seenPerPlayerPerRound is cardsPerPack − burnAtEnd.
 */
export function seenPerPlayer(
  players: number,
  cardsPerPack: number,
  packs: number,
  pickStyle: PickStyle,
  burnPerPick: number = 0,
  burnAtEnd: number = 0,
): number {
  const effectiveCardsPerPack = cardsPerPack - burnAtEnd;
  return packs * seenPerPlayerPerRound(players, effectiveCardsPerPack, pickStyle, burnPerPick);
}
