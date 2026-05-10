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
        defaultCardsPerPack={15}
      />
      <Typography variant="body1" color="text.primary" gutterBottom>
        Now when we scale up to 60-card decks, keeping 3 packs to keep the
        example clear, we end up with 20-card packs. Not only do we have more
        cards wheeling, we have cards wheeling twice:
      </Typography>
      <WheelingCalculator
        defaultPlayers={8}
        defaultCardsPerPack={20}
      />
      <Typography variant="body1" color="text.primary" gutterBottom>
        This may be acceptable with 8 players, but when we lower the player
        count things start to get annoying. This pack just keeps going round and
        round:
      </Typography>
      <WheelingCalculator
        defaultPlayers={4}
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
        When we start introducing pick-2 rules to tackle the wheel problem, the
        number of cards each player individually sees of the cube drops even
        lower. The next section explores that trade-off in detail.
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
            The pool-seen percentage is important to keep high, to make sure
            players have access to a sufficient variety of cards to build decks.
            The cards-seen-thrice count is important to keep low, because seeing
            cards thrice is considered a bad experience (whereas some amount of
            cards seen twice is OK). The number of packs should not exceed 5 for
            similar reasons.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Note that the pool percentage can be raised by <em>burning</em>{" "}
            cards. This is a valuable knob, but it helps to first establish a
            solid baseline.
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={360}
            defaultPlayers={8}
            defaultPacks={3}
            defaultCardsPerPack={15}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Pick style</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The three main pick styles are named after the products that
            popularised them. They differ in how many cards each player takes
            from a pack per pass, which affects both how many cards are seen and
            how quickly packs are exhausted.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Standard (pick 1 each time)
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The default. Each player picks one card per pass. Packs last the
            longest, so each player sees the most cards — but it also means
            larger deck sizes require larger packs, which drives up wheeling.
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={8}
            defaultPacks={3}
            defaultCardsPerPack={20}
            defaultPickStyle="standard"
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Double Masters (pick 2 on the opening pick, then pick 1)
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The opener picks 2 cards when first cracking the pack; all
            subsequent picks are 1. This gives the opener a small advantage in
            options while keeping packs moving at roughly the same speed as
            standard. The impact on cards seen per player is modest compared to
            Commander Legends.
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={8}
            defaultPacks={3}
            defaultCardsPerPack={20}
            defaultPickStyle="double-masters"
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Commander Legends (pick 2 each time)
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Every player picks 2 cards every pass. Packs are exhausted in half
            as many passes, so each player sees significantly fewer cards — but
            also ends up with twice as many picks, enabling larger decks without
            needing twice as many packs. This is the main reason Commander cubes
            adopt this format.
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={8}
            defaultPacks={3}
            defaultCardsPerPack={20}
            defaultPickStyle="commander-legends"
          />

          <Typography variant="body1" color="text.primary" gutterBottom sx={{ mt: 2 }}>
            Compare the three with 4 players instead of 8. The drop in cards
            seen per player becomes much more pronounced, especially with
            Commander Legends pick rules:
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={4}
            defaultPacks={3}
            defaultCardsPerPack={20}
            defaultPickStyle="standard"
          />
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={4}
            defaultPacks={3}
            defaultCardsPerPack={20}
            defaultPickStyle="double-masters"
          />
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={4}
            defaultPacks={3}
            defaultCardsPerPack={20}
            defaultPickStyle="commander-legends"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Burning</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Burning is a technique where each player discards one or more cards
            face-down when passing a pack, without picking them. Every burned
            card reduces the pack by one extra card per pass, which makes the
            pack exhaust faster — as if it were smaller.
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
            defaultBurnPerPack={0}
          />
          <Typography variant="body1" color="text.primary" gutterBottom>
            Burning 4 cards per pass removes exactly as many cards as there are
            players each pass, leaving nothing to wheel:
          </Typography>
          <WheelingCalculator
            defaultPlayers={4}
            defaultCardsPerPack={20}
            defaultBurnPerPack={4}
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Burning enables larger packs, raising cube coverage
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            The real payoff is that burning lets you use packs that draw from
            more of the cube. Without burn, keeping 4-player wheeling under
            control forces you to use small packs — which means most of the
            cube sits unplayed:
          </Typography>
          <DraftPoolCalculator
            defaultCubeSize={480}
            defaultPlayers={4}
            defaultPacks={5}
            defaultCardsPerPack={12}
            defaultBurnPerPack={0}
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
            defaultBurnPerPack={4}
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            The cost: complexity
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Burning adds a step to every single pass of the draft. Players must
            remember to burn, agree on whether burns are face-up or face-down,
            and resist the temptation to pick up a burned card they later
            regret passing. In a casual environment — especially with new
            players — this overhead can noticeably slow down and complicate the
            draft. Burning is a powerful tool, but it is worth asking whether
            adjusting the pack format achieves a similar result with less
            explanation.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
