import { Chip } from "@mui/material"

export const AnalysisChip: React.FC<{ label: string }> = ({ label }) => {
  return (
    <Chip
      color='primary'
      sx={{ margin: '2px' }}
      label={label} />
  )
}