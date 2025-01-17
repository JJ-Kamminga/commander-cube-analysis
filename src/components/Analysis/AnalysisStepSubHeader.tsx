import { Grid2 } from "@mui/material";

type AnalysisStepSubHeaderProps = {
  totalCount: number,
  label: string,
  description: string,
};

export const AnalysisStepSubHeader: React.FC<AnalysisStepSubHeaderProps> = ({ totalCount, label, description }) => {
  const countLabel = totalCount < 10 ? `00${totalCount}` : totalCount < 100 ? `0${totalCount}` : totalCount;

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
            {countLabel}
          </span>
        </Grid2>
        <Grid2 size={{ xs: 8, sm: 11 }}>
          <h4 style={{ alignContent: 'center' }}>
            {<span style={{ visibility: 'hidden' }}>{totalCount}</span>}
            {label}
          </h4>
        </Grid2>
      </Grid2 >
      <p>{description} </p>
    </>
  );
};