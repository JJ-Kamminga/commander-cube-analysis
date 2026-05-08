import { Typography } from "@mui/material";

export function GoalsTab() {
  return (
    <>
      <Typography variant="h3" gutterBottom>
        Start with your goals
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        What do you want your players to experience? Elder Dragon Highlander,
        like the good old days? High powered, CEDH like gameplay? Or perhaps
        just capture that era when Commander was supported, but Wizards&apos;
        <i>Year of Commander</i> hadn&apos;t messed everything up yet? Do you
        miss Hullbreacher?
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        This is the most important question, as it will decide some of the key
        cards of your environment. The inclusion of modern power outliers will
        dictate what the powerful decks look like. The inclusion of fast mana
        (yes, that includes Sol Ring) will dictate the pace of games, and risks
        swingyness. Reversely, if you want Vaevictis Asmadi to be a meaningful
        card - you know many of those new cards will take the spotlight away
        from it.
      </Typography>
    </>
  );
}
