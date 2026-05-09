"use client";

import { useState } from "react";
import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { GoalsTab } from "./GoalsTab";
import { DraftingCommandersTab } from "./DraftingCommandersTab";
import { DraftAndDeckbuildingTab } from "./DraftAndDeckbuildingTab";
import { CardChoicesTab } from "./CardChoicesTab";
import { RulesTab } from "./RulesTab";

const tabs = [
  "Goals",
  "Drafting commanders",
  "Rules",
  "Draft and deckbuilding",
  "Card choices",
];

export default function GuidePage() {
  const [activeTab, setActiveTab] = useState(() => {
    const stored = localStorage.getItem("guide:activeTab");
    const parsed = stored !== null ? parseInt(stored, 10) : NaN;
    return !isNaN(parsed) && parsed < tabs.length ? parsed : 0;
  });

  const handleTabChange = (_: React.SyntheticEvent, value: number) => {
    setActiveTab(value);
    localStorage.setItem("guide:activeTab", String(value));
  };

  const goToTab = (index: number) => {
    setActiveTab(index);
    localStorage.setItem("guide:activeTab", String(index));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      <Typography variant="h2">Commander Cube Design Guide</Typography>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          {tabs.map((label) => (
            <Tab key={label} label={label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ py: 3 }}>
        {activeTab === 0 && <GoalsTab />}
        {activeTab === 1 && <DraftingCommandersTab />}
        {activeTab === 2 && <RulesTab />}
        {activeTab === 3 && <DraftAndDeckbuildingTab />}
        {activeTab === 4 && <CardChoicesTab />}

        {(activeTab > 0 || activeTab < tabs.length - 1) && (
          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Box>
              {activeTab > 0 && (
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => goToTab(activeTab - 1)}
                >
                  {tabs[activeTab - 1]}
                </Button>
              )}
            </Box>
            <Box>
              {activeTab < tabs.length - 1 && (
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => goToTab(activeTab + 1)}
                >
                  {tabs[activeTab + 1]}
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}
