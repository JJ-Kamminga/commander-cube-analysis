import { ExpandMore, Info } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, Chip, Divider, List, ListItem, Typography } from "@mui/material";
import { Analysis } from "@/utils/types";
import { getRandomId, probabilityBothInSubset } from "@/utils/helpers";
import { Card as MagicCard } from "@/utils/mtg-scripting-toolkit/scryfall";
import { useState } from "react";
import { analysisMetadata, searchBackgroundPairings, searchByTypeLine, searchDoctorCompanionPairings, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings } from "@/utils/analysis";
import { AnalysisStepCardList } from "./AnalysisStepCardList";

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
  const [loaded, setLoaded] = useState<string[]>([]);
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
    setLoaded([...loaded, 'legendaries']);
    // setPlaneswalkers(planeswalkers);
    // setLoaded([...loaded, 'planeswalkers']);
    // setUniquePartnerPairings(uniquePartnerPairings);
    // setLoaded([...loaded, 'uniquePartnerPairings']);
    // setPartnerWithPairings(partnerWithPairings);
    // setLoaded([...loaded, 'partnerWithPairings']);
    // setFriendsForeverPairings(friendsForeverPairings);
    // setLoaded([...loaded, 'friendsForeverPairings']);
    // setDoctorCompanionPairings(doctorCompanionPairings);
    // setLoaded([...loaded, 'doctorCompanionPairings']);
    // setBackgroundPairings(backgroundPairings);

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
    setLoaded([]);
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
      {loaded.includes('legendaries')
        ? (
          <>
            <h4>{analysisMetadata.legendaryCreatures.labelHeading} ({legendaries.length || '0'} cards)</h4>
            <p>{analysisMetadata.legendaryCreatures.labelDescription}</p>
            <p>
              <>
                <Chip
                  color='primary'
                  sx={{ margin: '2px' }}
                  label={legendariesPercentageOfCubeLabel + '% of cube'} />
                <Chip
                  color='primary'
                  sx={{ margin: '2px' }}
                  label={`On average, ${numberOfLegendariesInDraftPool} will be opened in a ${draftPoolSize} card pool`} />
              </>
            </p>
            <AnalysisStepCardList cardNames={legendaries} />
            <Divider variant="middle" sx={{ marginBottom: '1rem' }} aria-hidden="true" />
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
