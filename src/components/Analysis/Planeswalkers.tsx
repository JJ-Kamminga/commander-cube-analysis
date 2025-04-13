import { analysisMetadata } from "@/utils/analysis";
import { AnalysisCategory } from "./AnalysisCategory"
import { AnalysisStepCardList, AnalysisStepCardListDrawer } from "./AnalysisStepCardList";
import { DraftConfig } from "./TypeAnalysisStep";

type PlaneswalkerCommanderAnalysisProps = {
  totalCubeSize: number;
  draftConfig: DraftConfig;
  cardNames: string[];
  artCropUrl?: string;
}

export const PlaneswalkerCommanderAnalysis: React.FC<PlaneswalkerCommanderAnalysisProps> = ({ ...props }) => {
  const { totalCubeSize, draftConfig, cardNames, artCropUrl } = props;

  return (
    <AnalysisCategory artCropUrl={artCropUrl} categoryType="card" totalCubeCount={totalCubeSize} draftConfig={draftConfig} cardNames={cardNames} commander={analysisMetadata.planeswalkerCommanders}>
      {cardNames.length > 5 ? (
        <AnalysisStepCardListDrawer cardNames={cardNames} />
      ) : (
        <AnalysisStepCardList cardNames={cardNames} />
      )}
    </AnalysisCategory>
  )
}