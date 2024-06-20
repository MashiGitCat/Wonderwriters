import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark"; // Import the BookmarkIcon
import Drafts from "../components/drafts/draft";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`my-projects-tabpanel-${index}`}
      aria-labelledby={`my-projects-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const MyProjectsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="my projects tabs"
          TabIndicatorProps={{ style: { backgroundColor: "#1976d2" } }}
        >
          <Tab label="My Writings" />
          <Tab label="My Stories" />
          <Tab label="My Illustrations" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <Box display="flex" alignItems="center">
          <BookmarkIcon sx={{ fontSize: 30 }} /> {/* Add the BookmarkIcon */}
          <Typography variant="h5">DRAFTS</Typography>
        </Box>
        <Drafts />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        My Stories Content
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        My Illustrations Content
      </TabPanel>
    </Box>
  );
};

export default MyProjectsPage;
