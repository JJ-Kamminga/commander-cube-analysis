import { Card } from "./mtg-scripting-toolkit/types";
import { Analysis } from "./types";

export const initialAnalysisObject: Analysis = {
  legendaryCreatures: {
    id: 'legendaryCreatures',
    labelHeading: 'Legendary Creatures',
    labelDescription: 'Creatures that are commanders because they have the legendary supertype.',
    cardNames: [],
  },
  planeswalkerCommanders: {
    id: 'planeswalkerCommanders',
    labelHeading: 'Planeswalker commanders',
    labelDescription: 'Planeswalkers that are explicitly allowed as commanders.',
    cardNames: [],
  },
  partners: {
    id: 'partners',
    labelHeading: 'Partner Pairings',
    labelDescription: 'Unique possible pairings for creatures with the Partner ability.',
    cardNames: [],
  },
  partnerWiths: {
    id: 'partnerWiths',
    labelHeading: 'Named partners',
    labelDescription: 'Pairings for creatures with the Partner With ability.',
    cardNames: [],
  },
  friendsForever: {
    id: 'friendsForever',
    labelHeading: 'Friends Forever',
    labelDescription: 'Unique possible pairings for creatures with the Friends Forever ability.',
    cardNames: [],
  },
  doctorPartners: {
    id: 'doctorPartners',
    labelHeading: 'Doctor partners',
    labelDescription: 'Unique possible pairings of each Doctor with all possible Doctor\'s Companions.',
    cardNames: [],
  },
  backgroundPairings: {
    id: 'backgroundPairings',
    labelHeading: 'Background pairings',
    labelDescription: 'Unique possible pairings of creatures with the Choose a Background ability and Backgrounds.',
    cardNames: [],
  },
};

export const searchByTypeLine = (cards: Card[], query: string) => {
  return cards
    .filter((card) => card.type_line.includes(query))
};

export const searchPlaneswalkerCommanders = (cards: Card[]) => {
  return cards
    .filter(
      (card) => card.type_line.includes('Planeswalker') && card.oracle_text?.includes('can be your commander')
    )
};

function getUniquePairs<T>(array: T[]): [T, T][] {
  const pairs: [T, T][] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      pairs.push([array[i], array[j]]);
    }
  }
  return pairs;
}

export const searchUniquePartnerPairings = (cards: Card[]) => {
  const partners = cards.filter((card) =>
    card.type_line.includes('Legendary') &&
    card.oracle_text?.includes('Partner') &&
    !card.oracle_text?.includes('Partner with')
  );
  return getUniquePairs(partners);
};
