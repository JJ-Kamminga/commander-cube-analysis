import { Card } from "./mtg-scripting-toolkit/scryfall";

export const colourOrderStrings = [
  'W', 'U', 'B', 'R', 'G',
  'WU', 'UB', 'BR', 'RG', 'WG', 'WB', 'UR', 'BG', 'WR', 'UG',
  'WUB', 'UBR', 'BRG', 'WRG', 'WUG', 'WBG', 'WUR', 'UBG', 'WBR', 'URG',
  'WUBR', 'UBRG', 'WBRG', 'WURG', 'WUBG',
  'WUBRG',
  'C',
];

export const ciNicknameDictionary: { [key: string]: string } = {
  "W": "White",
  "U": "Blue",
  "B": "Black",
  "R": "Red",
  "G": "Green",
  "WU": "Azorius",
  "WR": "Boros",
  "UB": "Dimir",
  "BG": "Golgari",
  "RG": "Gruul",
  "UR": "Izzet",
  "WB": "Orzhov",
  "BR": "Rakdos",
  "WG": "Selesnya",
  "UG": "Simic",
  "WBG": "Abzan",
  "WUG": "Bant",
  "WUB": "Esper",
  "UBR": "Grixis",
  "WUR": "Jeskai",
  "BRG": "Jund",
  "WBR": "Mardu",
  "WRG": "Naya",
  "UBG": "Sultai",
  "URG": "Temur",
  "WBRG": "4C Blueless",
  "UBRG": "4C Whiteless",
  "WURG": "4C Blackless",
  "WUBG": "4C Redless",
  "WUBR": "4C Greenless",
  "WUBRG": "Five colour",
  "C": "Colourless"
};

export const mergeColourArrays = (arr1: string[], arr2: string[]) => {
  const mergedArray = arr1.concat(arr2);
  return mergedArray.filter(
    (element: string, index: number) => {
      return mergedArray.indexOf(element) === index;
    }
  )
};

export const queryColourIdentities = (cardData: Card[], query: string[]) => {
  return query.map((cardName) => {
    const colourIdentity = cardData.find((card) => cardName === card.name)?.color_identity as string[];
    return colourIdentity?.sort(compareColourIdentities).length
      ? colourIdentity
      : ['C']
  })
};

export const queryPairingColourIdentities = (cardData: Card[], query: string[][]) => {
  return query.map((cardNameArr) => {
    const colourIdentities = cardNameArr.map((cardName) => cardData.find((card) => cardName === card.name)?.color_identity as string[]);
    const mergedColourIdentities = mergeColourArrays(colourIdentities[0], colourIdentities[1]);
    return mergedColourIdentities?.sort(compareColourIdentities).length
      ? mergedColourIdentities
      : ['C']
  })
};

export const compareColourIdentities = (a: string, b: string) => {
  const orderOfA = colourOrderStrings.indexOf(a);
  const orderOfB = colourOrderStrings.indexOf(b);
  return orderOfA - orderOfB
};

export const sortColourIdentities = (cis: string[][]) => {
  return cis.map(ci => ci.join("")).sort(compareColourIdentities)
};

export const analyseColourIdentities = (colourIdentities: string[]) => {
  const resultObj: Record<string, number> = {};
  for (const ci of colourIdentities) {
    resultObj[ci] = (resultObj[ci] || 0) + 1;
  }
  return resultObj;
};
