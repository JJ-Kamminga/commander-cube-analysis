import { getNumberOfCardsOfTypeInDraftPool, getPercentageOfCube } from "@/utils/analysis";
import { AnalysisStepSubHeader } from "./AnalysisStepSubHeader";
import { Commander } from "@/utils/types";
import { Divider } from "@mui/material";
import { ReactNode } from "react";
import { AnalysisChip } from "./AnalysisChip";

type AnalysisStepProps = {
  cardNames: string[] | string[][];
  categoryType: 'card' | 'pairing';
  commander: Commander;
  totalCubeCount: number;
  draftPoolSize: number;
  children?: ReactNode;
}

export const AnalysisCategory: React.FC<AnalysisStepProps> = ({ ...props }) => {
  const { cardNames, categoryType, commander, totalCubeCount, draftPoolSize, children } = props;

  let numberOfCardTypeInDraftPool: number | undefined;
  let cardTypePercentageOfCube: number | undefined;
  if (categoryType === 'card') {
    cardTypePercentageOfCube = getPercentageOfCube(cardNames.length, totalCubeCount);
    numberOfCardTypeInDraftPool = getNumberOfCardsOfTypeInDraftPool(cardTypePercentageOfCube, draftPoolSize);
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
      {categoryType === 'card' && <AnalysisChip label={cardTypePercentageOfCube?.toFixed(2) + '% of cube'} />}
      {children}
      <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
    </>
  )
};