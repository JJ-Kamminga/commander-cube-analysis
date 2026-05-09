import { List, ListItem, Typography } from "@mui/material";
import { ProsCons } from "@/components/ProsCons/ProsCons";
import Link from "next/link";

export function RulesTab() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Rules and modifications
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Another thing to consider early on is the rules of the game. With this I
        mean:
      </Typography>
      <List>
        <ListItem>Deck size</ListItem>
        <ListItem>Life total</ListItem>
        <ListItem>Colour identity</ListItem>
      </List>
      <Typography variant="h3" gutterBottom>
        Deck size
      </Typography>
      The primary consideration is deck size. I will discuss three common deck
      size options: 100, 60 and 40 cards. The{" "}
      <Link target="_blank" href={"https://mtg.wiki/page/Tiny_Leaders"}>
        Tiny Leaders
      </Link>{" "}
      format deserves a special shoutout for its 50 card deck rule, but will not
      be discussed in detail here.
      <Typography variant="h4" gutterBottom>
        100 cards
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        Deck size is the first rule you may want to change from constructed
        Commander. In the average game, you don&apos;t get to see the bottom
        half of a 100 card deck. This is fine when playing a deck multiple
        times, but not so much when you only play it once or twice. Another
        consideration is that 100 card decks require much larger draft pools,
        leading to a much longer draft and deckbuilding phase, with more
        decisions of which you may not see the impact when you only play one or
        two games.
      </Typography>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mt: 2, mb: 1 }}
      >
        Pros and cons
      </Typography>
      <ProsCons
        type="pro"
        items={["Recognisable for constructed commander players"]}
      />
      <ProsCons
        type="con"
        items={[
          "Requires a longer draft and deckbuilding phase",
          "You will likely not see all of your cards in the first one or two games",
        ]}
      />
      <Typography variant="h4" gutterBottom>
        60 cards
      </Typography>
      <Typography variant="body1" gutterBottom>
        Wizards of the Coast landed on 60 cards as the deck size of choice for
        limited Commander formats. Both the Commander Legends sets and Commander
        Masters used 60 card decks. We do not know the exact reasoning behind
        this number, but 60 card decks dodge some of the problems with both 100
        and 40 card decks (read on below).
      </Typography>
      <Typography variant="body1" gutterBottom>
        The main downside of 60 card is that players cannot rely on heuristics
        from other formats for their land, ramp and spell counts. Commander
        rules of thumb often dictate less easily divisible numbers, like 37 for
        lands, making it hard to do quick math on ratios for a 60 card deck. The
        same is true for 40 card limited heuristics. 60 Card constructed players
        have an easier time adjusting, but need to account for the higher curves
        and should probably still play more lands than they are used to. And all
        non-Commander players need to take into account that one card in their
        deck is in the Command Zone (or two, when using Partners or similar
        mechanics).
      </Typography>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mt: 2, mb: 1 }}
      >
        Pros and cons
      </Typography>
      <ProsCons
        type="pro"
        items={[
          "Recognisable for constructed 1v1 players",
          "You will likely see most of your deck in one or two games",
        ]}
      />
      <ProsCons
        type="con"
        items={["Hard to use deckbuilding heuristics from other formats"]}
      />
      <Typography variant="h4" gutterBottom>
        40 cards
      </Typography>
      <Typography variant="body1" gutterBottom>
        40 Card decks have no official precedent in Commander constructed or
        limited, but were used for the multiplayer draft format{" "}
        <Link target="_blank" href="https://mtg.wiki/page/Conspiracy_Draft">
          Conspiracy Draft
        </Link>
        . It may look like an appealing option for limited players, who are used
        to building 40 card decks, but there are some notable downsides. The
        first is that your deck after adding one or two cards from your deck
        into the command zone and perhaps adding an extra land or even two, the
        amount of playables in your deck is quite low. The smaller deck in
        conjunction with Commander games generally taking longer than 1v1 games
        also makes "natural" decking out a real possibility - not what most
        Commander players sign up for.
      </Typography>
      <Typography
        variant="subtitle2"
        color="text.secondary"
        sx={{ mt: 2, mb: 1 }}
      >
        Pros and cons
      </Typography>
      <ProsCons
        type="pro"
        items={[
          "Recognisable for limited players",
          "You will certainly see most of your deck in one or two games",
        ]}
      />
      <ProsCons
        type="con"
        items={[
          "You have less room for playables than in a 1v1 limited game",
          "Naturally decking out is a real possibility",
        ]}
      />
      <Typography variant="h3" gutterBottom>
        Rules modifications
      </Typography>
    </>
  );
}
