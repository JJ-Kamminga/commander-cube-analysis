import { getNumberOfCardsOfTypeInDraftPool, getPercentageOfCube } from "@/utils/analysis";
import { AnalysisStepSubHeader } from "./AnalysisStepSubHeader";
import { CommanderMetadata } from "@/utils/types";
import { Avatar, Divider, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";
import { AnalysisChip } from "./AnalysisChip";
import { DraftConfig } from "./AnalysisStep";

type AnalysisCategoryProps = {
  cardNames: string[] | string[][];
  categoryType: 'card' | 'pairing';
  commander: CommanderMetadata;
  totalCubeCount: number;
  draftConfig: DraftConfig;
  artCropUrl?: string;
  children?: ReactNode;
}

export const AnalysisCategory: React.FC<AnalysisCategoryProps> = ({ ...props }) => {
  const { cardNames, categoryType, commander, totalCubeCount, draftConfig, artCropUrl, children } = props;
  const { cardsPerPack, packsPerPlayer, playerCount } = draftConfig;
  const draftPoolSize = cardsPerPack * packsPerPlayer * playerCount;

  const matches = useMediaQuery('(min-width:800px)');

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
      <section title={commander.labelHeading} >
        {
          artCropUrl && (
            <Avatar sx={{ width: 200, height: 200, float: 'right', display: matches ? 'initial' : 'none' }} alt={`Avatar image for category ${commander.labelHeading}`} src={artCropUrl} />
          )
        }
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
      </section>
      <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
    </>
  )
};