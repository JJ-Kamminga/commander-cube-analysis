'use client';

import { fetchCollection } from '@/utils/mtg-scripting-toolkit/scryfall/fetchCollection';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, ButtonGroup, Card, CardContent, CircularProgress, List, ListItem, StepContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { initialAnalysisObject, searchBackgroundPairings, searchByTypeLine, searchDoctorCompanionPairings, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings } from '@/utils/analysis';
import { Analysis } from '@/utils/types';
import { autocompleteOptions, stepsConfig } from './config';
import { fetchCubeList } from '@/utils/mtg-scripting-toolkit/cube-cobra';
import { Card as MagicCard } from '@/utils/mtg-scripting-toolkit/scryfall';
import { Info } from '@mui/icons-material';
import { getRandomId } from '@/utils/helpers';
import { AnalysisStep } from '../Analysis/AnalysisStep';
import { DraftConfigControlPanel } from '../DraftConfigControlPanel/DraftConfigControlPanel';

export const CubeListForm: React.FC = () => {
  /** UI State */
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  /** Data State */
  const [cubeList, setCubeList] = useState<string[]>([]);
  const [cubeCobraID, setCubeCobraID] = useState<string>('');
  const [cardData, setCardData] = useState<MagicCard[]>([]);
  const [analysis, setAnalysis] = useState<Analysis>(initialAnalysisObject);
  /** Config State */
  const [playerCount, setPlayerCount] = useState<number>(8);
  const [packsPerPlayer, setPacksPerPlayer] = useState<number>(3);
  const [cardsPerPack, seCardsPerPack] = useState<number>(20);

  /** Other */
  const [errorLog, setErrorLog] = useState<string[]>([]);

  const handleStepNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    localStorage.setItem('active-step', JSON.stringify(activeStep + 1));
  };

  const handleStepBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    localStorage.setItem('active-step', JSON.stringify(activeStep - 1));
  };

  const handleStepReset = () => {
    setActiveStep(0);
    localStorage.setItem('active-step', JSON.stringify(0));
  };

  const handleFetchLegendaryWithExistingData = () => {
    handleStepNext();
    handleFetchLegendaryAnalysis();
  };

  useEffect(() => {
    const fetchCubeList = async () => {
      const storedData = localStorage.getItem('latest-list');
      if (storedData) {
        setCubeList(JSON.parse(storedData));
      }
    };
    const fetchCubeCobraID = async () => {
      const storedData = localStorage.getItem('cube-cobra-id');
      if (storedData) {
        setCubeCobraID(JSON.parse(storedData));
      }
    }
    const fetchCardData = async () => {
      const storedData = localStorage.getItem('card-data');
      if (storedData) {
        setCardData(JSON.parse(storedData));
      }
    };
    const fetchActiveStep = async () => {
      const storedData = localStorage.getItem('active-step');
      if (storedData) {
        setActiveStep(JSON.parse(storedData));
      } else {
        setActiveStep(0);
        localStorage.setItem('active-step', '0');
      };
    };
    const fetchAnalysis = async () => {
      const activeStepFromLS = localStorage.getItem('active-step');
      if (activeStepFromLS !== '2') return;

      const storedData = localStorage.getItem('analysis');
      if (storedData) {
        setAnalysis(JSON.parse(storedData));
      }
    };
    fetchActiveStep();
    fetchCubeList();
    fetchCubeCobraID();
    fetchCardData();
    fetchAnalysis();
  }, []);

  const handleFetchCardData = async () => {
    if (!cubeList.length) return;
    setLoading(true);
    setAnalysis(initialAnalysisObject);
    /** todo: trycatch here */
    const collectionCards = await fetchCollection([
      ...cubeList
    ]);
    if (collectionCards.error) {
      setErrorLog((errorLog) => [...errorLog, `${collectionCards.error}`]
      );
    };
    if (collectionCards.notFound?.length) {
      setErrorLog(errorLog => [
        ...errorLog,
        collectionCards.notFound ? `${collectionCards.notFound.length} cards not found: ` : 'collectionCards.notFound.map(card => card.name)',
      ])
    };
    setLoading(false);

    setCardData(collectionCards.cards);
    localStorage.setItem('card-data', JSON.stringify(collectionCards.cards));


    if (!collectionCards.error && !collectionCards.notFound?.length) {
      handleFetchLegendaryAnalysis();
    } else {
      setErrorLog(errorLog => [...errorLog, 'Error fetching card data from Scryfall.']);
    }
  };

  interface FormElements extends HTMLFormControlsCollection {
    cubeCobraInput: HTMLInputElement
  }
  interface CubeCobraFormElement extends HTMLFormElement {
    readonly elements: FormElements
  }

  const handleCubeCobraSubmit = async (event: React.FormEvent<CubeCobraFormElement>) => {
    event.preventDefault();

    setCubeCobraID('');
    setCubeList([]);
    localStorage.setItem('latest-list', JSON.stringify([]));
    setCardData([]);
    localStorage.removeItem('card-data');

    const cubeID = event.currentTarget.elements["cubeCobraInput"].value;

    if (typeof cubeID !== 'string' || cubeID.length > 50 || cubeID.length === 0) {
      setErrorLog(errorLog => [...errorLog, 'Cube ID length error']);
      return;
    };

    setLoading(true);
    let cardNames: string[] = [];
    try {
      cardNames = await fetchCubeList(cubeID);
      if (cardNames?.length) {
        updateCubeCobraID(cubeID);
        updateCubeList(cardNames);
        handleStepNext();
      } else {
        setErrorLog(errorLog => [...errorLog, 'Cube must contain cards.']);
      };
    } catch (error) {
      setErrorLog(errorLog => [...errorLog, 'Error fetching cube list from Cube Cobra: ' + error]);
    } finally {
      setLoading(false);
    };
  };

  const handleFetchLegendaryAnalysis = () => {
    const legendaries = searchByTypeLine(cardData, 'Legendary Creature');
    const planeswalkers = searchPlaneswalkerCommanders(cardData);
    const uniquePartnerPairings = searchUniquePartnerPairings(cardData);
    const partnerWithPairings = searchPartnerWithPairings(cardData);
    const friendsForeverPairings = searchUniqueFriendsForeverPairings(cardData);
    const doctorCompanionPairings = searchDoctorCompanionPairings(cardData);
    const backgroundPairings = searchBackgroundPairings(cardData);

    setAnalysis((analysis) => {
      return {
        ...analysis,
        legendaryCreatures: {
          ...analysis.legendaryCreatures,
          cardNames: legendaries,
        },
        planeswalkerCommanders: {
          ...analysis.planeswalkerCommanders,
          cardNames: planeswalkers,
        },
        partners: {
          ...analysis.partners,
          cardNames: uniquePartnerPairings
        },
        partnerWiths: {
          ...analysis.partnerWiths,
          cardNames: partnerWithPairings
        },
        friendsForever: {
          ...analysis.friendsForever,
          cardNames: friendsForeverPairings
        },
        backgroundPairings: {
          ...analysis.backgroundPairings,
          cardNames: backgroundPairings
        },
        doctorPartners: {
          ...analysis.doctorPartners,
          cardNames: doctorCompanionPairings
        },
      }
    });
    if (analysis !== initialAnalysisObject) {
      localStorage.setItem('analysis', JSON.stringify(analysis));
    };
  };

  const updateCubeList = (newData: string[]) => {
    setCubeList(newData);
    localStorage.setItem('latest-list', JSON.stringify(newData));
  };

  const updateCubeCobraID = (newID: string) => {
    setCubeCobraID(newID);
    localStorage.setItem('cube-cobra-id', JSON.stringify(newID));
  };

  return (
    <>
      <h2>Commander analysis</h2>
      {activeStep !== 0 && (
        <Button variant='outlined' onClick={handleStepReset} sx={{ mt: 1, mr: 1 }}>
          Back to step 1
        </Button>
      )}
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key='cubeListInput'>
          <StepLabel>{stepsConfig[0].label}</StepLabel>
          <StepContent>
            <form name='cubeCobraInput' onSubmit={handleCubeCobraSubmit}>
              <label htmlFor='cubeCobraInput'>Enter a CubeCobra Cube ID:</label><br />
              <p>Note that maybeboards will be ignored.</p>
              <Autocomplete
                id='cubeCobraInput'
                freeSolo
                options={autocompleteOptions}
                disabled={isLoading}
                defaultValue={cubeCobraID}
                sx={{ margin: 2 }}
                renderInput={(params) => <TextField {...params} required label="Cube ID" />}
              /><br />
              <Button
                variant='outlined'
                type='submit'
                disabled={isLoading}
              >
                Submit
              </Button>
              {cubeCobraID && !isLoading
                ? (
                  <Button variant='outlined' sx={{ margin: 2 }} disabled={!cubeCobraID || isLoading} onClick={handleStepNext}>
                    Continue with saved list: {cubeCobraID}
                  </Button>)
                : (<></>)
              }
              {isLoading && (<CircularProgress />)}
            </form>
          </StepContent>
        </Step>
        <Step key='fetch-card-data'>
          <StepLabel>{stepsConfig[1].label}</StepLabel>
          <StepContent>
            <Card>
              <CardContent>
                <Info /><span> Found the following cube data on Cube Cobra ({cubeList.length} cards).</span>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                  >
                    <span>Expand to view cards</span>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* <Typography> */}
                    <List>
                      {cubeList.map((card) => (
                        <ListItem key={card + getRandomId()}>{card}</ListItem>
                      ))}
                    </List>
                    {/* </Typography> */}
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
            <p>
              {!cubeList.length
                ? (<>Enter a cube list to fetch card data for.</>)
                : cardData.length
                  ? (<>Data succesfully fetched.</>)
                  : (<>To continue, fetch the full card data from Scryfall (may take up to 20 seconds).</>)
              }
            </p>
            <ButtonGroup>
              <Button variant='outlined' onClick={handleFetchCardData} disabled={!cubeList.length || isLoading || cardData.length == cubeList.length}>
                {cardData.length ? '(Re)' : <></>}fetch card data.
              </Button>

            </ButtonGroup>
            {isLoading && (
              <CircularProgress />
            )}
            {cardData.length
              ? (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ArrowDownwardIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">Full Cube List ({cardData.length} cards)</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Card data courtesy of Scryfall.
                    </Typography>
                    <TableContainer>
                      {
                        isLoading
                          ? (<CircularProgress />)
                          : (
                            <section>
                              {
                                cardData.length ? (
                                  <Table>
                                    <TableHead>
                                      <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Oracle text</TableCell>
                                        <TableCell>Colors</TableCell>
                                        <TableCell>Color identity</TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>{cardData.map((card) => {
                                      return (
                                        <TableRow key={card.id + getRandomId()}>
                                          <TableCell>{card.name}</TableCell>
                                          <TableCell>{card.type_line}</TableCell>
                                          <TableCell>{card.card_faces
                                            ? card.card_faces.map(face => face.oracle_text).join(' // ')
                                            : card.oracle_text
                                          }
                                          </TableCell>
                                          <TableCell>{card.colors}</TableCell>
                                          <TableCell>{card.color_identity}</TableCell>
                                        </TableRow>
                                      )
                                    })}</TableBody>
                                  </Table>
                                ) : (<></>)
                              }
                            </section>
                          )
                      }
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>)
              : (<></>)
            }
            <p>
              <Button
                variant='outlined'
                onClick={handleStepBack}
              >
                Back
              </Button>
              <Button
                variant='outlined'
                disabled={!cardData.length}
                onClick={handleFetchLegendaryWithExistingData}
              >
                Continue
              </Button>
            </p>
          </StepContent>
        </Step >
        <Step key='draft-configuration'>
          <StepLabel>{stepsConfig[2].label}</StepLabel>
          <StepContent>
            <DraftConfigControlPanel
              playerCount={playerCount}
              packsPerPlayer={packsPerPlayer}
              cardsPerPack={cardsPerPack}
              totalCubeCount={cardData.length}
              onPlayerCountChange={setPlayerCount}
              onPacksPerPlayerChange={setPacksPerPlayer}
              onCardsPerPackChange={seCardsPerPack}
            />
            <Button
              variant='outlined'
              onClick={handleStepBack}
            >
              Back
            </Button>
            <Button
              variant='outlined'
              disabled={!cardData.length}
              onClick={handleFetchLegendaryWithExistingData}
            >
              Continue
            </Button>
          </StepContent>
        </Step>
        <Step key='legendary-analysis'>
          <StepLabel>{stepsConfig[3].label}</StepLabel>
          <StepContent>
            <AnalysisStep
              analysis={analysis}
              totalCubeCount={cardData.length}
              cubeCobraID={cubeCobraID}
              playerCount={playerCount}
              packsPerPlayer={packsPerPlayer}
              cardsPerPack={cardsPerPack}
            />
            {
              cardData.length && activeStep == 3
                ? (<>
                  <Card >
                    <CardContent>
                      <h3>Actions</h3>
                      <p>Analysis is done on your device, and results will be lost on page reload. Click here to retrigger the analysis with previously submitted cube.</p>
                      <Button sx={{ margin: '2' }} variant='outlined' onClick={handleFetchLegendaryAnalysis} disabled={isLoading}>
                        Retrigger analysis
                      </Button>
                      {isLoading ? (<CircularProgress />) : <></>}
                    </CardContent>
                  </Card>
                </>)
                : (<></>)
            }
            <p>
              <Button
                variant='outlined'
                onClick={handleStepBack}
              >
                Back
              </Button>
            </p>
          </StepContent>
        </Step>
        {errorLog.length > 0 ? (
          <section>
            <h2>Log</h2>
            <p>Debugging information will appear here.</p>
            <ul>
              {errorLog.map((error) => (
                <li key={error.substring(0, 10)}>{error}</li>
              ))}
            </ul>
          </section>
        ) : <></>}
      </Stepper >
    </>
  )
}