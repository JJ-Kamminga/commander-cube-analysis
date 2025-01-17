import { getUniquePairs } from "./helpers";
import { Card } from "./mtg-scripting-toolkit/scryfall";

/** All monocoloured legendary creatures have partner */
export const searchCustomPartnerRule = (cards: Card[], colourIdentityFilterFn: (card: Card) => boolean) => {
  const allLegendaries = cards.filter((card) => card.type_line.includes('Legendary Creature'));
  const allPartners = cards.filter((card) => card.keywords.includes('Partner') && !card.keywords.includes('Partner with'));
  /** Monocoloured Legendaries excluding partners */
  const monocolouredLegendaries = allLegendaries
    .filter(colourIdentityFilterFn)
    .filter((card) => card.oracle_text?.includes('Partner with') || !card.oracle_text?.includes('Partner'))
  /** Remove duplicates */
  const allPartnersWithCustom = [...new Set([
    ...monocolouredLegendaries,
    ...allPartners
  ])]

  return getUniquePairs(allPartnersWithCustom)
    .map(((pairArray) => pairArray.map((card) => card.name)));
};

/** All legendary creatures have partner */
export const searchAllPartnerRule = (cards: Card[]) => {
  return getUniquePairs(cards.filter((card) => card.type_line.includes('Legendary Creature')))
    .map(((pairArray) => pairArray.map((card) => card.name)));
}