import { getRandomId } from "@/utils/helpers";
import { Card as MagicCard } from "@/utils/mtg-scripting-toolkit/scryfall";
import { Close } from "@mui/icons-material";
import { Button, Chip, Container, Divider, Drawer, List, ListItem } from "@mui/material";
import { useState } from "react";

type AnalysisStepCardListProps = {
  cardNames: string[] | string[][],
};

export const AnalysisStepCardList: React.FC<AnalysisStepCardListProps> = ({ cardNames }) => {
  return (
    <>
      {Array.isArray(cardNames[0]) ? (
        <>
          {cardNames.map((pairArray) => (
            /** @ts-expect-error: we control the value and know it is not a string */
            <li key={[...pairArray]}>{pairArray.map((card: MagicCard) => card).join(' + ')}</li>
          ))}
        </>
      ) : (
        <ol>{cardNames.map(cardName => <li key={cardName + getRandomId()}>{cardName} </li>)}</ol>
      )
      }
    </>
  )
};

export const AnalysisStepCardListDrawer: React.FC<AnalysisStepCardListProps> = ({ cardNames }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpenState: boolean) => () => {
    setDrawerOpen(newOpenState);
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)} variant="outlined" sx={{ margin: '2px' }}>See all card names</Button>
      {cardNames.length > 1500 ? <Chip color="warning" sx={{ margin: '5px' }} label={`This will load ${cardNames.length} pairings, may take a few seconds`} /> : <></>}
      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)} anchor='right'>
        <Container>
          <Button sx={{ float: 'right', top: '10px' }} onClick={toggleDrawer(false)} aria-label="close drawer"><Close color="primary" /></Button>
        </Container>
        <List >
          {cardNames.map((card, index) => {
            const cardName = Array.isArray(card)
              ? card.map((card) => card).join(' + ')
              : card
            const indexLabel = index < 9 ? `0${index + 1}` : index + 1
            return (
              <div key={cardName + getRandomId()}>
                <ListItem>
                  <span style={{ marginRight: '5px' }}>{indexLabel}. </span> {cardName}
                </ListItem>
                <Divider variant="middle" aria-hidden={true} />
              </div>
            )
          })}
        </List>
      </Drawer >
    </>
  )
};