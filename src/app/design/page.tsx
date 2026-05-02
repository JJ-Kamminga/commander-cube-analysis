"use client";

import { useState } from "react";
import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { GoalsTab } from "./GoalsTab";
import { DraftingCommandersTab } from "./DraftingCommandersTab";
import { DraftAndDeckbuildingTab } from "./DraftAndDeckbuildingTab";
import { CardChoicesTab } from "./CardChoicesTab";

const tabs = [
  "Goals",
  "Drafting commanders",
  "Draft and deckbuilding",
  "Card choices",
];

export default function DesignPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Container>
      <Typography variant="h2">Commander Cube Design</Typography>
      <Typography variant="body1">
        Some tabs are still work in progress, please check back later!
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)}>
          {tabs.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ py: 3 }}>
        {activeTab === 0 && <GoalsTab />}
        {activeTab === 1 && <DraftingCommandersTab />}
        {activeTab === 2 && <DraftAndDeckbuildingTab />}
        {activeTab === 3 && <CardChoicesTab />}
      </Box>
    </Container>
  );
}
