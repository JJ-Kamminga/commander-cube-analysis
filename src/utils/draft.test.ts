import { wheelingCards, seenPerPlayerPerRound, seenPerPlayer } from "./draft";

/** TODO: these tests are most likely authorative, there is incorrect logic in the code */
describe("wheelingCards", () => {
  describe("no burn", () => {
    it("baseline: 8 players, 15-card pack — 7 wheel, nothing seen thrice", () => {
      expect(wheelingCards(15, 8)).toEqual({ seenTwice: 7, seenThrice: 0 });
    });

    it("4 players, 20-card pack — 16 wheel, 12 seen thrice", () => {
      expect(wheelingCards(20, 4)).toEqual({ seenTwice: 16, seenThrice: 12 });
    });
  });

  describe("burnPerPick", () => {
    it("each pick removes extra cards, reducing wheeling", () => {
      expect(wheelingCards(15, 8, 1)).toEqual({ seenTwice: 0, seenThrice: 0 });
    });

    it("4 players, 20-card pack, burnPerPick=4 — nothing wheels", () => {
      expect(wheelingCards(20, 4, 4)).toEqual({ seenTwice: 0, seenThrice: 0 });
    });
  });

  describe("burnAtEnd", () => {
    it("prevents wheeling (seeing twice) when burnAtEnd + picks from the first round equal pack size", () => {
      expect(wheelingCards(15, 8, 0, 7)).toEqual({
        seenTwice: 0,
        seenThrice: 0,
      });
    });

    it("burned at end cards dont count as wheeling twice (seen thrice)", () => {
      expect(wheelingCards(20, 8, 0, 2)).toEqual({
        seenTwice: 12,
        seenThrice: 2,
      });
    });

    it("can prevent wheeling twice (seeing thrice)", () => {
      expect(wheelingCards(15, 8, 0, 6)).toEqual({
        seenTwice: 1,
        seenThrice: 0,
      });
    });

    it("does not affect the return when two wheels leave more than the number of cards to burn at end", () => {
      expect(wheelingCards(20, 4, 0, 3)).toEqual({
        seenTwice: 16,
        seenThrice: 12,
      });
    });

    it("burnPerPick and burnAtEnd combined", () => {
      expect(wheelingCards(10, 4, 1, 1)).toEqual({
        seenTwice: 10,
        seenThrice: 1,
      });
    });
  });
});

describe("seenPerPlayerPerRound", () => {
  describe("standard (pick 1)", () => {
    it("4 players, 20-card pack, no burn", () => {
      // Player sees 20 + 19 + 18 + 17 = 74
      expect(seenPerPlayerPerRound(4, 20, "standard", 0)).toBe(74);
    });

    it("4 players, 20-card pack, burnPerPick=1", () => {
      // Each pick removes 2 cards: player sees 20 + 18 + 16 + 14 = 68
      expect(seenPerPlayerPerRound(4, 20, "standard", 1)).toBe(68);
    });

    it("8 players, 15-card pack, no burn — standard 8-player draft", () => {
      // Player sees 15 + 14 + 13 + 12 + 11 + 10 + 9 + 8 = 92
      expect(seenPerPlayerPerRound(8, 15, "standard", 0)).toBe(92);
    });
  });

  describe("commander-legends (pick 2)", () => {
    it("4 players, 20-card pack, no burn", () => {
      // Each pick removes 2 cards: player sees 20 + 18 + 16 + 14 = 68
      expect(seenPerPlayerPerRound(4, 20, "commander-legends", 0)).toBe(68);
    });

    it("4 players, 20-card pack, burnPerPick=1", () => {
      // Each pick removes 3 cards: player sees 20 + 17 + 14 + 11 = 62
      expect(seenPerPlayerPerRound(4, 20, "commander-legends", 1)).toBe(62);
    });
  });

  describe("double-masters (pick 2 first, then pick 1)", () => {
    // Opener removes 2+B cards; each subsequent pass removes 1+B.
    // Pack j≥1 has C − (j+1) − B·j cards; pack 0 has C.

    it("4 players, 20-card pack, no burn", () => {
      // Player sees: 20 + (20−2) + (20−3) + (20−4) = 20 + 18 + 17 + 16 = 71
      expect(seenPerPlayerPerRound(4, 20, "double-masters", 0)).toBe(71);
    });

    it("4 players, 20-card pack, burnPerPick=1", () => {
      // Opener removes 3, subsequent remove 2:
      // Player sees: 20 + (20−3) + (20−5) + (20−7) = 20 + 17 + 15 + 13 = 65
      expect(seenPerPlayerPerRound(4, 20, "double-masters", 1)).toBe(65);
    });
  });
});

describe("seenPerPlayer", () => {
  it("multiplies seenPerPlayerPerRound by number of packs", () => {
    // 3 packs, same as seenPerPlayerPerRound(4, 20, standard, 0) * 3 = 74 * 3 = 222
    expect(seenPerPlayer(4, 20, 3, "standard")).toBe(222);
  });

  it("burnAtEnd does not effect amount of cards seen if not greater than cardsinpack - playercount", () => {
    // effectiveCardsPerPack = 20 − 3 = 17
    // seenPerPlayerPerRound(4, 17, standard, 0) = 4*17 − 1*4*3/2 = 68 − 6 = 62
    // seenPerPlayer = 3 * 62 = 186
    expect(seenPerPlayer(4, 20, 3, "standard", 0, 3)).toBe(222);
  });
});
