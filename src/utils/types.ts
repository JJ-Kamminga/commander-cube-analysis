import { Card } from "./mtg-scripting-toolkit/types";

export type Commander = {
  id: string,
  labelHeading: string,
  labelDescription: string,
  cardNames: (Card | Card[])[]
}

export type Analysis = {
  legendaryCreatures: Commander,
  planeswalkerCommanders: Commander,
  partners: Commander,
  partnerWiths: Commander,
  friendsForever: Commander,
  doctorPartners: Commander,
  backgroundPairings: Commander,
};
