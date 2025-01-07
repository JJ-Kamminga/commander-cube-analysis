import { getRandomId } from "@/utils/helpers";
import { Card as MagicCard } from "@/utils/mtg-scripting-toolkit/scryfall";
import { Button, Divider, Drawer, List, ListItem } from "@mui/material";
import { useState } from "react";

type AnalysisStepCardListProps = {
  cardNames: string[] | string[][],
};

export const AnalysisStepCardList: React.FC<AnalysisStepCardListProps> = ({ cardNames }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpenState: boolean) => () => {
    setDrawerOpen(newOpenState);
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>See card names</Button>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)} anchor='right'>
        <List >
          {cardNames.map((card, index) => {
            const cardName = Array.isArray(card)
              ? card.map((card) => card).join(' + ')
              : card
            const indexLabel = index < 9 ? `0${index + 1}` : index + 1
            return (
              <>
                <ListItem key={cardName + getRandomId()}>
                  <span style={{ marginRight: '5px' }}>{indexLabel}. </span> {cardName}
                </ListItem>
                <Divider variant="middle" aria-hidden={true} />
              </>
            )
          })}
        </List>
      </Drawer>

    </>
  )
};