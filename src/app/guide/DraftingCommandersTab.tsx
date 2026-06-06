import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProsCons } from "@/components/ProsCons/ProsCons";
import { BackgroundsCalculator } from "@/components/Design/BackgroundsCalculator";
import { BaselineCalculator } from "@/components/Design/BaselineCalculator";
import { PartnersCalculator } from "@/components/Design/PartnersCalculator";

export function DraftingCommandersTab() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        How will your commanders be drafted?
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Before we discuss deck size, pack size and count, or even colour
        identity rules, let&apos;s start with a question more defining for a
        commander cube: how will your commanders be drafted? This will make the
        other questions much easier to answer too.
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Drafting commanders is the major complicating factor compared to
        non-commander cube. To have each drafter be presented with sufficient
        Commander options, your cube list will need a very high percentage of
        legal Commanders. Simply adding lots of legendary creatures to your cube{" "}
        <i>could</i> be the answer for some, but it&apos;s hardly a generic
        solution.
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Cube curators have come up with a variety of ways to solve this problem.
        We will discuss the most prominent ones, in increasing steps of rules
        modification.
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        You can click option headers to expand or hide them.
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            Option 1: partners or backgrounds
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            There are a few ways to seed a high number of unique commanders into
            a list of cards, using two mechanics that exist within the game
            itself: partner and backgrounds. Our baseline is simple: one
            legendary creature equals one commander.
          </Typography>
          <BaselineCalculator />
          <Typography variant="body1" color="text.primary" gutterBottom>
            This is not nearly getting enough commanders into our pool.
            Let&apos;s try Backgrounds. Now we can multiply the number of
            creatures with <i>Choose a background</i> with the number of
            Backgrounds. Simple but effective!
          </Typography>
          <BackgroundsCalculator />
          <Typography variant="body1" color="text.primary" gutterBottom>
            With partners, it even gets a little more interesting. Notice that
            with 50 card slots we get almost twice as many effective commander
            pairings!
          </Typography>
          <PartnersCalculator />
          <Typography variant="body1" color="text.primary" gutterBottom>
            (Both examples assume that we won&apos;t play a solo partner or a
            background-less commander.)
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The downsides of this method come mostly in the form of gameplay.
            The different generations of partners and backgrounds represent
            specific design eras from WotC. The backgrounds are only available
            in D&amp;D universe cards, and the partners aren&apos;t to
            everyone&apos;s taste either. Power level is a consideration too.
            The first generation of multicolour partners opens up four-color
            color identities at low opportunity cost (more later on why
            that&apos;s a problem), and are generically quite powerful. Later
            partners limit their pairing to two colours, and most of them are
            toned down quite a bit. Backgrounds, finally, represent another
            steep drop in power level. In a high powered cube, you won&apos;t
            want to play most of them.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
            Pros and cons
          </Typography>
          <Box sx={{ mb: 1 }}>
            <ProsCons type="pro" items={[
              "Very high number of commander pairings per card slot",
              "No rules modifications required",
              "No additional sorting effort required",
            ]} />
            <ProsCons type="con" items={[
              "The power level may not match your goals",
              "The cards may not have the flavor or mechanics you want",
            ]} />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Option 2: Commander packs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            This option does not modify the rules of the game, but it does
            modify the draft phase significantly. Some curators build Commander
            Packs, which are drafted in addition to the regular draft —
            sometimes before, sometimes between &quot;regular&quot; packs. The
            commander pool becomes however large you want it to be, but not at a
            cost of &quot;dead cards&quot; in regular packs. The cost of this
            method comes in the form of a higher number of individual cards to
            buy, sleeve, and sort separately to the cube designer, and a
            slightly longer draft phase for the players.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
            Pros and cons
          </Typography>
          <Box sx={{ mb: 1 }}>
            <ProsCons type="pro" items={[
              "Guarantees players see sufficient and equal commander options",
              "You have tight control over the power level",
              "No rules modifications, just an extra pack",
            ]} />
            <ProsCons type="con" items={[
              "More cards to maintain",
              "Higher sorting effort",
            ]} />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Option 3: Rules modifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Modifying the rules of the game is generally not recommended as it
            increases complexity in an already complex game.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            However, for Commander cubes this has the benefit of having an
            official precedent. The <i>Commander Masters</i> set used a rules
            modification that treated all monocolored Legendary creatures as if
            they had partner.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            This means we can apply the &quot;partner formula&quot;, but include
            all our monocoloured legendary creatures. The amount of pairings
            possible with this method scales the same as we saw with Partners,
            but the number of options across the full spectrum of power levels
            is much bigger.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            However, this also raises the power level, because each command zone
            will contain two cards that were originally designed to be there (if
            at all) <i>alone</i>. Some combinations will be extremely powerful,
            or even create two-card combos, so this method requires more active
            power outlier monitoring.
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
            Pros and cons
          </Typography>
          <Box sx={{ mb: 1 }}>
            <ProsCons type="pro" items={[
              "High number of commander pairings per card slot",
              "High number of options available across all power levels",
              "Has an official precedent (Commander Masters)",
              "No additional sorting effort required",
            ]} />
            <ProsCons type="con" items={[
              "Added complexity, especially for new players",
              "Power level higher on average; outliers are likely",
              "Easy to accidentally create a 2-card combo in the command zone",
            ]} />
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Bonus option: seeding packs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary">
            Seeding packs so that each contains a certain density of commanders
            does not increase the amount of draftable commanders. But it does
            increase the amount of commanders that each drafter is guaranteed to
            see, so you need less of them in your list in total. This comes at a
            complexity cost during the shuffling and pack creation phase. This
            tactic can be combined with all of the techniques listed above.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Conclusion
      </Typography>
      <Typography variant="body1" color="text.primary">
        There is no single best way to solve the problem at hand. Wizards of the
        Coast has attempted two of these options in official products, but the
        community does not agree on a single best one. Each has certain
        consequences for your complexity, power level, mechanics and flavour.
        You will have to choose the option that&apos;s best for you, or perhaps
        more importantly: your players!
      </Typography>
    </>
  );
}
