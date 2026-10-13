import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
        primarily mean deck size and life total, but there are more tweaks and
        modifications we can make.
      </Typography>
      <Typography variant="body1" color="text.primary" gutterBottom>
        The primary consideration is deck size. I will discuss three common deck
        size options: 100, 60 and 40 cards. The{" "}
        <Link target="_blank" href={"https://mtg.wiki/page/Tiny_Leaders"}>
          Tiny Leaders
        </Link>{" "}
        format deserves a special shoutout for its 50 card deck rule, but will
        not be discussed in detail here.
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        You can click option headers to expand or hide them.
      </Typography>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h3">Deck size</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="h4" gutterBottom>
            100 cards
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Deck size is the first rule you may want to change from constructed
            Commander. In the average game, you don&apos;t get to see the bottom
            half of a 100 card deck. This is fine when playing a deck multiple
            times, but not so much when you only play it once or twice.
          </Typography>
          <Typography variant="body1">
            Another factor is that the consistency of decks will already be
            lower than in constructed Commander due to the nature of draft. 100
            card decks will need bigger draft pools, maybe close to 100 cards (5
            packs of 20). Drafting and deckbuilding will take very long, and
            games will more often feature the &quot;duds&quot; of a draft pool.
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
              "Drafting and deckbuilding takes more time",
              "You will likely not see all of your cards in the first one or two games",
              "Hard to make consistent limited decks of this size",
            ]}
          />
          <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
            60 cards
          </Typography>
          <Typography variant="body1" gutterBottom>
            Wizards of the Coast landed on 60 cards as the deck size of choice
            for limited Commander formats. Both the Commander Legends sets and
            Commander Masters used 60 card decks. We do not know the exact
            reasoning behind this number, but 60 card decks dodge some of the
            problems with both 100 and 40 card decks (read on below).
          </Typography>
          <Typography variant="body1" gutterBottom>
            The main downside of 60 card is that players cannot rely on
            heuristics from other formats for their land, ramp and spell counts.
            Commander rules of thumb often dictate less easily divisible
            numbers, like 37 for lands, making it hard to do quick math on
            ratios for a 60 card deck. The same is true for 40 card limited
            heuristics. 60 Card constructed players have an easier time
            adjusting, but need to account for the higher curves and should
            probably still play more lands than they are used to. And all
            non-Commander players need to take into account that one card in
            their deck is in the Command Zone (or two, when using Partners or
            similar mechanics).
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
          <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
            40 cards
          </Typography>
          <Typography variant="body1" gutterBottom>
            40 Card decks have no official precedent in Commander constructed or
            limited, but were used for the multiplayer draft format{" "}
            <Link target="_blank" href="https://mtg.wiki/page/Conspiracy_Draft">
              Conspiracy Draft
            </Link>
            . It may look like an appealing option for limited players, who are
            used to building 40 card decks, but there are some notable
            downsides. The first is that your deck after adding one or two cards
            from your deck into the command zone and perhaps adding an extra
            land or even two, the amount of playables in your deck is quite low.
            The smaller deck in conjunction with Commander games generally
            taking longer than 1v1 games also makes &ldquo;natural&ldquo;
            decking out a real possibility - not what most Commander players
            sign up for.
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
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h3">Life total</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" gutterBottom>
            Life total is less of an intricate discussion, because it is
            ultimately quite simple: lower life totals lead to shorter games. If
            you enjoy that, consider 20 (as in{" "}
            <Link
              target="_blank"
              href={"https://mtg.wiki/page/Conspiracy_Draft"}
            >
              Conspiracy Draft
            </Link>{" "}
            and any other format), 25 (as in{" "}
            <Link target="_blank" href={"https://mtg.wiki/page/Brawl"}>
              Brawl
            </Link>{" "}
            and Tiny Leaders) or 30 (as in{" "}
            <Link target="_blank" href={"https://mtg.wiki/page/Standard_Brawl"}>
              multiplayer Standard Brawl
            </Link>
            ). If you like slow games just fine or your format is powerful
            enough, just stick to 40.
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            A sidenote on Commander damage
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Commander Damage being 21 has a bit of a backstory: 21 is 3 hits
            from a 7-power Elder Dragon. Whatever life total you decide to use,
            I recommend keeping the Commander Damage rule. It is a generally
            agreed useful tool in the format, allowing decks to break through
            very high life totals and offering another angle of strategy for
            Voltron decks and others.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h3">Rules modifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" gutterBottom>
            All the problems listed on this page could in theory be solved by
            rules modifications. But I would echo{" "}
            <Link
              target="_blank"
              href={
                "https://luckypaper.co/podcast/152-the-risks-and-rewards-of-custom-rules-in-cube/"
              }
            >
              Lucky Paper Radio
            </Link>{" "}
            in saying that rules modifications should be used with care. They
            can easily create greater complexity than they (hope to) solve. That
            said, there are some rules modifications that have found adoption in
            the community. I will discuss two.
          </Typography>
          <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
            Colour identity
          </Typography>
          <Typography variant="body1" gutterBottom>
            Colour identity is a strange beast of Magic rules. A somewhat
            artificial restriction on card inclusions in the first place, in
            draft it can incentivise &quot;just&quot; playing commanders with
            more colours to have access to more good cards - hurting the
            viability of mono and two coloured commanders.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The most common rules modification is one that tackles exactly this
            problem. I have not been able to verify who invented this rule, but
            it has gained traction through some popular cubes, among which Sam
            Black&apos;s{" "}
            <Link
              target="_blank"
              href={"https://cubecobra.com/cube/list/38rph"}
            >
              Commander Cube
            </Link>{" "}
            and Gwen Dekker&apos;s{" "}
            <Link
              target="_blank"
              href={"https://cubecobra.com/cube/list/tinyleaders"}
            >
              Tiny Leaders
            </Link>{" "}
            cube. It goes as follows:{" "}
            <b>
              you may play any card in your deck, but you may only include basic
              lands that match your Commander&apos;s colour identity.
            </b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            This rule gives players interesting options for splashes (a common
            limited phenomenon) as well as card options that are not even legal
            in constructed Commander, with a clear tradeoff: they have to draft
            their own off-colour fixing.
          </Typography>
          <Typography variant="h4" sx={{ mt: 3 }} gutterBottom>
            Deck count excludes Commander(s)
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            Following official commander rules, your Commander or Commander
            pairing is part of your deck, making them cards 100 and 99.
            Converting heuristics for the amount of lands you need to run,
            you&apos;ll find that this throws the calculation off slightly. Some
            people therefore choose to have the commander(s) count &quot;on
            top&quot; of the deck count, making it the 61st and 62nd card(s)
            when playing 60 card decks, for example.
          </Typography>
          <Typography variant="body1" color="text.primary" gutterBottom>
            I felt this rules modification deserved a mention, although I do not
            recommend trying it unless you explicitly encounter the problem of
            players misjudging their land counts in your playgroup.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
