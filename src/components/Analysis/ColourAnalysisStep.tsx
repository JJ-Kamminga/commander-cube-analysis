import { searchColorIdentitiesByTypeLine } from "@/utils/analysis";
import { AnalysisStepProps } from "./types";
import { BarChart } from "@mui/x-charts";

export const ColourAnalysisStep: React.FC<AnalysisStepProps> = ({ ...props }) => {
  /** todo: check whether all are needed */
  const { cardData, cubeCobraID, draftConfig, customRules } = props;
  const { playerCount, packsPerPlayer, cardsPerPack } = draftConfig;

  const legendaries = searchColorIdentitiesByTypeLine(cardData, 'Legendary Creature');

  function countExactStrings(arr: string[]): Record<string, number> {
    const result: Record<string, number> = {};
    for (const str of arr) {
      result[str] = (result[str] || 0) + 1;
    }
    return result;
  }

  const data = countExactStrings(legendaries);
  const xAxisData = Object.keys(data);
  const series = [{ data: Object.values(data).concat() }]
  console.log(xAxisData)
  console.log(series);

  return (
    <>
      <div id="colour-analysis-heading">
        <h3>Colour analysis</h3>
        <p>descr</p>
      </div>
      <div>
        <h3>Legendary creatures</h3>
        <p>
          Your cube contains the following distribution of colour identities for legendary creatures
        </p>
        <p>
          <BarChart
            yAxis={[{ scaleType: 'band', data: xAxisData }]}
            series={series}
            width={1000}
            height={500}
            layout="horizontal"
          />
        </p>
        {/* <p>
          Stuff that would be nice:
          - number of partner pairings per colour identity
          - etc. etc.
        </p> */}
      </div>
    </>
  )
};