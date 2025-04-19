import { analyseColourIdentities, compareColourIdentities, searchBackgroundPairings, searchByTypeLine, searchDoctorCompanionPairings, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings, sortColourIdentities } from "@/utils/analysis";
import { AnalysisStepProps } from "./types";
import { BarChart, BarChartProps, BarItem } from "@mui/x-charts";
import { Card } from "@/utils/mtg-scripting-toolkit/scryfall";
import { Button, Chip, Container, Typography } from "@mui/material";
import { ciNicknameDictionary } from "@/utils/helpers";
import { useState } from "react";

/** this sorts individual CI identifiers */
const filterByColourIndentity = (card: Card) => card.color_identity.sort(compareColourIdentities);

const chartifyForColourChart = (
  cardData: Card[],
  seriesLabel: string,
  searchFn: (
    cards: Card[],
    mapFn: (card: Card) => string | string[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => any
) => {
  const colourIdentities = searchFn(cardData, filterByColourIndentity);
  const sortedColourIdentities = sortColourIdentities(colourIdentities as string[][])
  const analysis = analyseColourIdentities(sortedColourIdentities)

  return {
    label: seriesLabel,
    data: Object.values(analysis).concat(),
  }
};

const seriesDataExists = (series: BarChartProps["series"], label: string) => {
  return series.find(seriesData => seriesData.label === label)
};

export const ColourAnalysisStep: React.FC<AnalysisStepProps> = ({ ...props }) => {
  /** todo: check whether all are needed */
  const { cardData, cubeCobraID } = props;

  const [series, setSeries] = useState<BarChartProps["series"]>([])

  const handleFetchAllAnalysis = () => {
    /** Legendary creatures */
    const legendaryColourIdentities = searchByTypeLine(
      cardData,
      'Legendary Creature',
      filterByColourIndentity
    );
    const sortedLegendaryColourIdentities = sortColourIdentities(legendaryColourIdentities as string[][]);
    const chartdataLegendaries = {
      label: 'Legendary creatures',
      data: Object.values(analyseColourIdentities(sortedLegendaryColourIdentities)).concat(),
    }

    /** Other commander types */
    const chartdataPWCommanders = chartifyForColourChart(cardData, 'Planeswalker commanders', searchPlaneswalkerCommanders)
    const chartdataUniquePartnerPairings = chartifyForColourChart(cardData, 'Unique partner pairings', searchUniquePartnerPairings);
    const chartdataUniqueFriendsForeverPairings = chartifyForColourChart(cardData, 'Unique Friends Forever pairings', searchUniqueFriendsForeverPairings);
    const chartdataPartnerWithPairings = chartifyForColourChart(cardData, 'Partner With pairings', searchPartnerWithPairings);
    const chartdataDoctorCompanionPairings = chartifyForColourChart(cardData, 'Doctor\'s companion pairings', searchDoctorCompanionPairings);
    const chartdataBackgroundPairings = chartifyForColourChart(cardData, 'Background pairings', searchBackgroundPairings);

    if (Object.keys(chartdataLegendaries.data).length && !seriesDataExists(series, chartdataLegendaries.label)) {
      setSeries(series => [
        ...series,
        chartdataLegendaries
      ]);
    };
    if (Object.keys(chartdataPWCommanders.data).length && !seriesDataExists(series, chartdataPWCommanders.label)) {
      setSeries(series => [
        ...series,
        chartdataPWCommanders
      ]);
    };
    if (Object.keys(chartdataUniquePartnerPairings.data).length && !seriesDataExists(series, chartdataUniquePartnerPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataUniquePartnerPairings
      ]);
    };
    if (Object.keys(chartdataUniqueFriendsForeverPairings.data).length && !seriesDataExists(series, chartdataUniqueFriendsForeverPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataUniqueFriendsForeverPairings
      ]);
    };
    if (Object.keys(chartdataPartnerWithPairings.data).length && !seriesDataExists(series, chartdataPartnerWithPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataPartnerWithPairings
      ]);
    };
    if (Object.keys(chartdataDoctorCompanionPairings.data).length && !seriesDataExists(series, chartdataDoctorCompanionPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataDoctorCompanionPairings
      ]);
    };
    if (Object.keys(chartdataBackgroundPairings.data).length && !seriesDataExists(series, chartdataBackgroundPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataBackgroundPairings
      ]);
    };
  };

  const xAxisData = Object.values(ciNicknameDictionary);
  const generateBarLabel = (item: BarItem) => {
    return item.value?.toString();
  };

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