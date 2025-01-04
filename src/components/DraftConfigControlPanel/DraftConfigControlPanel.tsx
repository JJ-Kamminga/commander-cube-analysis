import { Chip, Slider, Stack } from "@mui/material";
import { cardsPerPackMarks, packsPerPlayerMarks, playerCountMarks } from "./config";
import { DashboardCustomize, FilterNone, Group } from "@mui/icons-material";

type DraftConfigControlProps = {
  playerCount: number;
  packsPerPlayer: number;
  cardsPerPack: number;
  totalCubeCount: number;
  onPlayerCountChange: (playerCount: number) => void;
  onPacksPerPlayerChange: (packsPerPlayer: number) => void;
  onCardsPerPackChange: (cardsPerPack: number) => void;
}


export const DraftConfigControlPanel: React.FC<DraftConfigControlProps> = ({ ...props }) => {
  const { playerCount, packsPerPlayer, cardsPerPack, totalCubeCount, onPlayerCountChange, onPacksPerPlayerChange, onCardsPerPackChange } = props;
  const draftPoolSize = playerCount * packsPerPlayer * cardsPerPack;
  const isConfigGreaterThanCube = draftPoolSize > totalCubeCount;

  const handlePlayerCountChange = (event: Event, newValue: number | number[]) => {
    onPlayerCountChange(newValue as number);
  };

  const handlePacksPerPlayerChange = (event: Event, newValue: number | number[]) => {
    onPacksPerPlayerChange(newValue as number);
  };

  const handleCardsPerPackChange = (event: Event, newValue: number | number[]) => {
    onCardsPerPackChange(newValue as number);
  };

  return (
    <div id="draftConfigControlPanel">
      <h3>Change your draft configuration</h3>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <Group />
        <label>Number of players</label>
        <Slider
          marks={playerCountMarks}
          min={playerCountMarks[0].value}
          max={playerCountMarks.findLast(value => value)?.value}
          aria-label="player count"
          value={playerCount}
          onChange={handlePlayerCountChange}
          valueLabelDisplay="auto"

        />
      </Stack>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <DashboardCustomize /><label>Packs per player</label>
        <Slider
          marks={packsPerPlayerMarks}
          min={packsPerPlayerMarks[0].value}
          max={packsPerPlayerMarks.findLast(value => value)?.value}
          aria-label="packs per player"
          value={packsPerPlayer}
          onChange={handlePacksPerPlayerChange}
          valueLabelDisplay="auto"
        />
      </Stack>
      <Stack spacing={2} direction="row" sx={{ alignItems: 'center', mb: 1 }}>
        <FilterNone />
        <label>Cards per pack</label>
        <Slider
          marks={cardsPerPackMarks}
          min={cardsPerPackMarks[0].value}
          max={cardsPerPackMarks.findLast(value => value)?.value}
          aria-label="cards per pack"
          value={cardsPerPack}
          onChange={handleCardsPerPackChange}
          valueLabelDisplay="auto"
        />
      </Stack>
      <p>
        Your draft pool will contain
        <Chip label={playerCount * packsPerPlayer * cardsPerPack} color="info" sx={
          {
            fontSize: '1.1em',
            margin: '5px',
            paddingTop: '2px',
          }
        } />
        cards.
      </p>
      {isConfigGreaterThanCube
        ? (
          <p>
            Your cube only contains
            <Chip label={totalCubeCount} color="warning" sx={
              {
                fontSize: '1.1em',
                margin: '5px',
                paddingTop: '2px',
              }
            } />
            cards. <b>Displayed statistics are hypothetical</b>, assuming a cube size increase of equal ratios.
          </p>
        )
        : (<></>)
      }
    </div>
  )
};