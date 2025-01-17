import { Grid2 } from "@mui/material";

type AnalysisStepSubHeaderProps = {
  totalCount: number;
  categoryType: 'card' | 'pairing';
  label: string;
  description: string;
  draftPoolSize: number;
  countInDraftPool?: number;
};

export const AnalysisStepSubHeader: React.FC<AnalysisStepSubHeaderProps> = ({ totalCount, categoryType, label, countInDraftPool, draftPoolSize, description }) => {
  const prettifyCountLabel = (count: number) => count < 10 ? `00${count}` : count < 100 ? `0${count}` : count;

  const totalCountLabel = prettifyCountLabel(totalCount);
  const countInDraftPoolLabel = countInDraftPool && prettifyCountLabel(countInDraftPool)

  return (
    <>
      <Grid2 container spacing={2} >
        <Grid2 size={{ xs: 4, sm: 1 }} sx={{ textAlign: 'center', 'alignContent': 'center' }}>
          <span style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            padding: '5px',
            border: '10px inset orange',
            borderRadius: '50px',
          }}>
            {totalCountLabel}
          </span>
        </Grid2>
        <Grid2 size={{ xs: 8, sm: 11 }}>
          <h4 style={{ alignContent: 'center' }}>
            {<span style={{ visibility: 'hidden' }}>{totalCount}</span>}
            {label} in cube
          </h4>
        </Grid2>
      </Grid2 >
      {categoryType === 'card' ? (
        <Grid2 container spacing={2} >
          <Grid2 size={{ xs: 4, sm: 1 }} sx={{ textAlign: 'center', 'alignContent': 'center' }}>
            <span style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              padding: '5px',
              border: '10px inset #f444d1',
              borderRadius: '50px',
            }}>
              {countInDraftPoolLabel}
            </span>
          </Grid2>
          <Grid2 size={{ xs: 8, sm: 11 }}>
            <h4 style={{ alignContent: 'center' }}>
              {<span style={{ visibility: 'hidden' }}>{totalCount}</span>}
              on average in a draft pool of {draftPoolSize}
            </h4>
          </Grid2>
        </Grid2>
      ) : (
        <></>
      )
      }
      <p>{description} </p>
    </>
  );
};