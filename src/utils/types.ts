export type CommanderMetadata = {
  id: string,
  type: 'card' | 'pair';
  labelHeading: string,
  labelDescription: string,
}

export type Analysis = {
  legendaryCreatures: CommanderMetadata,
  planeswalkerCommanders: CommanderMetadata,
  partners: CommanderMetadata,
  partnerWiths: CommanderMetadata,
  friendsForever: CommanderMetadata,
  doctorPartners: CommanderMetadata,
  backgroundPairings: CommanderMetadata,
};

export type CustomAnalysis = {
  monoLCPartner: CommanderMetadata;
  allLCPartner: CommanderMetadata;
}