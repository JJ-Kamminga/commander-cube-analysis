import { getRandomId } from "@/utils/helpers";
import { Card as MagicCard } from "@/utils/mtg-scripting-toolkit/scryfall";
import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, List, ListItem } from "@mui/material";

type AnalysisStepCardListProps = {
  cardNames: string[] | string[][],
};

export const AnalysisStepCardList: React.FC<AnalysisStepCardListProps> = ({ cardNames }) => {
  return (
    <Accordion sx={{ marginBottom: '1rem' }}>
      <AccordionSummary expandIcon={<ExpandMore />}>Click to see card names</AccordionSummary>
      <AccordionDetails>
        <List>
          {cardNames.map((card) => {
            const cardName = Array.isArray(card)
              ? card.map((card) => card).join(' + ')
              : card
            return (
              <ListItem key={cardName + getRandomId()}>
                {cardName}
              </ListItem>
            )
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  )
};