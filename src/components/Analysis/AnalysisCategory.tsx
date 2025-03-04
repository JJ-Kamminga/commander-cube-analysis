import { getNumberOfCardsOfTypeInDraftPool, getPercentageOfCube } from "@/utils/analysis";
import { AnalysisStepSubHeader } from "./AnalysisStepSubHeader";
import { Commander } from "@/utils/types";
import { Divider } from "@mui/material";
import { ReactNode } from "react";
import { AnalysisChip } from "./AnalysisChip";
import { DraftConfig } from "./AnalysisStep";

type AnalysisCategoryProps = {
  cardNames: string[] | string[][];
  categoryType: 'card' | 'pairing';
  commander: Commander;
  totalCubeCount: number;
  draftConfig: DraftConfig;
  children?: ReactNode;
}

export const AnalysisCategory: React.FC<AnalysisCategoryProps> = ({ ...props }) => {
  const { cardNames, categoryType, commander, totalCubeCount, draftConfig, children } = props;
  const { cardsPerPack, packsPerPlayer, playerCount } = draftConfig;
  const draftPoolSize = cardsPerPack * packsPerPlayer * playerCount;

  let numberOfCardTypeInDraftPool: number | undefined;
  let cardTypePercentageOfCube: number | undefined;
  let numberOfCardTypePerPlayer: number | undefined;
  if (categoryType === 'card') {
    cardTypePercentageOfCube = getPercentageOfCube(cardNames.length, totalCubeCount);
    numberOfCardTypeInDraftPool = getNumberOfCardsOfTypeInDraftPool(cardTypePercentageOfCube, draftPoolSize);
    numberOfCardTypePerPlayer = numberOfCardTypeInDraftPool / playerCount;
  }

  return (
    <>
      <AnalysisStepSubHeader
        totalCount={cardNames.length}
        categoryType={categoryType}
        label={commander.labelHeading}
        draftPoolSize={draftPoolSize}
        countInDraftPool={numberOfCardTypeInDraftPool}
        description={commander.labelDescription} />
      {categoryType === 'card' && (
        <>
          <AnalysisChip label={cardTypePercentageOfCube?.toFixed(2) + '% of cube'} />
          <AnalysisChip label={numberOfCardTypePerPlayer?.toFixed(2) + ' per player'} />
        </>
      )
      }
      {children}
      <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
    </>
  )
};