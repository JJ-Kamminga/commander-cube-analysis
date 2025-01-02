import { Card } from "./mtg-scripting-toolkit/scryfall/types";
import { Analysis } from "./types";

export const initialAnalysisObject: Analysis = {
  legendaryCreatures: {
    id: 'legendaryCreatures',
    labelHeading: 'Legendary creature(s)',
    labelDescription: 'Creatures that are commanders because they have the legendary supertype.',
    cardNames: [],
  },
  planeswalkerCommanders: {
    id: 'planeswalkerCommanders',
    labelHeading: 'Planeswalker commander(s)',
    labelDescription: 'Planeswalkers that are explicitly allowed as commanders.',
    cardNames: [],
  },
  partners: {
    id: 'partners',
    labelHeading: 'Partner pairing(s)',
    labelDescription: 'Unique possible pairings for creatures with the Partner ability.',
    cardNames: [],
  },
  partnerWiths: {
    id: 'partnerWiths',
    labelHeading: 'Named partner(s)',
    labelDescription: 'Pairings for creatures with the Partner With ability.',
    cardNames: [],
  },
  friendsForever: {
    id: 'friendsForever',
    labelHeading: 'Friends Forever pairings',
    labelDescription: 'Unique possible pairings for creatures with the Friends Forever ability.',
    cardNames: [],
  },
  doctorPartners: {
    id: 'doctorPartners',
    labelHeading: 'Doctor & Companion pairing(s)',
    labelDescription: 'Unique possible pairings of each Doctor with all possible Doctor\'s Companions.',
    cardNames: [],
  },
  backgroundPairings: {
    id: 'backgroundPairings',
    labelHeading: 'Background pairing(s)',
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

/** generates an array of all unique pairs, with one element from the first array and one element from the second array */
function getPairs<T, U>(array1: T[], array2: U[]): [T, U][] {
  const pairs: [T, U][] = [];
  for (const item1 of array1) {
    for (const item2 of array2) {
      pairs.push([item1, item2]);
    }
  }
  return pairs;
}

/** return each unique pairing of two objects from an array of objects */
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

export const searchUniqueFriendsForeverPairings = (cards: Card[]) => {
  const friendsForever = cards.filter((card) =>
    card.keywords?.find((keyword) => keyword == 'Friends forever')
  );
  return getUniquePairs(friendsForever);
}

export const searchPartnerWithPairings = (cards: Card[]) => {
  const partnerWiths = cards.filter((card) =>
    card.keywords?.find((keyword) => keyword == 'Partner with')
  );
  const partnerWithPairings: Card[][] = [];
  const covered: Card[] = [];
  partnerWiths.forEach((card) => {
    if (covered.includes(card)) return;
    const partnerWithPartner = partnerWiths.filter((partnerWith) =>
      partnerWith.id !== card.id &&
      partnerWith.all_parts?.find((part) => part.name == card.name)
    );
    partnerWithPairings.push([card, ...partnerWithPartner]);
    covered.push(card, ...partnerWithPartner);;
  });
  return partnerWithPairings;
};

export const searchDoctorCompanionPairings = (cards: Card[]) => {
  const doctors = cards.filter((card) =>
    card.type_line.includes('Legendary') &&
    card.type_line.includes('Time Lord Doctor')
  );

  const companions = cards.filter((card) =>
    card.type_line.includes('Legendary') &&
    card.keywords?.includes('Doctor\'s companion')
  );
  return getPairs(doctors, companions);
};

export const searchBackgroundPairings = (cards: Card[]) => {
  const creatures = cards.filter((card) =>
    card.oracle_text?.includes('Choose a Background')
  );

  const backgrounds = cards.filter((card) =>
    card.type_line.includes('Background')
  );
  return getPairs(creatures, backgrounds);
}
