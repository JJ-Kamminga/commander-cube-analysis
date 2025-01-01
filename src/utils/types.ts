export type Commander = {
  id: string,
  labelHeading: string,
  labelDescription: string,
  cardNames: (string | Pairing[])[]
}

export type Analysis = {
  legendaryCreatures: Commander,
  partners: Commander,
  partnerWiths: Commander,
  friendsForever: Commander,
  doctorPartners: Commander,
  planeswalkerCommanders: Commander,
  backgroundPairings: Commander,
};

type Pairing = string[];