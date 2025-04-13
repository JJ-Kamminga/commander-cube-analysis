import { Card as MagicCard } from "@/utils/mtg-scripting-toolkit/scryfall";

export type DraftConfig = {
  playerCount: number,
  packsPerPlayer: number,
  cardsPerPack: number,
}

export type AnalysisStepProps = {
  cardData: MagicCard[],
  cubeCobraID: string,
  draftConfig: DraftConfig,
  customRules: string[];
};
