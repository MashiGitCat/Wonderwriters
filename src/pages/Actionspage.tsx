import React, { useState, useEffect } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import "../components/wonderwriterscarousel/carousel.css";
import WriteFeature from "../components/writefeature/writefeature";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import WriteTab from "../components/writeslide/writeslide";

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
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ActionPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/action-page/published") {
      setSelectedTab(0);
    } else if (location.pathname === "/action-page/write") {
      setSelectedTab(1);
    } else if (location.pathname === "/action-page/illustrate") {
      setSelectedTab(2);
    } else if (location.pathname === "/action-page/write-illustrate") {
      setSelectedTab(3);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleBackNavigation = () => {
      if (location.pathname.startsWith("/action-page")) {
        navigate("/", { replace: true });
      }
    };

    window.addEventListener("popstate", handleBackNavigation);

    return () => {
      window.removeEventListener("popstate", handleBackNavigation);
    };
  }, [location, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    if (newValue === 0) {
      navigate("/action-page/published");
    } else if (newValue === 1) {
      navigate("/action-page/write");
    } else if (newValue === 2) {
      navigate("/action-page/illustrate");
    } else if (newValue === 3) {
      navigate("/action-page/write-illustrate");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="action tabs"
          TabIndicatorProps={{ style: { backgroundColor: "#1976d2" } }}
        >
          <Tab label="Published" />
          <Tab label="Write" />
          <Tab label="Illustrate" />
          <Tab label="Write & Illustrate" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        Published Content
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <WriteFeature nestedTab={null} setNestedTab={() => {}} />
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        Illustrate your thoughts.
      </TabPanel>
      <TabPanel value={selectedTab} index={3}>
        Combine writing and illustrations.
      </TabPanel>
      <Routes>
        <Route
          path="write-story"
          element={<WriteTab onExit={() => navigate("/action-page/write")} />}
        />
      </Routes>
    </Box>
  );
};

export default ActionPage;
