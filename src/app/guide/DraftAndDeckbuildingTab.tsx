import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function DraftAndDeckbuildingTab() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Draft and deckbuilding
      </Typography>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Draft format</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The following factors should be considered for the draft format:
          </Typography>
          <Box component="ol" sx={{ mt: 0, mb: 2, color: "text.secondary" }}>
            <Typography component="li" variant="body1" color="text.secondary">
              % of cards seen per player (of the draft pool)
            </Typography>
            <Typography component="li" variant="body1" color="text.secondary">
              Amount of cards seen thrice
            </Typography>
          </Box>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Factor 1 is important to keep high, to make sure players have access
            to a sufficient variety of cards to build decks (assuming these are
            supported in the pool). Factor 2 is important to keep low, because
            seeing cards thrice is considered a bad experience (whereas some
            amount of cards seen twice is OK). The number of packs should not
            exceed 5 for similar reasons.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Note that both percentages can be raised by <em>burning</em> cards.
            This is a valuable knob, but it helps to first establish a solid
            baseline for factors 1 and 2.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Baseline
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            A 360 card cube drafted with 8 players, 3 packs of 15:
          </Typography>
          <Box component="ol" sx={{ mt: 0, mb: 2, color: "text.secondary" }}>
            <Typography component="li" variant="body1" color="text.secondary">
              77% of cards seen per player
            </Typography>
            <Typography component="li" variant="body1" color="text.secondary">
              0 cards seen thrice
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Commander Legends format
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            A 480 card pool drafted with 8 players, 3 packs of 20, pick 2 each
            time:
          </Typography>
          <Box component="ol" sx={{ mt: 0, mb: 2, color: "text.secondary" }}>
            <Typography component="li" variant="body1" color="text.secondary">
              65% of cards seen per player
            </Typography>
            <Typography component="li" variant="body1" color="text.secondary">
              0 cards seen thrice
            </Typography>
          </Box>
          <Typography variant="body1" color="text.primary" gutterBottom>
            This is fine! But what about with 4 players?
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            3 packs of 20:
          </Typography>
          <Box component="ol" sx={{ mt: 0, mb: 1, color: "text.secondary" }}>
            <Typography component="li" variant="body2" color="text.secondary">
              85% of cards seen per player
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              4 cards seen thrice
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            5 packs of 12 (preferred):
          </Typography>
          <Box component="ol" sx={{ mt: 0, mb: 1, color: "text.secondary" }}>
            <Typography component="li" variant="body2" color="text.secondary">
              75% of cards seen per player
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              0 cards seen thrice
            </Typography>
          </Box>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The downside here is the limited pool (both options only utilize 50%
            of the cube). We can improve things by burning. A 360 card pool
            (75%), 5 packs of 18, burn 6:
          </Typography>
          <Box component="ol" sx={{ mt: 0, mb: 1, color: "text.secondary" }}>
            <Typography component="li" variant="body2" color="text.secondary">
              83% of cards seen per player
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              0 cards seen thrice
            </Typography>
          </Box>
          <Typography variant="body1" color="text.primary" gutterBottom>
            What about 6 players? 3 packs of 20 works OK:
          </Typography>
          <Box component="ol" sx={{ mt: 0, mb: 0, color: "text.secondary" }}>
            <Typography component="li" variant="body2" color="text.secondary">
              75% of cards seen per player
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              0 cards seen thrice
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Standard pick rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Assuming a 480 card cube with a pool size of 60. Values show % of
            cards seen per player.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Drafted with 8 players
          </Typography>
          <Table size="small" sx={{ mb: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell>Format</TableCell>
                <TableCell align="center">1 card each time</TableCell>
                <TableCell align="center">2 cards each time</TableCell>
                <TableCell align="center">First pick two cards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>3 × 20</TableCell>
                <TableCell align="center">83%</TableCell>
                <TableCell align="center">65%</TableCell>
                <TableCell align="center">78%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5 × 12</TableCell>
                <TableCell align="center">77%</TableCell>
                <TableCell align="center">53%</TableCell>
                <TableCell align="center">71%</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Typography variant="h6" gutterBottom>
            Drafted with 4 players
          </Typography>
          <Table size="small" sx={{ mb: 3 }}>
            <TableHead>
              <TableRow>
                <TableCell>Format</TableCell>
                <TableCell align="center">1 card each time</TableCell>
                <TableCell align="center">2 cards each time</TableCell>
                <TableCell align="center">First pick two cards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>3 × 20</TableCell>
                <TableCell align="center">46%</TableCell>
                <TableCell align="center">43%</TableCell>
                <TableCell align="center">44%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>4 × 15</TableCell>
                <TableCell align="center">45%</TableCell>
                <TableCell align="center">53%</TableCell>
                <TableCell align="center">—</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5 × 12</TableCell>
                <TableCell align="center">44%</TableCell>
                <TableCell align="center">44%</TableCell>
                <TableCell align="center">—</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Typography variant="h6" gutterBottom>
            Drafted with 4 players, with burn drafting
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Format</TableCell>
                <TableCell align="center">1 card each time</TableCell>
                <TableCell align="center">2 cards each time</TableCell>
                <TableCell align="center">First pick two cards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>5 × 16, burn 4</TableCell>
                <TableCell align="center">60%</TableCell>
                <TableCell align="center">54%</TableCell>
                <TableCell align="center">57%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5 × 20, burn 8</TableCell>
                <TableCell align="center">77%</TableCell>
                <TableCell align="center">71%</TableCell>
                <TableCell align="center">74%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>5 × 15, burn 3</TableCell>
                <TableCell align="center">56%</TableCell>
                <TableCell align="center">50%</TableCell>
                <TableCell align="center">53%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
