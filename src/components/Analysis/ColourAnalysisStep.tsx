import { compareColourIdentities, searchColorIdentitiesByTypeLine } from "@/utils/analysis";
import { AnalysisStepProps } from "./types";
import { BarChart } from "@mui/x-charts";

const ciNicknameDictionary: { [key: string]: string } = {
  "W": "White",
  "U": "Blue",
  "B": "Black",
  "R": "Red",
  "G": "Green",
  "WU": "Azorius",
  "WR": "Boros",
  "UB": "Dimir",
  "BG": "Golgari",
  "RG": "Gruul",
  "UR": "Izzet",
  "WB": "Orzhov",
  "BR": "Rakdos",
  "WG": "Selesnya",
  "UG": "Simic",
  "WBG": "Abzan",
  "WUG": "Bant",
  "WUB": "Esper",
  "UBR": "Grixis",
  "WUR": "Jeskai",
  "BRG": "Jund",
  "WBR": "Mardu",
  "WRG": "Naya",
  "UBG": "Sultai",
  "URG": "Temur",
  "WBRG": "Dune",
  "UBRG": "Glint",
  "WURG": "Ink",
  "WUBG": "Witch",
  "WUBR": "Yore",
  "WUBRG": "WUBRG",
  "C": "Colourless"
};


export const ColourAnalysisStep: React.FC<AnalysisStepProps> = ({ ...props }) => {
  /** todo: check whether all are needed */
  const { cardData, cubeCobraID, draftConfig, customRules } = props;
  const { playerCount, packsPerPlayer, cardsPerPack } = draftConfig;

  const legendaryColourIdentities = searchColorIdentitiesByTypeLine(cardData, 'Legendary Creature');
  const sortedLegendaryColourIdentities = legendaryColourIdentities.map(legendaryCI => legendaryCI.join("")).sort(compareColourIdentities);
  const analyseLegendaryColourIdentities = (colourIdentities: string[]) => {
    const resultObj: Record<string, number> = {};
    for (const ci of colourIdentities) {
      resultObj[ci] = (resultObj[ci] || 0) + 1;
    }
    return resultObj;
  };

  const data = analyseLegendaryColourIdentities(sortedLegendaryColourIdentities);
  const xAxisData = Object.keys(data).map((key => {
    return key
  }));
  const series = [
    {
      label: 'Legendary creatures',
      data: Object.values(data).concat(),
    }
  ]

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
            height={800}
            barLabel={(item) => {
              const ci = Object.keys(data)[item.dataIndex]?.toString();
              return `${item.value} ${ci} (${ciNicknameDictionary[ci]})`;
            }}
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