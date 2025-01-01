'use client';

import { fetchCollection } from '@/utils/mtg-scripting-toolkit/fetchCollection';
import { Card } from '@/utils/mtg-scripting-toolkit/types';
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, CircularProgress, List, ListItem, Paper, StepContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { parseList } from '@/utils/mtg-scripting-toolkit/listHelpers';
import { initialAnalysisObject, searchByTypeLine, searchPlaneswalkerCommanders, searchUniquePartnerPairings } from '@/utils/analysis';
import { Analysis } from '@/utils/types';

export const CubeListForm: React.FC = () => {
  const [cubeList, setCubeList] = useState<string[]>([]);
  const [errorLog, setErrorLog] = useState<string[]>([]);
  const [cardData, setCardData] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [analysis, setAnalysis] = useState<Analysis>(initialAnalysisObject);

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
    fetchCubeList();
    fetchCardData();
    fetchActiveStep();
  }, []);

  const handleFetchCardData = async () => {
    if (!cubeList.length) return;
    setLoading(true);
    const collectionCards = await fetchCollection([
      ...cubeList
    ]);
    setLoading(false);

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

    setCardData(collectionCards.cards);
    localStorage.setItem('card-data', JSON.stringify(collectionCards.cards));
    console.log(cardData);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cubeList = parseList(event.target.elements["cube-list-input"].value);
    console.log(cubeList);
    setCubeList(cubeList => cubeList);
    setCardData([]);
    localStorage.removeItem('card-data');
    updateData(cubeList);
    cubeList.length && handleStepNext();
  }

  const handleFetchLegendaryAnalysis = () => {

    const legendaries = searchByTypeLine(cardData, 'Legendary Creature');
    const planeswalkers = searchPlaneswalkerCommanders(cardData);
    const uniquePartnerPairs = searchUniquePartnerPairings(cardData);
    console.log(uniquePartnerPairs)
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
          cardNames: uniquePartnerPairs
        }
      }
    })
  };

  const updateData = (newData: string[]) => {
    setCubeList(newData);
    localStorage.setItem('latest-list', JSON.stringify(newData)); // Update stored data
  };

  const steps = [
    {
      label: 'Input cube list',
    },
    {
      label: 'Fetch data from Scryfall',
    },
    {
      label: 'Commander analysis'
    }
  ]

  return (
    <>
      {activeStep !== 0 && (
        <Button variant='outlined' onClick={handleStepReset} sx={{ mt: 1, mr: 1 }}>
          Back to step 1
        </Button>
      )}
      <Stepper activeStep={activeStep} orientation="vertical">
        <Step key='cube-list-input'>
          <StepLabel>{steps[0].label}</StepLabel>
          <StepContent>
            <form name="cube list input" onSubmit={handleSubmit}>
              <label htmlFor="cube-list-input">Paste in cube list</label><br />
              <textarea id="cube-list-input" rows={25} defaultValue={cubeList.join('\n')} /><br />
              <Button variant='outlined' type="submit" disabled={loading}>Submit</Button>
            </form>
            <ButtonGroup>
              {
                cubeList.length
                  ? (
                    <Button
                      onClick={handleStepNext}
                    >
                      Continue with existing list
                    </Button>
                  )
                  : (<>Please submit a list to continue</>)
              }
            </ButtonGroup>
            <br />
          </StepContent>
        </Step>
        <Step key='fetch-card-data'>
          <StepLabel>{steps[1].label}</StepLabel>
          <StepContent>
            <p>
              {!cubeList.length
                ? (<>Enter a cube list to fetch card data for.</>)
                : cardData.length
                  ? (<>Submitted a new list? Click to refetch data.</>)
                  : (<>Click to fetch card data.</>)
              }
            </p>
            <ButtonGroup>
              <Button onClick={handleFetchCardData} disabled={!cubeList.length || loading}>(Re)fetch card data.</Button>
              {cardData.length && (
                <Button
                  onClick={handleStepNext}
                >
                  Continue with existing data
                </Button>
              )}
            </ButtonGroup>
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
                    loading
                      ? (<CircularProgress />)
                      : (
                        <>
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
                        </>
                      )
                  }
                </TableContainer>
              </AccordionDetails>
            </Accordion>
            <Button
              onClick={handleStepBack}
              sx={{ mt: 1, mr: 1 }}
            >
              Back
            </Button>
          </StepContent>
        </Step >
        <Step key='legendary-analysis'>
          <StepLabel>{steps[2].label}</StepLabel>
          <StepContent>
            <Button onClick={handleFetchLegendaryAnalysis}>
              Fetch
            </Button>
            <List>
              {Object.entries(analysis).map((commander) => {
                const data = commander[1];
                return (
                  <li key={data.id}>
                    <label>
                      <h4>{data.cardNames.length || '?'} {data.labelHeading}</h4>
                      <span>{data.labelDescription}</span>
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
                    </label>
                  </li>
                )
              })}
            </List>
            <Button
              onClick={handleStepBack}
              sx={{ mt: 1, mr: 1 }}
            >
              Back
            </Button>
          </StepContent>
        </Step>
        <section>
          <h2>Log</h2>
          <ul>
            {errorLog.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </section>
      </Stepper >
    </>
  )
}