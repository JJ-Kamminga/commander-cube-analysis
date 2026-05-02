"use client";

import { useState } from "react";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";

const tabs = [
  "Goals",
  "Drafting commanders",
  "Draft and deckbuilding",
  "Card choices",
];

export default function DesignPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <Typography variant="h2">Commander Cube Design</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
          {tabs.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ py: 3 }}>
        {activeTab === 0 && (
          <>
            <Typography variant="h3" gutterBottom>
              Goals
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Content tab 1
            </Typography>
          </>
        )}
        {activeTab === 1 && (
          <>
            <Typography variant="h3" gutterBottom>
              How will your commanders be drafted?
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Unlike the matter of deck size, pack size or color identity rules,
              this question will have an answer more tied to your personal
              preference. And once you have that answer, the other questions
              will be more easily answered.
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Drafting commanders is the major complicating factor compared to
              non-commander cube. To have each drafter be presented with
              sufficient Commander options, your cube list will need a very high
              percentage of legal Commanders. At best, this means you now have a
              Legendaries or Historic theme in your cube (and you happen to like
              that). But at worst, your cube list now contains a high number of
              cards that at most one drafter could want — and will be last picks
              most of the time.
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Cube curators have come up with a variety of ways to solve this
              problem. We will discuss the most prominent ones, in increasing
              steps of rules modification.
            </Typography>

            <Typography variant="h4" gutterBottom>
              Option 1: partners or backgrounds
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              There are a few ways to seed a high number of unique commanders
              into a list of cards, using two mechanics that exist within the
              game itself: partner and backgrounds. Our baseline is this: 100
              legendary creatures = 100 commanders. Not a lot. Let&apos;s try
              some backgrounds. This is simple multiplication.
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: "monospace", my: 1, pl: 2 }}
            >
              Example: (Creatures with &quot;Choose a background&quot;) ×
              (Backgrounds)
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              50 creatures with &quot;Choose a background&quot; × 50 backgrounds
              = 2500 commander pairings. Not bad!
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Now what about partners? Here it gets even more interesting.
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontFamily: "monospace", my: 1, pl: 2 }}
            >
              partners × (partners − 1) ÷ 2
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              100 legendary creatures with partner = 4950 commander pairings.
              Wow! (Both examples assume that we won&apos;t play a solo partner
              or a background-less commander.)
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
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
            <Typography variant="body2" color="text.secondary">
              Pros:
            </Typography>
            <Box component="ul" sx={{ mt: 0, mb: 1, color: "text.secondary" }}>
              <Typography component="li" variant="body2" color="text.secondary">
                Very high number of commander pairings per card slot
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                No rules modifications
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                No additional sorting effort
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Cons:
            </Typography>
            <Box component="ul" sx={{ mt: 0, mb: 2, color: "text.secondary" }}>
              <Typography component="li" variant="body2" color="text.secondary">
                The power level may be too low
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                The cards may not have the flavor or mechanics you want
              </Typography>
            </Box>

            <Typography variant="h4" gutterBottom>
              Option 2: Commander packs
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              This option does not modify the rules of the game, but it does
              modify the draft phase significantly. Some curators build
              Commander Packs, which are drafted in addition to the regular
              draft — sometimes before, sometimes between &quot;regular&quot;
              packs. The commander pool increases by a lot, but not at a cost of
              &quot;dead cards&quot; in regular packs. The cost of this method
              comes in the form of a higher number of individual cards to buy,
              sleeve, and sort separately to the cube designer, and a slightly
              longer draft phase for the players.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pros:
            </Typography>
            <Box component="ul" sx={{ mt: 0, mb: 1, color: "text.secondary" }}>
              <Typography component="li" variant="body2" color="text.secondary">
                Guarantees players see sufficient and equal commander options
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Cons:
            </Typography>
            <Box component="ul" sx={{ mt: 0, mb: 2, color: "text.secondary" }}>
              <Typography component="li" variant="body2" color="text.secondary">
                More cards to maintain
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Higher sorting effort
              </Typography>
            </Box>

            <Typography variant="h4" gutterBottom>
              Option 3: Rules modifications
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              This option does modify the rules of the game. However, it has the
              benefit of having an official precedent. Commander Masters used a
              rules modification that treated all monocolored Legendary
              creatures as if they had partner. This means we can apply the
              &quot;partner formula&quot;, but include all our monocoloured
              legendary creatures. The amount of pairings possible with this
              method is off the charts. However, this also raises the power
              level, because each command zone will contain two cards that were
              designed to be there alone. Some combinations will be extremely
              powerful, or even create two-card combos, so this method requires
              more active power outlier monitoring.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pros:
            </Typography>
            <Box component="ul" sx={{ mt: 0, mb: 1, color: "text.secondary" }}>
              <Typography component="li" variant="body2" color="text.secondary">
                Extremely high number of commander pairings per card slot
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Has an official precedent (Commander Masters)
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                No additional sorting effort
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Cons:
            </Typography>
            <Box component="ul" sx={{ mt: 0, mb: 2, color: "text.secondary" }}>
              <Typography component="li" variant="body2" color="text.secondary">
                Added complexity, especially for new players
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Power level higher on average; outliers are likely
              </Typography>
              <Typography component="li" variant="body2" color="text.secondary">
                Easy to accidentally create a 2-card combo in the command zone
              </Typography>
            </Box>

            <Typography variant="h4" gutterBottom>
              Bonus option: seeding packs
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Seeding packs so that each contains a certain density of
              commanders does not increase the amount of draftable commanders.
              But it does increase the amount of commanders that each drafter is
              guaranteed to see, so you need less of them in your list in total.
              This comes at a complexity cost during the shuffling and pack
              creation phase. This tactic can be combined with all of the
              techniques listed above.
            </Typography>

            <Typography variant="h4" gutterBottom>
              Conclusion
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              There is no single best way to solve the problem at hand. Wizards
              of the Coast has attempted two of these options in official
              products, but the community does not agree these are universally
              good. Each has certain consequences for your complexity, power
              level, mechanics and flavour. You will have to choose the option
              that&apos;s best for you, or perhaps more importantly: your
              players!
            </Typography>
          </>
        )}
      </Box>
    </Container>
  );
}
