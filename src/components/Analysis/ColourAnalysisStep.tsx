import { searchBackgroundPairings, searchDoctorCompanionPairings, searchLegendaryCreatures, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings } from "@/utils/analysis";
import { AnalysisStepProps } from "./types";
import { BarChart, BarChartProps, BarItem } from "@mui/x-charts";
import { Card } from "@/utils/mtg-scripting-toolkit/scryfall";
import { Button, Chip, Container, Typography } from "@mui/material";
import { useState } from "react";
import { analyseColourIdentities, ciNicknameDictionary, colourOrderStrings, queryColourIdentities, queryPairingColourIdentities, sortColourIdentities } from "@/utils/colours";


const chartifyPairings = (
  cardData: Card[],
  seriesLabel: string,
  searchFn: (cards: Card[]) => string[][]
) => {
  const uniqueNames = searchFn(cardData);
  const uniqueColourIdentities = queryPairingColourIdentities(cardData, uniqueNames).filter(item => item !== undefined);
  const sortedUniqueColourIdentities = sortColourIdentities(uniqueColourIdentities);
  const analysedSortedUniqueColourIdentities = analyseColourIdentities(sortedUniqueColourIdentities);
  return {
    label: seriesLabel,
    data: colourOrderStrings.map((ci) => analysedSortedUniqueColourIdentities[ci] || 0)
  };
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
      data: colourOrderStrings.map((ci) => analysedsortedLegendaryColourIdentities[ci] || 0)

    };

    /** Planeswalker Commanders */
    const legendaryPWNames = searchPlaneswalkerCommanders(cardData);
    const pwCommanderColourIdentities = queryColourIdentities(cardData, legendaryPWNames).filter(item => item !== undefined);
    const sortedPWCommanderColourIdentities = sortColourIdentities(pwCommanderColourIdentities);
    const analysedSortedPWCommanderColourIdentities = analyseColourIdentities(sortedPWCommanderColourIdentities);
    const chartdataPWCommanders = {
      label: 'Planeswalker Commanders',
      data: colourOrderStrings.map((ci) => analysedSortedPWCommanderColourIdentities[ci] || 0)
    };

    /** Commander pairings */
    /** Unique partner pairings */
    const chartdataUniquePartnerPairings = chartifyPairings(cardData, 'Unique Partner Pairings', searchUniquePartnerPairings);
    const chartdataUniqueFriendsForeverPairings = chartifyPairings(cardData, 'Unique Friends Forever pairings', searchUniqueFriendsForeverPairings);
    const chartdataPartnerWithPairings = chartifyPairings(cardData, 'Partner With pairings', searchPartnerWithPairings);
    const chartdataDoctorCompanionPairings = chartifyPairings(cardData, 'Doctor\'s companion pairings', searchDoctorCompanionPairings);
    const chartdataBackgroundPairings = chartifyPairings(cardData, 'Background pairings', searchBackgroundPairings);

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
        <Typography padding={3}><Chip color="warning" label='Please note!' /> Custom rules have not yet been implemented for colour analysis, and so are not counted in these statistics.
        </Typography>
        <Typography padding={3}><Chip color="warning" label='Please note!' /><b> There may be overlap between categories</b>:
          Legendary creatures or Planeswalker that are part of a pair (Partner, Background, etc.) are counted individually too.
        </Typography>
      </p>
    </>
  )
};