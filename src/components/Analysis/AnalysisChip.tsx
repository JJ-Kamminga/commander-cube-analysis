import { Chip, ChipOwnProps } from "@mui/material"

export const AnalysisChip: React.FC<{ label: string, color?: ChipOwnProps['color'] }> = ({ label, color = 'primary' }) => {
  return (
    <Chip
      color={color}
      sx={{ margin: '2px' }}
      label={label} />
  )
}