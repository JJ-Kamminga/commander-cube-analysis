import { Typography } from "@mui/material";

export function DraftAndDeckbuildingTab() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Draft and deckbuilding
      </Typography>
      Needs much refining
      <Typography variant="body1" color="text.secondary">
        The knobs you can turn: 1. Deck size 2. Life total 3. Colour identity ##
        Draft format The following factors should be considered for the draft
        format: 1. % of cards seen per player (of the draft pool) 2. amount of
        cards seen thrice 1 is important (to keep high) to make sure players
        have access to a sufficient variety of cards to build decks (assuming
        these are supported in the pool). 2 is important (to keep low) because
        seeing cards thrice is a considered a bad experience (whereas some
        amount of cards seen twice is OK). I add that the number of packs should
        not exceed 5 for similar reasons. Note that % of cards used of the whole
        cube, as well as % of cards seen per player of the whole cube can be
        raised by *burning* cards. This is a valuable knob, but I would like to
        establish a solid baseline of factors 1 and 2. ### Baseline A 360 card
        cube drafted with 8 players, 3 packs of 15 gives 1. 77% of cards seen
        per player 2. 0 cards seen thrice ### Commander legends A 480 card pool
        drafted with 8 players, 3 packs of 20, pick 2 each time gives 1. 65% of
        cards seen per player 2. 0 cards seen thrice This is fine! But what
        about with 4 players? 3 packs of 20: 1. 85% of cards seen per player 2.
        4 cards seen thrice I prefer this, 5 packs of 12: 1. 75% of cards seen
        per player 2. 0 cards seen thrice The downside here is the limited pool
        (both options only utilize 50% of the cube). Let&apos;s improve things
        by burning. a 360 card pool (75%) 5 packs of 18, burn 6: 1. 83% of cards
        seen per player 2. 0 cards seen thrice What about 6 players? 3 packs of
        20 works OK: 1. 75% of cards seen per player 2. 0 cards seen thrice ##
        Standard pick rules ### Table Assuming - a 480 card cube - for a pool
        size of 60 Drafted with 8 players: | | 1 card each time | 2 cards each
        time | First pick two cards | | ------ | ------------------------- |
        ------------------------- | ------------------------- | | 3 x 20 | 83%
        cards seen per player | 65% cards seen per player | 78% cards seen per
        player | | 5 x 12 | 77% cards seen per player | 53% cards seen per
        player | 71% cards seen per player | Drafted with 4 players: | | 1 card
        each time | 2 cards each time | First pick two cards | | ------ |
        ------------------------- | ------------------------- |
        ------------------------- | | 3 x 20 | 46% cards seen per player | 43%
        cards seen per player | 44% cards seen per player | | 4 x 15 | 45% cards
        seen per player | 53% cards seen per player | | | 5 x 12 | 44% cards
        seen per player | 44% cards seen per player | | Drafted with 4 players,
        with burn drafting: | | 1 card each time | 2 cards each time | First
        pick two cards | | -------------- | ------------------------- |
        ------------------------- | ------------------------- | | 5 x 16, burn 4
        | 60% cards seen per player | 54% cards seen per player | 57% cards seen
        per player | | 5 x 20, burn 8 | 77% cards seen per player | 71% cards
        seen per player | 74% cards seen per player | | 5 x 15, burn 3 | 56%
        cards seen per player | 50% cards seen per player | 53% cards seen per
        player | ## Deck size ## 40, 60 or 100 This is a factor of consistency.
        Do you like consistent commander decks that play more like 60 card
        constructed? Or do you like the singleton nature of commander? The one
        number I would not recommend is anything too far above 60, certainly
        100. The consistency of decks will already be lower, due to the nature
        of drafted decks. 100 card decks will need bigger draft pools, maybe
        close to 100 cards - 5 packs of 20? Drafting and deckbuilding will take
        very long, and games will more often feature the &quotduds&quot of a
        draft pool. ### A sidenote on including commanders Following official
        commander rules, your commander or commander pairing is part of your
        deck, making cards 100 and 99. Converting heuristics for the amount of
        lands you need to run, you&apos;ll find that this throws the calculation
        off slightly. Some people therefore choose to have the commander(s) be
        the 101st and 102nd card. This is an optimization problem, and I would
        recommend not explosing ## Life total This is a bit of a simpler
        decision, and really it comes down to how quick you want games to end.
        There is not really any complex logic behind Commander&apos;s 40 life.
        Official formats Commander Legends and Commander masters have stuck with
        40, but the &quotStandard commander&quot; that never really caught on
        *Brawl* used 25, and some multiplayer formats like Conspiracy simply
        used 20. The lower you go, the sooner games will end, and how soon you
        like that is completely up to you. ### A sidenote on Commander damage
        Commander Damage being 21 has a bit of a backstory, 21 being 3 hits from
        a 7 power Elder Dragon. Whatever life total you decide to use, I
        recommend leaving the Commander Damage rule. This is a generally agreed
        useful tool in the format, allowing decks to break through very high
        life totals, and offering another angle of strategy for Voltron decks
        and others. ## Colour Identity Colour Identity However, when given the
        problem some thought, most players agree that the colour identiy rule is
        imperfect. For example, hybrid cards or flip cards with a monocolour
        front are often brought up as examples where players would change the
        rule. Rule 0 is all well and good, but 99% of Commander players do not
        use this for checking whether they can run (example). Let me say up
        front: modifying rules comes with a complexity cost. Your players will
        need time adjusting for it, especially players new to cube who will also
        need to adjust to drafting, different deck size, etc. etc. That said,
        this is cube and you are free to do what you want. So here are some
        popular options for handling color identity. ### Per card type - Hybrid
        cards are really hybrid - Off colour activations/pips don&apos;t count
        ### Colour identity restricts your basics This option is maybe the most
        common modification of the color identity rule, used by Sam Black in his
        commander cube, and also being featured in Tiny Leaders Cube. The rule:
        your color identity restricts the basic lands you can put in your deck.
        In other words: if you want to splash, you&apos;ll have to draft your
        fixing. ### Let go of colour identity altogether There is something to
        be said for this. In cube, your land base needs to be drafted same as
        your nonlands, and basics won&apos;t get you very far on a splash. So in
        a way, this is similar to the previous option - but perhaps less
        complex, as players may use heuristics from 1v1 cube or retail limited,
        where occasionally a splash could be enabled by a fetchland or two and a
        Rampant Growth getting a single off-colour basic.
      </Typography>
    </>
  );
}
