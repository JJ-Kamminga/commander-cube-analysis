import { getUniquePairs } from "./helpers";
import { Card } from "./mtg-scripting-toolkit/scryfall";

/** All monocoloured legendary creatures have partner */
export const searchCustomPartnerRule = (cards: Card[]) => {
  const allLegendaries = cards.filter((card) => card.type_line.includes('Legendary Creature'));
  const allPartners = cards.filter((card) => card.keywords.includes('Partner') && !card.keywords.includes('Partner with'));

  /** Monocoloured Legendaries excluding partners */
  const monocolouredLegendaries = allLegendaries
    .filter((card) => card.color_identity.length === 1)
    .filter((card) => card.oracle_text?.includes('Partner with') || !card.oracle_text?.includes('Partner'))

  /** Remove duplicates */
  const allPartnersWithCustom = [...new Set([
    ...allLegendaries,
    ...allPartners
  ])]

  return getUniquePairs(allPartnersWithCustom)
    .map(((pairArray) => pairArray.map((card) => card.name)));
};
