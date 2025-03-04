import { Card } from "./mtg-scripting-toolkit/scryfall"

export const getArtCropUrl = (cardNames: string[], cardData: Card[], randomise?: boolean) => {
  let data = cardData;
  if (randomise === true) {
    data = cardData.toSorted(function () {
      return Math.random() - .5
    })
  }

  const firstHRScan = data.find(
    (card) => cardNames.includes(card.name) && card.image_status === 'highres_scan'
  );
  return firstHRScan?.image_uris.art_crop;
}