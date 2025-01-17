import { Info } from "@mui/icons-material";
import { Button, Card, CardContent, Chip } from "@mui/material";
import { probabilityBothInSubset } from "@/utils/helpers";
import { Card as MagicCard } from "@/utils/mtg-scripting-toolkit/scryfall";
import { useState } from "react";
import { analysisMetadata, customAnalysisMetadata, getNumberOfCardsOfTypeInDraftPool, getPercentageOfCube, searchBackgroundPairings, searchByTypeLine, searchDoctorCompanionPairings, searchPartners, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings } from "@/utils/analysis";
import { AnalysisStepCardList, AnalysisStepCardListDrawer } from "./AnalysisStepCardList";
import { searchAllPartnerRule, searchCustomPartnerRule } from "@/utils/customAnalysis";
import { AnalysisCategory } from "./AnalysisCategory";
import { AnalysisChip } from "./AnalysisChip";

type AnalysisStepProps = {
  cardData: MagicCard[],
  cubeCobraID: string,
  playerCount: number,
  packsPerPlayer: number,
  cardsPerPack: number,
  customRules: string[];
};

export const AnalysisStep: React.FC<AnalysisStepProps> = ({ ...props }) => {
  const { cardData, cubeCobraID, playerCount, packsPerPlayer, cardsPerPack, customRules } = props;
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

  const [partnerCreatures, setPartnerCreatures] = useState<string[]>([]);

  const [monoLCPartner, setmonoLCPartner] = useState<string[][]>([]);
  const [allLCPartner, setallLCPartner] = useState<string[][]>([]);

  const handleFetchAllAnalysis = () => {
    /** Commanders */
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
    /** Custom commanders */
    const monoLCPartner = searchCustomPartnerRule(cardData, (card) => card.color_identity.length === 1);
    const allLCPartner = searchAllPartnerRule(cardData);
    setmonoLCPartner(monoLCPartner);
    setallLCPartner(allLCPartner);
    /** Others */
    const partnerCreatures = searchPartners(cardData);
    setPartnerCreatures(partnerCreatures);

    setHasAnalysisLoaded(true);
  };

  const draftPoolSize = playerCount * packsPerPlayer * cardsPerPack;

  const partnerCount = partnerCreatures.length;
  const partnersPercentageOfCube = getPercentageOfCube(partnerCount, totalCubeCount);
  const partnersInDraftPool = getNumberOfCardsOfTypeInDraftPool(partnersPercentageOfCube, draftPoolSize);

  const partnerWithProbability = (probabilityBothInSubset(totalCubeCount, draftPoolSize) * 100).toFixed(2);
  const partnerWithProbabilityLabel = `${partnerWithProbability}% probability of both partners of any given pair being in a ${draftPoolSize} draft pool.`;

  const handleClearAnalysis = () => {
    setLegendaries([]);
    setPlaneswalkers([]);
    setUniquePartnerPairings([]);
    setPartnerWithPairings([]);
    setFriendsForeverPairings([]);
    setDoctorCompanionPairings([]);
    setBackgroundPairings([]);
    setmonoLCPartner([]);
    setallLCPartner([]);
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
          <AnalysisCategory categoryType="card" totalCubeCount={totalCubeCount} draftPoolSize={draftPoolSize} cardNames={legendaries} commander={analysisMetadata.legendaryCreatures} >
            <p><AnalysisChip label={'Includes ' + partnerCount + ' creatures with the Partner keyword'} /></p>
            <AnalysisStepCardListDrawer cardNames={legendaries} />
          </AnalysisCategory>
        ) : (<></>)
      }
      {
        planeswalkers.length > 0
          ? (
            <AnalysisCategory categoryType="card" totalCubeCount={totalCubeCount} draftPoolSize={draftPoolSize} cardNames={planeswalkers} commander={analysisMetadata.planeswalkerCommanders}>
              {planeswalkers.length > 5 ? (
                <AnalysisStepCardListDrawer cardNames={planeswalkers} />
              ) : (
                <AnalysisStepCardList cardNames={planeswalkers} />
              )}
            </AnalysisCategory>
          ) : (<></>)
      }
      {
        uniquePartnerPairings.length > 0
          ? (
            <AnalysisCategory categoryType="pairing" totalCubeCount={totalCubeCount} draftPoolSize={draftPoolSize} cardNames={uniquePartnerPairings} commander={analysisMetadata.partners}>
              {uniquePartnerPairings.length > 5 ? (
                <AnalysisStepCardListDrawer cardNames={uniquePartnerPairings} />
              ) : (
                <AnalysisStepCardList cardNames={uniquePartnerPairings} />
              )}
              <p>
                <AnalysisChip label={partnerCount + ' creatures with Partner in Cube'} />
                <AnalysisChip label={partnersInDraftPool + ' creatures with Partner in draft pool of ' + draftPoolSize} />
              </p>
            </AnalysisCategory>
          ) : (<></>)
      }
      {
        partnerWithPairings.length > 0
          ? (
            <AnalysisCategory categoryType="pairing" totalCubeCount={totalCubeCount} draftPoolSize={draftPoolSize} cardNames={partnerWithPairings} commander={analysisMetadata.partnerWiths}>
              {partnerWithPairings.length > 5 ? (
                <AnalysisStepCardListDrawer cardNames={partnerWithPairings} />
              ) : (
                <AnalysisStepCardList cardNames={partnerWithPairings} />
              )}
              <p>
                <AnalysisChip label={partnerWithProbabilityLabel} />
              </p>
            </AnalysisCategory>
          ) : (<></>)
      }
      {
        friendsForeverPairings.length > 0
          ? (
            <AnalysisCategory categoryType="pairing" totalCubeCount={totalCubeCount} draftPoolSize={draftPoolSize} cardNames={friendsForeverPairings} commander={analysisMetadata.friendsForever}>
              {friendsForeverPairings.length > 5 ? (
                <AnalysisStepCardListDrawer cardNames={friendsForeverPairings} />
              ) : (
                <AnalysisStepCardList cardNames={friendsForeverPairings} />
              )}
            </AnalysisCategory>
          ) : (<></>)
      }
      {
        doctorCompanionPairings.length > 0
          ? (
            <AnalysisCategory categoryType="pairing" totalCubeCount={totalCubeCount} draftPoolSize={draftPoolSize} cardNames={doctorCompanionPairings} commander={analysisMetadata.doctorPartners}>
              {doctorCompanionPairings.length > 5 ? (
                <AnalysisStepCardListDrawer cardNames={doctorCompanionPairings} />
              ) : (
                <AnalysisStepCardList cardNames={doctorCompanionPairings} />
              )}
            </AnalysisCategory>
          ) : (<></>)
      }
      {
        backgroundPairings.length > 0
          ? (
            <AnalysisCategory categoryType="pairing" totalCubeCount={totalCubeCount} draftPoolSize={draftPoolSize} cardNames={backgroundPairings} commander={analysisMetadata.backgroundPairings}>
              {backgroundPairings.length > 5 ? (
                <AnalysisStepCardListDrawer cardNames={backgroundPairings} />
              ) : (
                <AnalysisStepCardList cardNames={backgroundPairings} />
              )}
            </AnalysisCategory>
          ) : (<></>)
      }
      {
        customRules.length && hasAnalysisLoaded ? (
          <>
            <h3>Custom Rules Analysis</h3>
            {customRules.includes('monoLCPartner') ? (
              <>
                {monoLCPartner.length ? (
                  <AnalysisCategory categoryType="pairing" totalCubeCount={totalCubeCount} draftPoolSize={draftPoolSize} cardNames={monoLCPartner} commander={customAnalysisMetadata.monoLCPartner}>
                    <AnalysisStepCardListDrawer cardNames={monoLCPartner} />
                  </AnalysisCategory>
                ) : <></>
                }
              </>
            ) : (
              <></>
            )
            }
            {customRules.includes('allLCPartner') ? (
              <>
                {allLCPartner.length ? (
                  <AnalysisCategory categoryType="pairing" totalCubeCount={totalCubeCount} draftPoolSize={draftPoolSize} cardNames={allLCPartner} commander={customAnalysisMetadata.allLCPartner}>
                    <AnalysisStepCardListDrawer cardNames={allLCPartner} />
                  </AnalysisCategory>
                ) : <></>
                }
              </>
            ) : (
              <></>
            )
            }
          </>
        ) : (
          <></>
        )
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
