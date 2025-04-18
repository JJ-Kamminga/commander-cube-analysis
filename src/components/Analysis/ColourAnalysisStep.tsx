import { analyseColourIdentities, compareColourIdentities, searchByTypeLine, searchColorIdentitiesByTypeLine, searchPartners, searchPlaneswalkerCommanders, sortColourIdentities } from "@/utils/analysis";
import { AnalysisStepProps } from "./types";
import { BarChart, BarItem } from "@mui/x-charts";
import { Card } from "@/utils/mtg-scripting-toolkit/scryfall";

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
  "WBRG": "4C Blueless",
  "UBRG": "4C Whiteless",
  "WURG": "4C Blackless",
  "WUBG": "4C Redless",
  "WUBR": "4C Greenless",
  "WUBRG": "WUBRG",
  "C": "Colourless"
};

/** this sorts individual CI identifiers */
const filterByColourIndentity = (card: Card) => card.color_identity.sort(compareColourIdentities)

export const ColourAnalysisStep: React.FC<AnalysisStepProps> = ({ ...props }) => {
  /** todo: check whether all are needed */
  const { cardData, cubeCobraID, draftConfig, customRules } = props;
  const { playerCount, packsPerPlayer, cardsPerPack } = draftConfig;

  /** Legendary creatures */
  const legendaryColourIdentities = searchByTypeLine(
    cardData,
    'Legendary Creature',
    filterByColourIndentity
  );
  const sortedLegendaryColourIdentities = sortColourIdentities(legendaryColourIdentities as string[][]);
  const chartdataLegendaries = analyseColourIdentities(sortedLegendaryColourIdentities);
  const xAxisDataLegendaries = Object.keys(chartdataLegendaries).map((key => `${key}`));

  /** Partners */
  // const partnerColourIdentities = searchPartners(
  //   cardData,
  //   filterByColourIdentity
  // )

  /** Planeswalker commanders */
  const pWCommanderColourIdentities = searchPlaneswalkerCommanders(
    cardData,
    filterByColourIndentity
  );
  const sortedPWCommanderColourIndentities = sortColourIdentities(pWCommanderColourIdentities as string[][])
  const chartdataPWCommanders = analyseColourIdentities(sortedPWCommanderColourIndentities);
  const xAxisDataPlaneswalkerCommanders = Object.keys(chartdataPWCommanders).map((key => key));

  const generateBarLabel = (item: BarItem) => {
    const ci = Object.keys(chartdataLegendaries)[item.dataIndex]?.toString();
    return `${ciNicknameDictionary[ci]}`;
  }

  const series = [
    {
      label: 'Legendary creatures',
      data: Object.values(chartdataLegendaries).concat(),
    },
    {
      label: 'PW',
      data: Object.values(chartdataPWCommanders).concat(),
    },
  ];

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
            xAxis={[
              { scaleType: 'band', data: xAxisDataLegendaries },
              // { scaleType: 'band', data: xAxisDataPlaneswalkerCommanders }
            ]}
            series={series}
            width={1000}
            height={800}
            barLabel={generateBarLabel}
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