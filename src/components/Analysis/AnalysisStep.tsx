import { ExpandMore, Info } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Chip, List, ListItem, Typography } from "@mui/material";
import { Analysis } from "@/utils/types";
import { getRandomId, probabilityBothInSubset } from "@/utils/helpers";

type AnalysisProps = {
  analysis: Analysis,
  totalCubeCount: number,
  cubeCobraID: string,
  playerCount: number,
  packsPerPlayer: number,
  cardsPerPack: number,
};

export const AnalysisStep: React.FC<AnalysisProps> = ({ ...props }) => {
  const { analysis, totalCubeCount, cubeCobraID, playerCount, packsPerPlayer, cardsPerPack } = props;

  return (
    <>
      <h3>Analysis</h3>
      <Info />Analysis is done based on a draft configuration of
      <Chip color='info' label={playerCount} sx={{ margin: '5px' }
      } />
      players,
      <Chip color='info' label={packsPerPlayer} sx={{ margin: '5px' }} />
      packs per player, and
      <Chip color='info' label={cardsPerPack} sx={{ margin: '5px' }} />
      cards per pack.
      <h3>Your cube {cubeCobraID} contains:</h3>
      <List>
        {Object.entries(analysis).map((commander) => {
          const data = commander[1];
          const percentageOfCube = data.cardNames.length / totalCubeCount * 100;
          const percentageOfCubeFixedNotation = (data.cardNames.length / totalCubeCount * 100).toFixed(2);
          const draftPoolSize = playerCount * packsPerPlayer * cardsPerPack;
          const numberOfCardsOfTypeInDraftPool = Math.ceil(draftPoolSize * percentageOfCube / 100);
          const partnerWithProbability = data.id == 'partnerWiths' ? (probabilityBothInSubset(totalCubeCount, draftPoolSize) * 100).toFixed(2) : 0;
          /** maybe use this for images in the future */
          // const firstCard = Array.isArray(data.cardNames[0]) ? data.cardNames[0][0] : data.cardNames[0];
          return (
            <li key={data.id + getRandomId()}>
              <label>
                <h4 style={{ display: 'inline' }}>{data.cardNames.length || '0'} {data.labelHeading}</h4>
                {data.cardNames.length ? (
                  <>
                    <p>{data.labelDescription}</p>
                    <p>
                      {data.type == 'card'
                        ? (
                          <>
                            <Chip
                              color='primary'
                              sx={{ margin: '2px' }}
                              label={percentageOfCubeFixedNotation + '% of cube'} />
                            <Chip
                              color='primary'
                              sx={{ margin: '2px' }}
                              label={`On average, ${numberOfCardsOfTypeInDraftPool} will be opened in a ${draftPoolSize} card pool`} />
                          </>
                        )
                        : <></>
                      }
                      {data.id == 'partnerWiths' ? (
                        <>
                          <Chip
                            color='primary' sx={{ margin: '2px' }}
                            label={`${partnerWithProbability}% probability of both partners of any given pair being in a ${draftPoolSize} draft pool.`} />
                        </>
                      ) : (
                        <></>
                      )

                      }
                    </p>
                    {
                      data.cardNames.length ? (
                        <Accordion>
                          <AccordionSummary expandIcon={<ExpandMore />}>Click to see card names</AccordionSummary>
                          <AccordionDetails>
                            <List>
                              {data.cardNames.map((card) => {
                                const cardName = Array.isArray(card)
                                  ? card.map((card) => card).join(' + ')
                                  : card
                                return (
                                  <ListItem key={cardName + getRandomId()}>
                                    <Typography>
                                      {cardName}
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
                  </>
                ) : (<></>)}
              </label>
            </li>
          )
        })}
      </List >
    </ >)
};
