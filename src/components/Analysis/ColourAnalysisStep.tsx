import { analyseColourIdentities, compareColourIdentities, searchBackgroundPairings, searchByTypeLine, searchDoctorCompanionPairings, searchLegendaryCreatures, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings, sortColourIdentities } from "@/utils/analysis";
import { AnalysisStepProps } from "./types";
import { BarChart, BarChartProps, BarItem } from "@mui/x-charts";
import { Card } from "@/utils/mtg-scripting-toolkit/scryfall";
import { Button, Chip, Container, Typography } from "@mui/material";
import { ciNicknameDictionary, colourOrderStrings } from "@/utils/helpers";
import { useState } from "react";

const mergeColourArrays = (arr1: string[], arr2: string[]) => {
  const mergedArray = arr1.concat(arr2);
  return mergedArray.filter(
    (element: string, index: number) => {
      return mergedArray.indexOf(element) === index;
    }
  )
};

/** this sorts individual CI identifiers */
const filterByColourIndentity = (card: Card) => {
  const ci: string[] = [
    ...card.color_identity
  ];

  return ci.sort(compareColourIdentities).join("");
}

// const chartifyForColourChart = (
//   cardData: Card[],
//   seriesLabel: string,
//   searchFn: (
//     cards: Card[],
//     mapFn: (card: Card) => string
//   ) => string[]
// ) => {

//   const colourIdentities = searchFn(cardData, filterByColourIndentity);
//   const splitColourIdentities = colourIdentities.map(ci => ci.split(""));
//   const mergedColourIdentities = splitColourIdentities.map(ci => {
//     return mergeColourArrays(ci[0], ci[1]);
//   }
//   )
//   // const mergedColourIdentities = colourIdentities
//   // colourIdentities[0].concat(colourIdentities[1])
//   // const filteredMergedColourIdentities = mergedColourIdentities.filter(
//   //   (element: string, index: number) => {
//   //     return mergedColourIdentities.indexOf(element) === index;
//   //   }
//   // );
//   const sortedColourIdentities = sortColourIdentities(mergedColourIdentities)
//   const analysis = analyseColourIdentities(sortedColourIdentities)

//   return {
//     label: seriesLabel,
//     data: Object.values(analysis),
//   }
// };

const queryColourIdentities = (cardData: Card[], query: string[]) => {
  return query.map((cardName) => {
    const colourIdentity = cardData.find((card) => cardName === card.name)?.color_identity as string[];
    return colourIdentity?.sort(compareColourIdentities).length
      ? colourIdentity
      : ['C']
  })
}

const seriesDataExists = (series: BarChartProps["series"], label: string) => {
  return series.find(seriesData => seriesData.label === label)
};

export const ColourAnalysisStep: React.FC<AnalysisStepProps> = ({ ...props }) => {
  const { cardData, cubeCobraID } = props;
  const [series, setSeries] = useState<BarChartProps["series"]>([])
  const xAxisData = colourOrderStrings.map(ci => ciNicknameDictionary[ci]);

  const handleFetchAllAnalysis = () => {
    /** Legendary creatures */
    /** Maybe: pass this from earlier step instead of re-querying */
    const legendaryCreatureNames = searchLegendaryCreatures(cardData);
    const legendaryColourIdentities = queryColourIdentities(cardData, legendaryCreatureNames).filter(item => item !== undefined);
    const sortedLegendaryColourIdentities = sortColourIdentities(legendaryColourIdentities);
    const analysedsortedLegendaryColourIdentities = analyseColourIdentities(sortedLegendaryColourIdentities);
    const chartdataLegendaries = {
      label: 'Legendary creatures',
      data: colourOrderStrings.map((ci) => {
        return analysedsortedLegendaryColourIdentities[ci] || 0
      })
    };

    // const pwCommanderColourIdentities = searchPlaneswalkerCommanders(cardData, filterByColourIndentity);
    // const sortedPWColourIdentities = sortColourIdentities(pwCommanderColourIdentities as string[][]);
    // const chartdataPWCommanders = {
    //   label: 'Planeswalker commanders',
    //   data: Object.values(analyseColourIdentities(sortedPWColourIdentities)),//.concat(),
    // };

    /** Commander pairings */
    // const chartdataUniquePartnerPairings = chartifyForColourChart(cardData, 'Unique partner pairings', searchUniquePartnerPairings);
    // const chartdataUniqueFriendsForeverPairings = chartifyForColourChart(cardData, 'Unique Friends Forever pairings', searchUniqueFriendsForeverPairings);
    // const chartdataPartnerWithPairings = chartifyForColourChart(cardData, 'Partner With pairings', searchPartnerWithPairings);
    // const chartdataDoctorCompanionPairings = chartifyForColourChart(cardData, 'Doctor\'s companion pairings', searchDoctorCompanionPairings);
    // const chartdataBackgroundPairings = chartifyForColourChart(cardData, 'Background pairings', searchBackgroundPairings);

    if (Object.keys(chartdataLegendaries.data).length && !seriesDataExists(series, chartdataLegendaries.label)) {
      setSeries(series => [
        ...series,
        chartdataLegendaries
      ]);
    };
    // if (Object.keys(chartdataPWCommanders.data).length && !seriesDataExists(series, chartdataPWCommanders.label)) {
    //   setSeries(series => [
    //     ...series,
    //     chartdataPWCommanders
    //   ]);
    // };
    // if (Object.keys(chartdataUniquePartnerPairings.data).length && !seriesDataExists(series, chartdataUniquePartnerPairings.label)) {
    //   setSeries(series => [
    //     ...series,
    //     chartdataUniquePartnerPairings
    //   ]);
    // };
    // if (Object.keys(chartdataUniqueFriendsForeverPairings.data).length && !seriesDataExists(series, chartdataUniqueFriendsForeverPairings.label)) {
    //   setSeries(series => [
    //     ...series,
    //     chartdataUniqueFriendsForeverPairings
    //   ]);
    // };
    // if (Object.keys(chartdataPartnerWithPairings.data).length && !seriesDataExists(series, chartdataPartnerWithPairings.label)) {
    //   setSeries(series => [
    //     ...series,
    //     chartdataPartnerWithPairings
    //   ]);
    // };
    // if (Object.keys(chartdataDoctorCompanionPairings.data).length && !seriesDataExists(series, chartdataDoctorCompanionPairings.label)) {
    //   setSeries(series => [
    //     ...series,
    //     chartdataDoctorCompanionPairings
    //   ]);
    // };
    // if (Object.keys(chartdataBackgroundPairings.data).length && !seriesDataExists(series, chartdataBackgroundPairings.label)) {
    //   setSeries(series => [
    //     ...series,
    //     chartdataBackgroundPairings
    //   ]);
    // };
  };

  const generateBarLabel = (item: BarItem) => item.value?.toString();

  return (
    <>
      <div id="colour-analysis-heading">
        <h3>Colour analysis</h3>
      </div>
      <Button variant="outlined" onClick={handleFetchAllAnalysis}>Go</Button>
      <p>
        Your cube {cubeCobraID} contains the following distribution of colour identities.
      </p>
      <p>
        <Container sx={{ overflowY: 'scroll' }}>
          <BarChart
            xAxis={[{
              scaleType: 'band',
              data: xAxisData,
              tickPlacement: 'start',
              tickLabelPlacement: 'tick'
            }]}
            series={series}
            width={3000}
            height={800}
            barLabel={generateBarLabel}
            grid={{ horizontal: true }}
          />
        </Container>
        <Typography padding={5}><Chip color="warning" label='Please note!' /><b> There may be overlap between categories</b>:
          Legendary creatures or Planeswalker that are part of a pair (Partner, Background, etc.) are counted individually too.
        </Typography>
      </p>
    </>
  )
};