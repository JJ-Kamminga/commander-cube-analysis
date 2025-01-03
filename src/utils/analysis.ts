import { Card } from "./mtg-scripting-toolkit/scryfall/types";
import { Analysis } from "./types";
import { getUniquePairs, getPairs } from "./helpers";

export const searchByTypeLine = (cards: Card[], query: string) => {
  return cards
    .filter((card) => card.type_line.includes(query))
    .map((card) => card.name);
};

export const searchPlaneswalkerCommanders = (cards: Card[]) => {
  return cards
    .filter(
      (card) => card.type_line.includes('Planeswalker') && card.oracle_text?.includes('can be your commander')
    )
    .map((card) => card.name);
};

export const searchUniquePartnerPairings = (cards: Card[]) => {
  const partners = cards.filter((card) =>
    card.type_line.includes('Legendary') &&
    card.oracle_text?.includes('Partner') &&
    !card.oracle_text?.includes('Partner with')
  );
  return getUniquePairs(partners)
    .map(((pairArray) =>
      pairArray.map((card) => card.name)
    ));
  ;
};

export const searchUniqueFriendsForeverPairings = (cards: Card[]) => {
  const friendsForever = cards.filter((card) =>
    card.keywords?.find((keyword) => keyword == 'Friends forever')
  );
  return getUniquePairs(friendsForever)
    .map(((pairArray) =>
      pairArray.map((card) => card.name)
    ));
}

export const searchPartnerWithPairings = (cards: Card[]) => {
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
      pairArray.map((card) => card.name)
    ));
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
  return getPairs(doctors, companions)
    .map(((pairArray) =>
      pairArray.map((card) => card.name))
    );
};

export const searchBackgroundPairings = (cards: Card[]) => {
  const creatures = cards.filter((card) =>
    card.oracle_text?.includes('Choose a Background')
  );

  const backgrounds = cards.filter((card) =>
    card.type_line.includes('Background')
  );
  return getPairs(creatures, backgrounds)
    .map(((pairArray) =>
      pairArray.map((card) => card.name)
    ));
}

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
