'use client';

import { fetchCollection } from '@/utils/mtg-scripting-toolkit/scryfall/fetchCollection';
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Card, CardContent, CircularProgress, List, ListItem, StepContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { initialAnalysisObject, searchBackgroundPairings, searchByTypeLine, searchDoctorCompanionPairings, searchPartnerWithPairings, searchPlaneswalkerCommanders, searchUniqueFriendsForeverPairings, searchUniquePartnerPairings } from '@/utils/analysis';
import { Analysis } from '@/utils/types';
import { stepsConfig } from './config';
import { fetchCubeList } from '@/utils/mtg-scripting-toolkit/cube-cobra';
import { Card as MagicCard } from '@/utils/mtg-scripting-toolkit/scryfall';

export const CubeListForm: React.FC = () => {
  const [cubeList, setCubeList] = useState<string[]>([]);
  const [errorLog, setErrorLog] = useState<string[]>([]);
  const [cardData, setCardData] = useState<MagicCard[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [analysis, setAnalysis] = useState<Analysis>(initialAnalysisObject);
  const [cubeCobraID, setCubeCobraID] = useState<string>('');

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
    fetchActiveStep();
    fetchCubeList();
    fetchCardData();
  }, []);

  const handleFetchCardData = async () => {
    if (!cubeList.length) return;
    setLoading(true);
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
      console.log('just before call')
      handleStepNext();
      handleFetchLegendaryAnalysis();
    } else {
      setErrorLog(errorLog => [...errorLog, 'Error fetching card data from Scryfall.']);
    }
  };

  interface FormElements extends HTMLFormControlsCollection {
    cubeListInput: HTMLInputElement
    cubeCobraInput: HTMLInputElement
  }
  interface CubeCobraFormElement extends HTMLFormElement {
    readonly elements: FormElements
  }

  const handleCubeCobraSubmit = async (event: React.FormEvent<CubeCobraFormElement>) => {
    event.preventDefault();

    setCubeList([]);
    localStorage.setItem('latest-list', JSON.stringify([]));
    setCardData([]);
    localStorage.removeItem('card-data');
    setCubeCobraID('');

    const cubeID = event.currentTarget.elements["cubeCobraInput"].value;

    if (cubeID.length > 50 || cubeID.length === 0) {
      setErrorLog(errorLog => [...errorLog, 'Cube ID length error']);
      return;
    };

    setLoading(true);
    let cardNames: string[] = [];
    try {
      cardNames = await fetchCubeList(cubeID);
      if (cardNames?.length) {
        setCubeCobraID(cubeID);
        updateCubeList(cardNames);
        handleStepNext();
      } else {
        setErrorLog(errorLog => [...errorLog, 'Cube must contain cards.']);
      };
    } catch (error) {
      setErrorLog(errorLog => [...errorLog, 'Error fetching cube list from Cube Cobra.']);
    } finally {
      setLoading(false);
    };
  };

  const handleFetchLegendaryAnalysis = () => {
    setLoading(true)
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
    setLoading(false);
  };

  const updateCubeList = (newData: string[]) => {
    setCubeList(newData);
    localStorage.setItem('latest-list', JSON.stringify(newData)); // Update stored data
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
            {/* <form name="cube list input" onSubmit={handleSubmit}>
              <label htmlFor="cubeListInput">Paste in cube list</label><br />
              <textarea required id="cubeListInput" rows={25} defaultValue={cubeList.join('\n')} /><br />
              <Button variant='outlined' type="submit" disabled={isLoading}>Submit</Button>
            </form> */}
            <form name='cubeCobraInput' onSubmit={handleCubeCobraSubmit}>
              <label htmlFor='cubeCobraInput'>Enter a CubeCobra Cube ID:</label><br />
              <p>Note that maybeboards will be ignored.</p>
              <TextField
                id='cubeCobraInput'
                disabled={isLoading}
                required
                defaultValue={cubeCobraID}
                sx={{ margin: 2 }}
              /><br />
              {/* <ButtonGroup
                sx={{ margin: 2 }}
              > */}
              <Button
                variant='outlined'
                type='submit'
                disabled={isLoading}
              >
                Submit
              </Button>
              {cubeCobraID && !isLoading
                ? (
                  <Button variant='outlined' sx={{ margin: 2 }} disabled={!cubeCobraID || isLoading} onClick={handleStepNext}>Continue with saved list: {cubeCobraID}</Button>
                )
                : (
                  <></>
                )
              }
              {/* </ButtonGroup> */}
              {
                isLoading && (
                  <CircularProgress />
                )
              }
            </form>
            <ButtonGroup>
              {/* {
                cubeList.length
                  ? (
                    <Button
                      onClick={handleStepNext}
                    >
                      Continue with existing list
                    </Button>
                  )
                  : (<>Please submit a list to continue</>)
              } */}
            </ButtonGroup>
            <br />
          </StepContent>
        </Step>
        <Step key='fetch-card-data'>
          <StepLabel>{stepsConfig[1].label}</StepLabel>
          <StepContent>
            <p>Found the following cube data on Cube Cobra ({cubeList.length} cards).</p>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
              >
                <span>Expand to view cards</span>
              </AccordionSummary>
              <AccordionDetails>
                {/* <Typography> */}
                <List>
                  {cubeList.map((card, index) => (
                    <ListItem key={`${card}-${index}`}>{card}</ListItem>
                  ))}
                </List>
                {/* </Typography> */}
              </AccordionDetails>
            </Accordion>
            <p>
              {!cubeList.length
                ? (<>Enter a cube list to fetch card data for.</>)
                : cardData.length
                  ? (<>Submitted a new list? Click to refetch data.</>)
                  : (<>Click to fetch full card data from Scryfall (will take about 5-10 seconds).</>)
              }
            </p>
            <ButtonGroup>
              <Button variant='outlined' onClick={handleFetchCardData} disabled={!cubeList.length || isLoading}>
                {cardData.length ? '(Re)' : <></>}fetch card data.
              </Button>
              {cardData.length && (
                <Button
                  variant='outlined'
                  onClick={handleFetchLegendaryWithExistingData}
                >
                  Continue with existing data
                </Button>
              )}
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
                                    <TableBody>{cardData.map((card, index) => {
                                      return (
                                        <TableRow key={`${card.id}-${index}`}>
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
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </p>
          </StepContent>
        </Step >
        <Step key='legendary-analysis'>
          <StepLabel>{stepsConfig[2].label}</StepLabel>
          <StepContent>
            <h3>Your cube contains:</h3>
            <List>
              {Object.entries(analysis).map((commander) => {
                const data = commander[1];
                return (
                  <li key={data.id}>
                    <label>
                      <h4>{data.cardNames.length || '0'} {data.labelHeading}</h4>
                      <span>{data.labelDescription}</span>
                      {
                        data.cardNames.length ? (
                          <Accordion>
                            <AccordionSummary>Click to see card names</AccordionSummary>
                            <AccordionDetails>
                              <List>
                                {data.cardNames.map((card, index) => {
                                  return (
                                    <ListItem key={`${data.id}-${index}`}>
                                      <Typography>
                                        {
                                          Array.isArray(card)
                                            ? card.map((card) => card.name).join(' + ')
                                            : card.name
                                        }
                                      </Typography>
                                    </ListItem>
                                  )
                                })}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        )
                          : (<></>)
                      }
                    </label>
                  </li>
                )
              })}
            </List>
            {
              cardData.length && activeStep == 2
                ? (<Card>
                  <CardContent><p>Analysis is done on your device, and results will be lost on reload. Click here to retrigger the analysis.</p>
                    <Button sx={{ margin: '2' }} variant='outlined' onClick={handleFetchLegendaryAnalysis}>
                      Retrigger analysis
                    </Button>
                  </CardContent>
                </Card>)
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
              {errorLog.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </section>
        ) : <></>}
      </Stepper >
    </>
  )
}