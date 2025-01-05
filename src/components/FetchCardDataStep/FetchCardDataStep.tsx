import { getRandomId } from "@/utils/helpers";
import { Card as MagicCard } from "@/utils/mtg-scripting-toolkit/scryfall";
import { ArrowDownward, Info } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Card, CardContent, CircularProgress, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

type FetchCardDataStepProps = {
  cubeList: string[];
  onCardDataFetch: () => void;
  isLoading: boolean;
  cardData: MagicCard[];
};

export const FetchCardDataStep: React.FC<FetchCardDataStepProps> = ({ cubeList, onCardDataFetch, isLoading, cardData }) => {
  const handleFetchCardData = async () => {
    onCardDataFetch();
  }

  return (
    <>
      <Card>
        <CardContent>
          <Info /><span> Found the following cube data on Cube Cobra ({cubeList.length} cards).</span>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDownward />}
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
              expandIcon={<ArrowDownward />}
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
    </>
  )
};
