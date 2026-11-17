import {
  Typography,
} from "@mui/material";
import { WheelingCalculator } from "@/components/Design/WheelingCalculator";
import { DraftPoolCalculator } from "@/components/Design/DraftPoolCalculator";

export function DraftProblemsTab() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Challenges in Commander Cube draft
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
        The next page describes three techniques for solving these problems.
      </Typography>
    </>
  );
}
