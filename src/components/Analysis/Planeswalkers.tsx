import { analysisMetadata } from "@/utils/analysis";
import { AnalysisCategory } from "./AnalysisCategory"
import { AnalysisStepCardList, AnalysisStepCardListDrawer } from "./AnalysisStepCardList";
import { useEffect, useState } from "react";
import { DraftConfig } from "./AnalysisStep";

type PlaneswalkerCommanderAnalysisProps = {
  totalCubeSize: number;
  draftConfig: DraftConfig;
  cardNames: string[];
}

export const PlaneswalkerCommanderAnalysis: React.FC<PlaneswalkerCommanderAnalysisProps> = ({ ...props }) => {
  const { totalCubeSize, draftConfig, cardNames } = props;

  return (
    <AnalysisCategory categoryType="card" totalCubeCount={totalCubeSize} draftConfig={draftConfig} cardNames={cardNames} commander={analysisMetadata.planeswalkerCommanders}>
      {cardNames.length > 5 ? (
        <AnalysisStepCardListDrawer cardNames={cardNames} />
      ) : (
        <AnalysisStepCardList cardNames={cardNames} />
      )}
    </AnalysisCategory>
  )
}