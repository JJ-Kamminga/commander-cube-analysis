import { AnalysisStepSubHeader } from "./AnalysisStepSubHeader";
import { Commander } from "@/utils/types";
import { Divider } from "@mui/material";
import { ReactNode } from "react";

type AnalysisStepProps = {
  cardData: string[] | string[][];
  commander: Commander;
  children?: ReactNode;
}

export const AnalysisCategory: React.FC<AnalysisStepProps> = ({ cardData, commander, children }) => {
  return (
    <>
      <AnalysisStepSubHeader
        totalCount={cardData.length}
        label={commander.labelHeading}
        description={commander.labelDescription} />
      {children}
      <Divider variant="middle" sx={{ margin: '1rem' }} aria-hidden="true" />
    </>
  )
};