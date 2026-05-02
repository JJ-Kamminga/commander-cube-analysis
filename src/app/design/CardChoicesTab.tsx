import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export function CardChoicesTab() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Card choices
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Card choices will vary greatly depending on your gameplay goals. However,
        whatever those goals are, you will need to adjust for the decreased
        consistency of decks that cube produces. Unfocused decks don&apos;t
        proactively attack their opponents, and games will go long. This is the
        case for high powered commander cubes somewhat, but especially for lower
        powered ones. This section discusses a number of techniques to speed up
        games.
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Goad</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            One of the brilliant mechanics of Commander-focused design — this
            multiplayer mechanic forces players to attack, keeping the game
            moving and preventing turtling.
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Examples:
          </Typography>
          <Box component="ul" sx={{ mt: 0, mb: 0, color: "text.secondary" }}>
            <Typography component="li" variant="body2" color="text.secondary">
              Bloodthirsty Blade
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              Disrupt Decorum
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              Kardur, Doomscourge
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Cards that hit each opponent</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            In real games of Commander, the choice of which opponent to hit with
            your Blood Artist trigger is more often than not a dice roll, or a
            leftover feud from last game. If we&apos;re unlucky, our opponent
            ponders the decision for 10 seconds. As a cube curator, you have the
            capacity to remove that decision paralysis.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Don&apos;t run Blood Artist — run Zulaport Cutthroat. Not only does
            it speed up the game by dealing damage to each opponent, it also
            removes decision paralysis entirely, saving seconds on every trigger.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Boardwipes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Add them sparingly. Boardwipes are an important tool in Commander,
            but they are very powerful — often the greatest sources of card
            advantage in the game. Players who realize this and end up with a
            handful may not only dominate a game, but do so very slowly.
            Don&apos;t blame the player; don&apos;t let them have all those
            boardwipes for free.
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Make boardwipes committal:
          </Typography>
          <Box component="ul" sx={{ mt: 0, mb: 2, color: "text.secondary" }}>
            <Typography component="li" variant="body2" color="text.secondary">
              Hour of Revelation (heavy white mana cost)
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              Supreme Verdict (requires specifically two colours)
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Or provide ample interaction against them:
          </Typography>
          <Box component="ul" sx={{ mt: 0, mb: 2, color: "text.secondary" }}>
            <Typography component="li" variant="body2" color="text.secondary">
              Selfless Spirit
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              Heroic Intervention
            </Typography>
            <Typography component="li" variant="body2" color="text.secondary">
              Counterspells
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Boardwipes that are good in Commander don&apos;t necessarily produce
            good play patterns in Commander cube games.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Banned cards</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Generally, my recommendation is to let what&apos;s banned stay
            banned. Many banned cards earned their status for reasons related to
            play patterns rather than raw power level, and almost every banned
            card has a &quot;fixed&quot; version nowadays. Let the mistakes of
            the past stay in the past.
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            This applies especially to Conspiracies. These cards are not only
            very powerful, but play against the singleton nature of Commander. If
            you have considered all these factors and decided degeneracy is what
            you&apos;re up for — by all means. This is cube after all!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
