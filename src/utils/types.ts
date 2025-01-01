export type Commander = {
  id: string,
  labelHeading: string,
  labelDescription: string,
  cardNames: (string | Pairing[])[]
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

type Pairing = string[];