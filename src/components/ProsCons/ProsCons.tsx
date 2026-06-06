import { Box, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

interface ProsConsProps {
  items: string[];
  type: "pro" | "con";
}

export function ProsCons({ items, type }: ProsConsProps) {
  const Icon = type === "pro" ? ThumbUpIcon : ThumbDownIcon;
  const color = type === "pro" ? "success" : "error";

  return (
    <Box>
      {items.map((item) => (
        <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          <Icon fontSize="small" color={color} />
          <Typography variant="body2" color="text.primary">{item}</Typography>
        </Box>
      ))}
    </Box>
  );
}
