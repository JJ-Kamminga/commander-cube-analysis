import { searchBackgroundPairings, searchDoctorCompanionPairings, searchLegendaryCreatures, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings } from "@/utils/analysis";
import { AnalysisStepProps } from "./types";
import { BarChart, BarChartProps, BarItem } from "@mui/x-charts";
import { Card as MagicCard } from "@/utils/mtg-scripting-toolkit/scryfall";
import { Button, Card, CardContent, Chip, CircularProgress, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { analyseColourIdentities, ciNicknameDictionary, colourOrderStrings, queryColourIdentities, queryPairingColourIdentities, sortColourIdentities } from "@/utils/colours";

const generateBarLabel = (item: BarItem) => item.value?.toString();
const seriesDataExists = (series: BarChartProps["series"], label: string) => {
  return series.find(seriesData => seriesData.label === label)
};
const seriesHasData = (series: number[]) => series.some(value => value !== 0);

const chartifyPairings = (
  cardData: MagicCard[],
  seriesLabel: string,
  searchFn: (cards: MagicCard[]) => string[][]
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

export const ColourAnalysisStep: React.FC<AnalysisStepProps> = ({ ...props }) => {
  const { cardData, cubeCobraID } = props;

  const [series, setSeries] = useState<BarChartProps["series"]>([])
  const [hasAnalysisLoaded, setHasAnalysisLoaded] = useState<boolean>(false);

  const xAxisData = colourOrderStrings.map(ci => ciNicknameDictionary[ci]);

  const handleClearAnalysis = () => {
    setSeries([])
  };

  const handleFetchAllAnalysis = () => {
    setHasAnalysisLoaded(false);
    handleClearAnalysis();

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

    console.log('has data', seriesHasData(chartdataLegendaries.data));

    if (seriesHasData(chartdataLegendaries.data) && !seriesDataExists(series, chartdataLegendaries.label)) {
      setSeries(series => [
        ...series,
        chartdataLegendaries
      ]);
    };
    if (seriesHasData(chartdataPWCommanders.data) && !seriesDataExists(series, chartdataPWCommanders.label)) {
      setSeries(series => [
        ...series,
        chartdataPWCommanders
      ]);
    };
    if (seriesHasData(chartdataUniquePartnerPairings.data) && !seriesDataExists(series, chartdataUniquePartnerPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataUniquePartnerPairings
      ]);
    };
    if (seriesHasData(chartdataUniqueFriendsForeverPairings.data) && !seriesDataExists(series, chartdataUniqueFriendsForeverPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataUniqueFriendsForeverPairings
      ]);
    };
    if (seriesHasData(chartdataPartnerWithPairings.data) && !seriesDataExists(series, chartdataPartnerWithPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataPartnerWithPairings
      ]);
    };
    if (seriesHasData(chartdataDoctorCompanionPairings.data) && !seriesDataExists(series, chartdataDoctorCompanionPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataDoctorCompanionPairings
      ]);
    };
    if (seriesHasData(chartdataBackgroundPairings.data) && !seriesDataExists(series, chartdataBackgroundPairings.label)) {
      setSeries(series => [
        ...series,
        chartdataBackgroundPairings
      ]);
    };
    setHasAnalysisLoaded(true);
  };

  useEffect(() => {
    if (!hasAnalysisLoaded) {
      setTimeout(handleFetchAllAnalysis, 2000)
    }
  });

  return (
    <>
      <div id="colour-analysis-heading">
        <h3>Colour analysis</h3>
      </div>
      <p>
        Your cube {cubeCobraID} contains the following distribution of colour identities.
      </p>
      <p>
        {hasAnalysisLoaded
          ?
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
          : <CircularProgress />
        }
        {hasAnalysisLoaded &&
          <>
            <Typography padding={3}><Chip color="warning" label='Please note!' /> Custom rules have not yet been implemented for colour analysis, and so are not counted in these statistics.
            </Typography>
            <Typography padding={3}><Chip color="warning" label='Please note!' /><b> There may be overlap between categories</b>:
              Legendary creatures or Planeswalker that are part of a pair (Partner, Background, etc.) are counted individually too.
            </Typography>
            <Card>
              <CardContent>

                <h3>Actions</h3>
                <p>Click here to clear your analysis.</p>
                <Button variant="outlined" onClick={handleClearAnalysis}>Clear</Button>
                <p>Analysis is done on your device, and results may be lost on page reload. Click here to retrigger the analysis with previously submitted cube.</p>
                <Button sx={{ margin: '2' }} variant='outlined' onClick={handleFetchAllAnalysis}>
                  Retrigger analysis
                </Button>
              </CardContent>
            </Card>
          </>
        }
      </p >
    </>
  )
};