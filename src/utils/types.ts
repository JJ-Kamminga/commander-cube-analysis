export type Commander = {
  id: string,
  type: 'card' | 'pair';
  labelHeading: string,
  labelDescription: string,
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

export type CustomAnalysis = {
  monoLCPartner: Commander;
  allLCPartner: Commander;
}