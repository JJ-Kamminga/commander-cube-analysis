import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
        to the pool. And to complaticate matters further, Commander is a
        4-player format, so designers need to consider how their cube will be
        drafted with 4 players.{" "}
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
        Consider as a baseline, 8 players drafting a pack of 15. 7 Cards wheel,
        and nothing makes it around a third time:
      </Typography>
      <WheelingCalculator defaultPlayers={8} defaultCardsPerPack={15} />
      <Typography variant="body1" color="text.primary" gutterBottom>
        When we scale up to 60-card decks (assuming 3 packs for now), we end up
        with 20-card packs. Not only do we now have more cards wheeling, we have
        cards wheeling twice:
      </Typography>
      <WheelingCalculator defaultPlayers={8} defaultCardsPerPack={20} />
      <Typography variant="body1" color="text.primary" gutterBottom>
        And this is assuming the &quot;best case scenario&quot; of 8 players.
        With lower player counts, the problem is becoming even more pronounced.
        This pack just keeps going round and round:
      </Typography>
      <WheelingCalculator defaultPlayers={4} defaultCardsPerPack={20} />
      We need to find a way to increase the pool size without causing endless
      wheels, preferably having cards wheel no more than once.
      <Typography variant="h4" gutterBottom>
        Problem 2: A low percentage of cards seen per player
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Many cubes are designed to be drafted in full. But when faced with lower
        player counts, we cannot always draft the whole cube. In any cube, this
        will hurt strategies that rely on synergies or even tight ratios of
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
        pods that can split into two game pods, can expect to sometimes draft
        only a small portion of their cube.
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Consider how a lower player count affects the percentage of the cube
        that is seen:
      </Typography>
      <DraftPoolCalculator defaultCubeSize={480} defaultCardsPerPack={20} />
      <DraftPoolCalculator defaultPlayers={4} />
      <Typography variant="body1" color="text.primary" gutterBottom>
        When we start introducing pick-2 rules to tackle the wheel problem, the
        number of cards each player individually sees of the cube drops even
        lower. The next section explores that trade-off in detail.
      </Typography>
      <Typography variant="h4" gutterBottom>
        Solutions
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        The <i>percentage of pool seen</i> is important to keep high, to make
        sure players have access to a sufficient variety of cards to build
        decks. The<i>cards-wheeled-twice count</i> is important to keep low,
        because wheeling cards twice is considered a bad experience. And where
        theoretically, much could be solved by raising the number of packs,
        going over 5 is not generally considered a great experience either.
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        I will discuss three angles by which these problems can be addressed.
        These are different aspects of the draft format, with different
        solutions that can be combined to match your scenario.
      </Typography>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Tool: Pack count</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            This is a simple solution to the wheel problem: just add more packs!
            And yes, this is very effective! Take the example of 3 packs of 20
            (assuming a 60 card pool). If we draft (4) packs of 15 instead,
            nothing wheels twice anymore!
          </Typography>
          <WheelingCalculator defaultCardsPerPack={15} />
          <Typography variant="body1" color="text.primary" gutterBottom>
            Interestingly, this does not even affect the percentage of cards
            seen per player that much. Take this more extreme example:
            <DraftPoolCalculator
              defaultCardsPerPack={15}
              defaultCubeSize={480}
              defaultPacks={4}
            />
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            For this reason, I recommend pack size as the first aspect to tweak!
            Theoretically, we can take this even further. Take our worst case of
            4 players:
            <WheelingCalculator defaultPlayers={4} defaultCardsPerPack={20} />
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Drafting (10) packs of 6 will indeed solve the issue completely!
            <WheelingCalculator defaultPlayers={4} defaultCardsPerPack={6} />
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Of course this is a hyperbolical example to demonstrate the effects
            of changing the pack count. At some point we will see the percentage
            of cards seen per player degrade:
            <DraftPoolCalculator
              defaultCardsPerPack={6}
              defaultCubeSize={480}
              defaultPacks={10}
            />
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            But the most important reason to keep the pack count in check is
            your player experience factor. Most drafters do not find drafting 10
            packs fun.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Check what your players find normal, but I recommend going no
            further than 5.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Tool: Pick style</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The most popular change to the draft formats Commander cubes use is
            to the pick style. This can be attributed to official Commander
            draft formats opting to have players pick 2 cards out of every pack.
            Before discussing the pros and cons of changing the pick style as
            well as those of the particular options, here are the three options
            seen most often:
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Standard (pick 1 each time)
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            This pick style does not have a name because it has been the default
            draft style for Magic booster draft for decades, but I will call it{" "}
            <i>standard</i>. Each player picks one card per pass. Packs last the
            longest, so each player sees the most cards — but it also means
            larger deck sizes require larger packs, which drives up wheeling.
            <DraftPoolCalculator
              defaultCubeSize={480}
              defaultPlayers={8}
              defaultPacks={3}
              defaultCardsPerPack={20}
              defaultPickStyle="standard"
            />
            <WheelingCalculator />
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Double Masters (pick 2 on the opening pick, then pick 1)
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The opener picks 2 cards when first opening the pack; all subsequent
            picks are 1. This gives the opener a small advantage in options
            while keeping packs moving at roughly the same speed as standard. I
            list this format mostly because it has a precedent in an official
            Magic product. The impact of this pick style compared to standard is
            quite small.
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={8}
            defaultPacks={3}
            defaultCardsPerPack={20}
            defaultPickStyle="double-masters"
          />
          TODO: effect of pick style on wheels
          <WheelingCalculator />
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Commander Legends (pick 2 each time)
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Every player picks 2 cards every pass. Packs are exhausted in half
            as many passes, so each player sees significantly fewer cards. On
            the flipside, players also end up with twice as many picks, enabling
            larger decks without needing twice as many packs.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            This pick style also has one particular advantage for the formats it
            was created for. The Commander Legends and Masters set used Partner
            and Background rules for Commanders. Being able to pick up a partner
            pairing from 1 pack with 1 pick prevented some potential problems
            with incomplete partner pairings, e.g. players not ending up with
            Partner pairing which matched the colours of their draft pool.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            However, this comes at a cost to the percentage of cards seen:
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={8}
            defaultPacks={3}
            defaultCardsPerPack={20}
            defaultPickStyle="commander-legends"
          />
          TODO: effect of pick style on wheels
          <WheelingCalculator />
          <Typography variant="body1" color="text.primary" gutterBottom>
            A more subtle effect of this pick style is worth mentioning. Having
            players pick 2 cards each time has a risk of creating{" "}
            <i>on-rails</i> drafts, where players can cut colours or pairings
            more easily, leading to less strategy during the draft phase.
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            Conclusion
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Increasing the number of picks reduces the number of cards that
            wheels, at the cost of some percentage points of cards seen per
            player, especially at lower player counts.
            <Typography>
              Pick style has other effects on the draft, however. Likely, the
              design of your cube drives your decision for a specific pick
              format. In that case, use the other tools on this page to
              compensate for the downsides of your pick style.
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            color="text.primary"
            gutterBottom
          ></Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Tool: Burning</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Burning is a rules modification to the draft where some cards are
            discarded; they are not added to any player&apos;s pool. Burning
            reduces the amount that cards go round, making packs feel smaller.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            There are two types of burning. I will describe each shortly with an
            example to show their effect.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The original concept of burning means discarding one or more cards
            when passing the pack:
            <WheelingCalculator
              defaultPlayers={4}
              defaultCardsPerPack={16}
              defaultBurnPerPick={1}
            />
            This type of burning introduces a whole new dimension of decision
            making to the draft. Some players consider it an additional
            strategic element, whereas others find that it makes things
            needlessly complex.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            To achieve a similar result with lower complexity, we can also
            discard the last chosen number of cards in a pack:
            <WheelingCalculator
              defaultPlayers={4}
              defaultCardsPerPack={20}
              defaultBurnAtEndOfPack={8}
            />
            <Typography variant="body1" color="text.primary" gutterBottom>
              Leaving the discussion of complexity aside, if you want your
              players to see more of your cube, burning at the end of the pack
              is slightly better.
              <DraftPoolCalculator
                defaultCubeSize={480}
                defaultPlayers={4}
                defaultPacks={5}
                defaultCardsPerPack={24}
                defaultBurnPerPick={1}
              />
              This is because burned cards always go at least once around the
              table before they are burned. This assumes you are not burning
              more cards than you have drafters (which you should not do).
              <DraftPoolCalculator
                defaultCubeSize={480}
                defaultPlayers={4}
                defaultPacks={5}
                defaultCardsPerPack={24}
              />
              <b>
                From here on, I will consider burning to mean: burning at the
                end of the pack.
              </b>
            </Typography>
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Burning reduces wheeling
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Because burning effectively shrinks the pack from the perspective of
            wheeling, it is a direct solution to Problem 1. With 4 players and
            20-card packs, cards wheel relentlessly without burn:
          </Typography>
          <WheelingCalculator
            defaultPlayers={4}
            defaultCardsPerPack={20}
            defaultBurnAtEndOfPack={0}
          />
          <Typography variant="body1" color="text.primary" gutterBottom>
            Burning 4 cards per pass removes exactly as many cards as there are
            players each pass, leaving nothing to wheel:
          </Typography>
          <WheelingCalculator
            defaultPlayers={4}
            defaultCardsPerPack={20}
            defaultBurnAtEndOfPack={6}
          />
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Burning enables larger packs, raising cube coverage
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The real payoff is that burning lets you use packs that draw from
            more of the cube. Without burn, keeping 4-player wheeling under
            control forces you to use small packs — which means most of the cube
            sits unplayed:
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={4}
            defaultPacks={5}
            defaultCardsPerPack={12}
            defaultBurnAtEndOfPack={0}
          />
          <Typography variant="body1" color="text.primary" gutterBottom>
            Switching to 20-card packs with burn 4 keeps wheeling at zero while
            pulling 83% of the cube into the pool instead of 50%, and raising
            the share of the cube each player sees:
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={4}
            defaultPacks={5}
            defaultCardsPerPack={20}
            defaultBurnAtEndOfPack={4}
          />
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            The cost: complexity
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Burning adds a step to every single pass of the draft. Players must
            remember to burn, agree on whether burns are face-up or face-down,
            and resist the temptation to pick up a burned card they later regret
            passing. In a casual environment — especially with new players —
            this overhead can noticeably slow down and complicate the draft.
            Burning is a powerful tool, but it is worth asking whether adjusting
            the pack format achieves a similar result with less explanation.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
