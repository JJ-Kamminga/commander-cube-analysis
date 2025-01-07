import { Info } from "@mui/icons-material";
import { Button, Card, CardContent, Chip, Divider } from "@mui/material";
import { probabilityBothInSubset } from "@/utils/helpers";
import { Card as MagicCard } from "@/utils/mtg-scripting-toolkit/scryfall";
import { useState } from "react";
import { analysisMetadata, searchBackgroundPairings, searchByTypeLine, searchDoctorCompanionPairings, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings } from "@/utils/analysis";
import { AnalysisStepCardList, AnalysisStepCardListDrawer } from "./AnalysisStepCardList";
import { AnalysisStepSubHeader } from "./AnalysisStepSubHeader";

type AnalysisStepProps = {
  cardData: MagicCard[],
  cubeCobraID: string,
  playerCount: number,
  packsPerPlayer: number,
  cardsPerPack: number,
};

export const AnalysisStep: React.FC<AnalysisStepProps> = ({ ...props }) => {
  const { cardData, cubeCobraID, playerCount, packsPerPlayer, cardsPerPack } = props;
  const totalCubeCount = cardData.length;

  /** State */
  const [hasAnalysisLoaded, setHasAnalysisLoaded] = useState<boolean>(false);
  const [legendaries, setLegendaries] = useState<string[]>([]);
  const [planeswalkers, setPlaneswalkers] = useState<string[]>([]);
  const [uniquePartnerPairings, setUniquePartnerPairings] = useState<string[][]>([]);
  const [partnerWithPairings, setPartnerWithPairings] = useState<string[][]>([]);
  const [friendsForeverPairings, setFriendsForeverPairings] = useState<string[][]>([]);
  const [doctorCompanionPairings, setDoctorCompanionPairings] = useState<string[][]>([]);
  const [backgroundPairings, setBackgroundPairings] = useState<string[][]>([]);

  const handleFetchAllAnalysis = () => {
    const legendaries = searchByTypeLine(cardData, 'Legendary Creature');
    const planeswalkers = searchPlaneswalkerCommanders(cardData);
    const uniquePartnerPairings = searchUniquePartnerPairings(cardData);
    const partnerWithPairings = searchPartnerWithPairings(cardData);
    const friendsForeverPairings = searchUniqueFriendsForeverPairings(cardData);
    const doctorCompanionPairings = searchDoctorCompanionPairings(cardData);
    const backgroundPairings = searchBackgroundPairings(cardData);

    setLegendaries(legendaries);
    setPlaneswalkers(planeswalkers);
    setUniquePartnerPairings(uniquePartnerPairings);
    setPartnerWithPairings(partnerWithPairings);
    setFriendsForeverPairings(friendsForeverPairings);
    setDoctorCompanionPairings(doctorCompanionPairings);
    setBackgroundPairings(backgroundPairings);

    setHasAnalysisLoaded(true);
  };

  /** under construction */
  const getPercentageOfCube = (cardNames: string[], totalCubeCount: number) => {
    return cardNames.length / totalCubeCount * 100;
  };
  const legendariesPercentageOfCube = getPercentageOfCube(legendaries, totalCubeCount);
  const legendariesPercentageOfCubeLabel = legendariesPercentageOfCube.toFixed()

  const draftPoolSize = playerCount * packsPerPlayer * cardsPerPack;

  const getNumberOfCardsOfTypeInDraftPool = (percentageOfCube: number, draftPoolSize: number) => {
    return Math.ceil(draftPoolSize * percentageOfCube / 100);
  }
  const numberOfLegendariesInDraftPool = getNumberOfCardsOfTypeInDraftPool(legendariesPercentageOfCube, draftPoolSize);

  const partnerWithProbability = (probabilityBothInSubset(totalCubeCount, draftPoolSize) * 100).toFixed(2);
  const partnerWithProbabilityLabel = `${partnerWithProbability}% probability of both partners of any given pair being in a ${draftPoolSize} draft pool.`;
  /** maybe use this for images in the future */
  // const firstCard = Array.isArray(data.cardNames[0]) ? data.cardNames[0][0] : data.cardNames[0];

  const handleClearAnalysis = () => {
    setLegendaries([]);
    setPlaneswalkers([]);
    setUniquePartnerPairings([]);
    setPartnerWithPairings([]);
    setFriendsForeverPairings([]);
    setDoctorCompanionPairings([]);
    setBackgroundPairings([]);
    setHasAnalysisLoaded(false);
  };

  return (
    <>
      <div id="analysis-heading">
        <h3>Analysis</h3>
        <p>
          <Info />Analysis is done based on a draft configuration of
          <Chip color='info' label={playerCount} sx={{ margin: '5px' }
          } />
          players,
          <Chip color='info' label={packsPerPlayer} sx={{ margin: '5px' }} />
          packs per player, and
          <Chip color='info' label={cardsPerPack} sx={{ margin: '5px' }} />
          cards per pack.
        </p>
        <Button variant="outlined" onClick={handleFetchAllAnalysis}>Go</Button>
        <Button variant="outlined" onClick={handleClearAnalysis}>Clear</Button>
      </div>
      <h3>Your cube {cubeCobraID} contains:</h3>
      {legendaries.length > 0
        ? (
          <>
            <AnalysisStepSubHeader
              count={legendaries.length}
              label={analysisMetadata.legendaryCreatures.labelHeading}
              description={analysisMetadata.legendaryCreatures.labelDescription} />
            <p>
              <>
                <Chip
                  color='primary'
                  sx={{ margin: '2px' }}
                  label={legendariesPercentageOfCubeLabel + '% of cube'} />
                <Chip
                  color='primary'
                  sx={{ margin: '2px' }}
                  label={`On average, ${numberOfLegendariesInDraftPool} will be opened in a ${draftPoolSize} card pool (${numberOfLegendariesInDraftPool / playerCount} per player)`} />

              </>
            </p>
            <AnalysisStepCardListDrawer cardNames={legendaries} />
            <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
          </>
        ) : (<></>)
      }
      {planeswalkers.length > 0
        ? (
          <>
            <AnalysisStepSubHeader
              count={planeswalkers.length}
              label={analysisMetadata.planeswalkerCommanders.labelHeading}
              description={analysisMetadata.planeswalkerCommanders.labelDescription} />
            {planeswalkers.length > 5 ? (
              <AnalysisStepCardListDrawer cardNames={planeswalkers} />
            ) : (
              <AnalysisStepCardList cardNames={planeswalkers} />
            )}
            <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
          </>
        ) : (<></>)
      }
      {uniquePartnerPairings.length > 0
        ? (
          <>
            <AnalysisStepSubHeader
              count={uniquePartnerPairings.length}
              label={analysisMetadata.partners.labelHeading}
              description={analysisMetadata.partners.labelDescription} />
            {uniquePartnerPairings.length > 5 ? (
              <AnalysisStepCardListDrawer cardNames={uniquePartnerPairings} />
            ) : (
              <AnalysisStepCardList cardNames={uniquePartnerPairings} />
            )}
            <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
          </>
        ) : (<></>)
      }
      {partnerWithPairings.length > 0
        ? (
          <>
            <AnalysisStepSubHeader
              count={partnerWithPairings.length}
              label={analysisMetadata.partnerWiths.labelHeading}
              description={analysisMetadata.partnerWiths.labelDescription} />
            {partnerWithPairings.length > 5 ? (
              <AnalysisStepCardListDrawer cardNames={partnerWithPairings} />
            ) : (
              <AnalysisStepCardList cardNames={partnerWithPairings} />
            )}
            <p>
              <Chip
                color='primary'
                sx={{ margin: '2px' }}
                label={partnerWithProbabilityLabel} />

            </p>
            <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
          </>
        ) : (<></>)
      }
      {friendsForeverPairings.length > 0
        ? (
          <>
            <AnalysisStepSubHeader
              count={friendsForeverPairings.length}
              label={analysisMetadata.friendsForever.labelHeading}
              description={analysisMetadata.friendsForever.labelDescription} />
            {friendsForeverPairings.length > 5 ? (
              <AnalysisStepCardListDrawer cardNames={friendsForeverPairings} />
            ) : (
              <AnalysisStepCardList cardNames={friendsForeverPairings} />
            )}
            <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
          </>
        ) : (<></>)
      }
      {doctorCompanionPairings.length > 0
        ? (
          <>
            <AnalysisStepSubHeader
              count={doctorCompanionPairings.length}
              label={analysisMetadata.doctorPartners.labelHeading}
              description={analysisMetadata.doctorPartners.labelDescription} />
            {doctorCompanionPairings.length > 5 ? (
              <AnalysisStepCardListDrawer cardNames={doctorCompanionPairings} />
            ) : (
              <AnalysisStepCardList cardNames={doctorCompanionPairings} />
            )}
            <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
          </>
        ) : (<></>)
      }
      {backgroundPairings.length > 0
        ? (
          <>
            <AnalysisStepSubHeader
              count={backgroundPairings.length}
              label={analysisMetadata.backgroundPairings.labelHeading}
              description={analysisMetadata.backgroundPairings.labelDescription} />
            {backgroundPairings.length > 5 ? (
              <AnalysisStepCardListDrawer cardNames={backgroundPairings} />
            ) : (
              <AnalysisStepCardList cardNames={backgroundPairings} />
            )}
            <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
          </>
        ) : (<></>)
      }
      {
        hasAnalysisLoaded
          ? (<>
            <Card >
              <CardContent>
                <h3>Actions</h3>
                <p>Analysis is done on your device, and results will be lost on page reload. Click here to retrigger the analysis with previously submitted cube.</p>
                <Button sx={{ margin: '2' }} variant='outlined' onClick={handleFetchAllAnalysis}>
                  Retrigger analysis
                </Button>
              </CardContent>
            </Card>
          </>)
          : (<></>)
      }
    </ >)
};
