import { Card } from "./mtg-scripting-toolkit/types";
import { Analysis, Commander } from "./types";

// export const initialAnalysisArray: Commander[] = [
//   {
//     id: 'legendaryCreatures',
//     labelHeading: 'Legendary Creatures',
//     labelDescription: 'Creatures that are commanders because they have the legendary supertype.',
//     cardNames: [],
//   },
//   {
//     id: 'partners',
//     labelHeading: 'Partner Pairings',
//     labelDescription: 'Unique possible pairings for creatures with the Partner ability.',
//     cardNames: [],
//   },
//   {
//     id: 'partnerWiths',
//     labelHeading: 'Named partners',
//     labelDescription: 'Pairings for creatures with the Partner With ability.',
//     cardNames: [],
//   },
//   {
//     id: 'friendsForever',
//     labelHeading: 'Friends Forever',
//     labelDescription: 'Unique possible pairings for creatures with the Friends Forever ability.',
//     cardNames: [],
//   },
//   {
//     id: 'doctorPartners',
//     labelHeading: 'Partner Withs',
//     labelDescription: 'Unique possible pairings of each Doctor with all possible Doctor\'s Companions.',
//     cardNames: [],
//   },
//   {
//     id: 'planeswalkerCommanders',
//     labelHeading: 'Partner Withs',
//     labelDescription: 'Planeswalkers that are explicitly allowed as commanders.',
//     cardNames: [],
//   },
//   {
//     id: 'backgroundPairings',
//     labelHeading: 'Partner Withs',
//     labelDescription: 'Unique possible pairings of creatures with the Choose a Background ability and Backgrounds.',
//     cardNames: [],
//   },
// ];

export const initialAnalysisObject: Analysis = {
  legendaryCreatures: {
    id: 'legendaryCreatures',
    labelHeading: 'Legendary Creatures',
    labelDescription: 'Creatures that are commanders because they have the legendary supertype.',
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
    labelHeading: 'Partner Withs',
    labelDescription: 'Unique possible pairings of each Doctor with all possible Doctor\'s Companions.',
    cardNames: [],
  },
  planeswalkerCommanders: {
    id: 'planeswalkerCommanders',
    labelHeading: 'Partner Withs',
    labelDescription: 'Planeswalkers that are explicitly allowed as commanders.',
    cardNames: [],
  },
  backgroundPairings: {
    id: 'backgroundPairings',
    labelHeading: 'Partner Withs',
    labelDescription: 'Unique possible pairings of creatures with the Choose a Background ability and Backgrounds.',
    cardNames: [],
  },
};

export const searchByTypeLine = (cards: Card[], query: string) => {
  return cards
    .filter((card) => card.type_line.includes(query))
    .map((card) => card.name)
};
