'use client';

import { fetchCollection } from '@/utils/mtg-scripting-toolkit/scryfall/fetchCollection';
import { Autocomplete, Button, CircularProgress, StepContent, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { autocompleteOptions, stepsConfig } from './config';
import { fetchCubeList } from '@/utils/mtg-scripting-toolkit/cube-cobra';
import { Card as MagicCard } from '@/utils/mtg-scripting-toolkit/scryfall';
import { AnalysisStep } from '../Analysis/AnalysisStep';
import { DraftConfigControlPanel } from '../DraftConfigControlPanel/DraftConfigControlPanel';
import { FetchCardDataStep } from '../FetchCardDataStep/FetchCardDataStep';

export const CubeListForm: React.FC = () => {
  /** UI State */
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(false);
  /** Data State */
  const [cubeList, setCubeList] = useState<string[]>([]);
  const [cubeCobraID, setCubeCobraID] = useState<string>('');
  const [cardData, setCardData] = useState<MagicCard[]>([]);
  /** Config State */
  const [playerCount, setPlayerCount] = useState<number>(8);
  const [packsPerPlayer, setPacksPerPlayer] = useState<number>(3);
  const [cardsPerPack, seCardsPerPack] = useState<number>(20);
  /** Other */
  const [errorLog, setErrorLog] = useState<string[]>([]);

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
    fetchActiveStep();
    fetchCubeList();
    fetchCubeCobraID();
    fetchCardData();
  }, []);

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

  const fetchCardData = async () => {
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

    if (collectionCards.error || collectionCards.notFound?.length) {
      setErrorLog(errorLog => [...errorLog, 'Error fetching card data from Scryfall.']);
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
            <FetchCardDataStep
              cubeList={cubeList}
              onCardDataFetch={fetchCardData}
              isLoading={isLoading}
              cardData={cardData}
            />
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
                onClick={handleStepNext}
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
            <h3>Additional rules configuration</h3>
            <Button variant='outlined' onClick={handleStepBack}>Back</Button>
            <Button variant='outlined' disabled={!cardData.length} onClick={handleStepNext}>Continue</Button>
          </StepContent>
        </Step>
        <Step key='legendary-analysis'>
          <StepLabel>{stepsConfig[3].label}</StepLabel>
          <StepContent>
            <AnalysisStep
              cardData={cardData}
              cubeCobraID={cubeCobraID}
              playerCount={playerCount}
              packsPerPlayer={packsPerPlayer}
              cardsPerPack={cardsPerPack}
            />

            <p>
              <Button variant='outlined' onClick={handleStepBack}>Back</Button>
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