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
      <Typography variant="body1" color="text.secondary" gutterBottom>
        The knobs you can turn:
      </Typography>
      <Box component="ol" sx={{ mt: 0, mb: 3, color: "text.secondary" }}>
        <Typography component="li" variant="body1" color="text.secondary">
          Deck size
        </Typography>
        <Typography component="li" variant="body1" color="text.secondary">
          Life total
        </Typography>
        <Typography component="li" variant="body1" color="text.secondary">
          Colour identity
        </Typography>
      </Box>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Draft format</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary" gutterBottom>
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
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Factor 1 is important to keep high, to make sure players have access
            to a sufficient variety of cards to build decks (assuming these are
            supported in the pool). Factor 2 is important to keep low, because
            seeing cards thrice is considered a bad experience (whereas some
            amount of cards seen twice is OK). The number of packs should not
            exceed 5 for similar reasons.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Note that both percentages can be raised by <em>burning</em> cards.
            This is a valuable knob, but it helps to first establish a solid
            baseline for factors 1 and 2.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Baseline
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
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
          <Typography variant="body1" color="text.secondary" gutterBottom>
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
          <Typography variant="body1" color="text.secondary" gutterBottom>
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
          <Typography variant="body1" color="text.secondary" gutterBottom>
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
          <Typography variant="body1" color="text.secondary" gutterBottom>
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

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Standard pick rules</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary" gutterBottom>
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

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Deck size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h6" gutterBottom>
            40, 60 or 100?
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            This is a factor of consistency. Do you like consistent commander
            decks that play more like 60 card constructed? Or do you like the
            singleton nature of commander? The one number I would not recommend
            is anything too far above 60 — certainly not 100. The consistency of
            decks will already be lower due to the nature of drafted decks. 100
            card decks will need bigger draft pools, maybe close to 100 cards (5
            packs of 20). Drafting and deckbuilding will take very long, and
            games will more often feature the &quot;duds&quot; of a draft pool.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            A sidenote on including commanders
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Following official commander rules, your commander or commander
            pairing is part of your deck, making them cards 100 and 99.
            Converting heuristics for the amount of lands you need to run,
            you&apos;ll find that this throws the calculation off slightly. Some
            people therefore choose to have the commander(s) be the 101st and
            102nd card.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Life total</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            This is a simpler decision, and really it comes down to how quickly
            you want games to end. There is not really any complex logic behind
            Commander&apos;s 40 life. Official formats Commander Legends and
            Commander Masters have stuck with 40, but{" "}
            <em>Brawl</em> used 25, and some multiplayer formats like Conspiracy
            simply used 20. The lower you go, the sooner games will end — and
            how soon you like that is completely up to you.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            A sidenote on Commander damage
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Commander Damage being 21 has a bit of a backstory: 21 is 3 hits
            from a 7-power Elder Dragon. Whatever life total you decide to use,
            I recommend keeping the Commander Damage rule. It is a generally
            agreed useful tool in the format, allowing decks to break through
            very high life totals and offering another angle of strategy for
            Voltron decks and others.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Colour identity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            When given the problem some thought, most players agree that the
            colour identity rule is imperfect. For example, hybrid cards or flip
            cards with a monocolour front are often brought up as examples where
            players would change the rule. Rule 0 is all well and good, but the
            vast majority of Commander players do not use it for checking whether
            they can run a given card.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Modifying rules comes with a complexity cost. Your players will need
            time adjusting, especially players new to cube who are also adjusting
            to drafting, different deck size, etc. That said, this is cube and
            you are free to do what you want. Here are some popular options for
            handling color identity.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Per card type
          </Typography>
          <Box component="ul" sx={{ mt: 0, mb: 2, color: "text.secondary" }}>
            <Typography component="li" variant="body1" color="text.secondary">
              Hybrid cards are treated as truly hybrid
            </Typography>
            <Typography component="li" variant="body1" color="text.secondary">
              Off-colour activations/pips don&apos;t count toward identity
            </Typography>
          </Box>

          <Typography variant="h6" gutterBottom>
            Colour identity restricts your basics
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            This option is perhaps the most common modification of the color
            identity rule, used by Sam Black in his commander cube and also
            featured in Tiny Leaders Cube. The rule: your color identity
            restricts the basic lands you can put in your deck. In other words:
            if you want to splash, you&apos;ll have to draft your fixing.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Let go of colour identity altogether
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            There is something to be said for this. In cube, your land base
            needs to be drafted just like your nonlands, and basics won&apos;t
            get you very far on a splash. So in a way, this is similar to the
            previous option — but perhaps less complex, as players may use
            heuristics from 1v1 cube or retail limited, where occasionally a
            splash can be enabled by a fetchland or two and a Rampant Growth.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
