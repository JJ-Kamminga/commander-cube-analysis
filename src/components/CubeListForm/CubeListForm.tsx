'use client';

import { fetchCollection } from '@/app/utils/fetchCollection';
import { Card } from '@/app/utils/types';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, CircularProgress, Paper, StepContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { parseList } from '@/app/utils/listHelpers';

export const CubeListForm: React.FC = () => {
  const [cubeList, setCubeList] = useState<string[]>([]);
  const [errorLog, setErrorLog] = useState<string[]>([]);
  const [cardData, setCardData] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(JSON.parse(localStorage.getItem('active-step') || '') || 0);

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
      }
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const cubeList = parseList(event.target.elements["cube-list-input"].value);
    console.log(cubeList);
    setCubeList(cubeList => cubeList);
    updateData(cubeList);
    cubeList.length && handleStepNext();
  }

  const updateData = (newData) => {
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
      <Button variant='outlined' onClick={handleStepReset} sx={{ mt: 1, mr: 1 }}>
        Back to step 1
      </Button>
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
              <Button
                onClick={handleStepNext}
              >
                Continue with existing data
              </Button>
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
            <p>Coming soon!</p>
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