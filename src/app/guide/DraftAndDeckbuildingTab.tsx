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
import { WheelingCalculator } from "@/components/Design/WheelingCalculator";
import { DraftPoolCalculator } from "@/components/Design/DraftPoolCalculator";

export function DraftAndDeckbuildingTab() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Drafting your cube
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        If you have drafted in person before, you know that getting the format
        right for the player count is a delicate problem. The common three packs
        of fifteen cards (I will write this as 3x15 from here on out) is
        designed explicitly for a pod of 8 players playing 40 card decks. As
        soon as we want to support 60 card decks, we need to add many more cards
        to the pool. And to make things more complicating, Commander is a
        4-player format, and most cube designers need to consider how their cube
        will be drafted with 4 players.{" "}
      </Typography>
      <Typography variant="body1" gutterBottom>
        As soon as we start changing the numbers on the player count and pool
        size, two problems emerge.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Problem 1: Cards wheeling more than once
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Wheeling is considered an essential part of drafting Magic: The
        Gathering, letting players speculate on cards they want that may make it
        around the table. However, wheeling gets much less rewarding and
        skilltesting once cards start wheeling more than once. But this is
        exactly what happens when we add more cards to the draft pool.
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        As a baseline, we have 8 players drafting packs of 15. 7 Cards wheel,
        and nothing makes it around a third time:
      </Typography>
      <WheelingCalculator
        defaultPlayers={8}
        defaultPacks={3}
        defaultCardsPerPack={15}
      />
      <Typography variant="body1" color="text.primary" gutterBottom>
        Now when we scale up to 60-card decks, keeping 3 packs to keep the
        example clear, we end up with 20-card packs. Not only do we have more
        cards wheeling, we have cards wheeling twice:
      </Typography>
      <WheelingCalculator
        defaultPlayers={8}
        defaultPacks={3}
        defaultCardsPerPack={20}
      />
      <Typography variant="body1" color="text.primary" gutterBottom>
        This may be acceptable with 8 players, but when we lower the player
        count things start to get annoying. This pack just keeps going round and
        round:
      </Typography>
      <WheelingCalculator
        defaultPlayers={4}
        defaultPacks={3}
        defaultCardsPerPack={20}
      />
      We need to find a way to increase the pool size without causing endless
      wheels, preferably having cards wheel no more than once.
      <Typography variant="h4" gutterBottom>
        Problem 2: A low percentage of cards seen per player
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        A cube is typically designed to be drafted in full. But when faced with
        lower player counts, we cannot always draft the whole cube. In any cube,
        this will hurt strategies that rely on synergies or even tight ratios of
        cards, and in synergy heavy cubes, this problem is exacerbated.
      </Typography>
      <Typography>
        Explainer: reanimator decks need a tight balance between self-mill,
        reanimation and targets. Spellslinger decks need a tight balance of
        creatures and spells.
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        As a baseline, let&apos;s look at a standard 1v1 draft pod of a 360-card
        cube.
      </Typography>
      <DraftPoolCalculator defaultCubeSize={360} defaultCardsPerPack={15} />
      <Typography variant="body1" color="text.primary" gutterBottom>
        Any cube drafted with less players than the maximum will see this ratio
        drop, not just Commander cubes. But Commander games are typically played
        with 4, and so it is natural to want to support 4-player draft pods with
        Commander cubes. Larger cubes that also want to support 8-player draft
        pods that can split into two game pods, can expect to draft only a small
        portion of their cube at a time, and have players see only a small
        portion of the cube:
      </Typography>
      <DraftPoolCalculator defaultPlayers={4} />
      <Typography variant="body1" color="text.primary" gutterBottom>
        Also, when we start introducing other tools like &quot;pick-2&quot; to
        tackle the <i>wheel problem</i> (see below), the number of cards each
        player individually sees of the cube drops even lower.
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        I will discuss some techniques to counter these problems, and how to
        adjust for varying player counts.
      </Typography>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Draft format</Typography>
        </AccordionSummary>
        <AccordionDetails>
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
