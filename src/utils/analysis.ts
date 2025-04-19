import { Card } from "./mtg-scripting-toolkit/scryfall/types";
import { Analysis, CustomAnalysis } from "./types";
import { getUniquePairs, getPairs, colourOrderStrings } from "./helpers";

const filterByName = (card: Card) => card.name;

export const searchByTypeLine = (
  cards: Card[],
  query: string,
  mapFn: (card: Card) => string | string[] = filterByName
) => cards
  .filter((card) => card.type_line.includes(query))
  .map(mapFn);
;

export const compareColourIdentities = (a: string, b: string) => {
  const orderOfA = colourOrderStrings.indexOf(a);
  const orderOfB = colourOrderStrings.indexOf(b);
  return orderOfA - orderOfB
};

export const sortColourIdentities = (cis: string[][]) => {
  /** Possible improvement: make comparefn a param */
  return cis.map(ci => ci.join("")).sort(compareColourIdentities)
};

export const analyseColourIdentities = (colourIdentities: string[]) => {
  const resultObj: Record<string, number> = {};
  for (const ci of colourIdentities) {
    resultObj[ci] = (resultObj[ci] || 0) + 1;
  }
  return resultObj;
};

export const searchPartners = (
  cards: Card[],
  mapFn: (card: Card) => string | string[] = filterByName,
) => cards
  .filter((card) => card.keywords.find((keyword) => keyword === 'Partner'))
  .filter((card) => card.keywords.every((keyword) => keyword !== 'Partner with'))
  .map(mapFn);
;

export const searchPlaneswalkerCommanders = (
  cards: Card[],
  mapFn: (card: Card) => string | string[] = filterByName,
) => cards
  .filter(
    (card) => card.type_line.includes('Planeswalker') && card.oracle_text?.includes('can be your commander')
  )
  .map(mapFn);
;

export const searchUniquePartnerPairings = (
  cards: Card[],
  mapFn: (card: Card) => string | string[] = filterByName,
) => {
  const partners = cards.filter((card) =>
    card.type_line.includes('Legendary') &&
    card.oracle_text?.includes('Partner') &&
    !card.oracle_text?.includes('Partner with')
  );
  return getUniquePairs(partners)
    .map(((pairArray) =>
      pairArray.map(mapFn)
    ));
  ;
};

export const searchUniqueFriendsForeverPairings = (
  cards: Card[],
  mapFn: (card: Card) => string | string[] = filterByName,
) => {
  const friendsForever = cards.filter((card) =>
    card.keywords?.find((keyword) => keyword == 'Friends forever')
  );
  return getUniquePairs(friendsForever)
    .map(((pairArray) =>
      pairArray.map(mapFn)
    ));
}

export const searchPartnerWithPairings = (
  cards: Card[],
  mapFn: (card: Card) => string | string[] = filterByName,
) => {
  const partnerWiths = cards.filter((card) =>
    card.keywords?.find((keyword) => keyword == 'Partner with')
  );
  if (partnerWiths.length <= 1) return [];

  const partnerWithPairings: Card[][] = [];
  const covered: Card[] = [];
  partnerWiths.forEach((card) => {
    if (covered.includes(card)) return;
    const partnerWithPartner = partnerWiths.filter((partnerWith) =>
      partnerWith.id !== card.id &&
      partnerWith.all_parts?.find((part) => part.name == card.name)
    );
    if (partnerWithPartner.length == 0) return [];

    partnerWithPairings.push([card, ...partnerWithPartner]);
    covered.push(card, ...partnerWithPartner);;
  });
  return partnerWithPairings
    .map(((pairArray) =>
      pairArray.map(mapFn)
    ));
};

export const searchDoctorCompanionPairings = (
  cards: Card[],
  mapFn: (card: Card) => string | string[] = filterByName,
) => {
  const doctors = cards.filter((card) =>
    card.type_line.includes('Legendary') &&
    card.type_line.includes('Time Lord Doctor')
  );

  const companions = cards.filter((card) =>
    card.type_line.includes('Legendary') &&
    card.keywords?.includes('Doctor\'s companion')
  );
  return getPairs(doctors, companions)
    .map(((pairArray) =>
      pairArray.map(mapFn))
    );
};

export const searchBackgroundPairings = (
  cards: Card[],
  mapFn: (card: Card) => string | string[] = filterByName,
) => {
  const creatures = cards.filter((card) =>
    card.oracle_text?.includes('Choose a Background')
  );

  const backgrounds = cards.filter((card) =>
    card.type_line.includes('Background')
  );
  return getPairs(creatures, backgrounds)
    .map(((pairArray) =>
      pairArray.map(mapFn)
    ));
}

export const getPercentageOfCube = (subsetLength: number, totalCubeCount: number) => {
  return subsetLength / totalCubeCount * 100;
};

export const getNumberOfCardsOfTypeInDraftPool = (percentageOfCube: number, draftPoolSize: number) => {
  return Math.ceil(draftPoolSize * percentageOfCube / 100);
}

export const analysisMetadata: Analysis = {
  legendaryCreatures: {
    id: 'legendaryCreatures',
    type: 'card',
    labelHeading: 'Legendary creature(s)',
    labelDescription: 'Creatures that are commanders because they have the legendary supertype.',
  },
  planeswalkerCommanders: {
    id: 'planeswalkerCommanders',
    type: 'card',
    labelHeading: 'Planeswalker commander(s)',
    labelDescription: 'Planeswalkers that are explicitly allowed as commanders.',
  },
  partners: {
    id: 'partners',
    type: 'pair',
    labelHeading: 'Partner pairing(s)',
    labelDescription: 'Unique possible pairings for creatures with the Partner ability.',
  },
  partnerWiths: {
    id: 'partnerWiths',
    type: 'pair',
    labelHeading: 'Named partner(s)',
    labelDescription: 'Pairings for creatures with the Partner With ability.',
  },
  friendsForever: {
    id: 'friendsForever',
    type: 'pair',
    labelHeading: 'Friends Forever pairings',
    labelDescription: 'Unique possible pairings for creatures with the Friends Forever ability.',
  },
  doctorPartners: {
    id: 'doctorPartners',
    type: 'pair',
    labelHeading: 'Doctor & Companion pairing(s)',
    labelDescription: 'Unique possible pairings of each Doctor with all possible Doctor\'s Companions.',
  },
  backgroundPairings: {
    id: 'backgroundPairings',
    type: 'pair',
    labelHeading: 'Background pairing(s)',
    labelDescription: 'Unique possible pairings of creatures with the Choose a Background ability and Backgrounds.',
  },
};

export const customAnalysisMetadata: CustomAnalysis = {
  monoLCPartner: {
    id: 'monoLCPartner',
    type: 'pair',
    labelHeading: 'Partner pairings if all monocoloured legendary creatures had partner',
    labelDescription: 'Unique pairings between all partners, monocoloured legendaries combined.',
  },
  allLCPartner: {
    id: 'allLCPartner',
    type: 'pair',
    labelHeading: 'Partner pairings if all legendary creatures had partner',
    labelDescription: 'Unique pairings between all partners, legendary creatures combined.',
  }
}