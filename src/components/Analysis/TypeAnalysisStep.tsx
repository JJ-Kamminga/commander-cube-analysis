import { Info } from "@mui/icons-material";
import { Button, Card, CardContent, Chip } from "@mui/material";
import { probabilityBothInSubset } from "@/utils/helpers";
import { useState } from "react";
import { analysisMetadata, customAnalysisMetadata, getNumberOfCardsOfTypeInDraftPool, getPercentageOfCube, searchBackgroundPairings, searchByTypeLine, searchDoctorCompanionPairings, searchPartners, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings } from "@/utils/analysis";
import { AnalysisStepCardList, AnalysisStepCardListDrawer } from "./AnalysisStepCardList";
import { searchAllPartnerRule, searchCustomPartnerRule } from "@/utils/customAnalysis";
import { AnalysisCategory } from "./AnalysisCategory";
import { AnalysisChip } from "./AnalysisChip";
import { PlaneswalkerCommanderAnalysis } from "./Planeswalkers";
import { getArtCropUrl } from "@/utils/getArtCropUrl";
import { AnalysisStepProps } from "./types";

export const AnalysisStep: React.FC<AnalysisStepProps> = ({ ...props }) => {
  const { cardData, cubeCobraID, draftConfig, customRules } = props;
  const { playerCount, packsPerPlayer, cardsPerPack } = draftConfig;

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
    setLegendaries(legendaries as string[]);
    setPlaneswalkers(planeswalkers as string[]);
    setUniquePartnerPairings(uniquePartnerPairings as string[][]);
    setPartnerWithPairings(partnerWithPairings as string[][]);
    setFriendsForeverPairings(friendsForeverPairings as string[][]);
    setDoctorCompanionPairings(doctorCompanionPairings as string[][]);
    setBackgroundPairings(backgroundPairings as string[][]);
    /** Custom commanders */
    const monoLCPartner = searchCustomPartnerRule(cardData, (card) => card.color_identity.length === 1);
    const allLCPartner = searchAllPartnerRule(cardData);
    setmonoLCPartner(monoLCPartner);
    setallLCPartner(allLCPartner);
    /** Others */
    const partnerCreatures = searchPartners(cardData);
    setPartnerCreatures(partnerCreatures as string[]);

    setHasAnalysisLoaded(true);
  };

  const draftPoolSize = playerCount * packsPerPlayer * cardsPerPack;

  const partnerCount = partnerCreatures.length;
  const partnersPercentageOfCube = getPercentageOfCube(partnerCount, totalCubeCount);
  const partnersInDraftPool = getNumberOfCardsOfTypeInDraftPool(partnersPercentageOfCube, draftPoolSize);
  const partnersPerPlayer = partnersInDraftPool / playerCount;

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

  const legendariesArtCropUrl = getArtCropUrl(legendaries, cardData, true);
  const planeswalkersArtCropUrl = getArtCropUrl(planeswalkers, cardData);
  const partnerWithsArtCropUrl = getArtCropUrl(partnerWithPairings.flat(), cardData);
  const uniquePartnerPairingsArtCropUrl = getArtCropUrl(partnerCreatures, cardData);
  const friendsForeverArtCropUrl = getArtCropUrl(friendsForeverPairings.flat(), cardData);
  const doctorCompanionPairingsArtCropUrl = getArtCropUrl(doctorCompanionPairings.flat(), cardData);
  const backgroundPairingsArtCropUrl = getArtCropUrl(backgroundPairings.flat(), cardData);

  return (
    <>
      <div id="type-analysis-heading">
        <h3>Type Analysis</h3>
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
          <AnalysisCategory artCropUrl={legendariesArtCropUrl} categoryType="card" totalCubeCount={totalCubeCount} draftConfig={draftConfig} cardNames={legendaries} commander={analysisMetadata.legendaryCreatures} >
            <p><AnalysisChip label={'Includes ' + partnerCount + ' creatures with the Partner keyword'} /></p>
            <AnalysisStepCardListDrawer cardNames={legendaries} />
          </AnalysisCategory>
        ) : (<></>)
      }
      {planeswalkers.length > 0 && <PlaneswalkerCommanderAnalysis artCropUrl={planeswalkersArtCropUrl} totalCubeSize={totalCubeCount} draftConfig={draftConfig} cardNames={planeswalkers} />}
      {
        uniquePartnerPairings.length > 0
          ? (
            <AnalysisCategory artCropUrl={uniquePartnerPairingsArtCropUrl} categoryType="pairing" totalCubeCount={totalCubeCount} draftConfig={draftConfig} cardNames={uniquePartnerPairings} commander={analysisMetadata.partners}>
              {uniquePartnerPairings.length > 5 ? (
                <AnalysisStepCardListDrawer cardNames={uniquePartnerPairings} />
              ) : (
                <AnalysisStepCardList cardNames={uniquePartnerPairings} />
              )}
              <p>
                <AnalysisChip label={partnerCount + ' creatures with Partner in Cube'} />
                <AnalysisChip color={'secondary'} label={`${partnersInDraftPool} creatures in a draft pool of ${draftPoolSize}`} />
                <AnalysisChip color={'secondary'} label={`${partnersPerPlayer} per player`} />
              </p>
            </AnalysisCategory>
          ) : (<></>)
      }
      {
        partnerWithPairings.length > 0
          ? (
            <AnalysisCategory artCropUrl={partnerWithsArtCropUrl} categoryType="pairing" totalCubeCount={totalCubeCount} draftConfig={draftConfig} cardNames={partnerWithPairings} commander={analysisMetadata.partnerWiths}>
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
            <AnalysisCategory artCropUrl={friendsForeverArtCropUrl} categoryType="pairing" totalCubeCount={totalCubeCount} draftConfig={draftConfig} cardNames={friendsForeverPairings} commander={analysisMetadata.friendsForever}>
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
            <AnalysisCategory artCropUrl={doctorCompanionPairingsArtCropUrl} categoryType="pairing" totalCubeCount={totalCubeCount} draftConfig={draftConfig} cardNames={doctorCompanionPairings} commander={analysisMetadata.doctorPartners}>
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
            <AnalysisCategory artCropUrl={backgroundPairingsArtCropUrl} categoryType="pairing" totalCubeCount={totalCubeCount} draftConfig={draftConfig} cardNames={backgroundPairings} commander={analysisMetadata.backgroundPairings}>
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
                  <AnalysisCategory categoryType="pairing" totalCubeCount={totalCubeCount} draftConfig={draftConfig} cardNames={monoLCPartner} commander={customAnalysisMetadata.monoLCPartner}>
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
                  <AnalysisCategory categoryType="pairing" totalCubeCount={totalCubeCount} draftConfig={draftConfig} cardNames={allLCPartner} commander={customAnalysisMetadata.allLCPartner}>
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
