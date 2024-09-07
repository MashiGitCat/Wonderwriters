import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface WriteFeatureProps {
  nestedTab: number | null;
  setNestedTab: React.Dispatch<React.SetStateAction<number | null>>;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nested-tabpanel-${index}`}
      aria-labelledby={`nested-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    display: "none",
  },
});

const CustomTab = styled(Tab)(({ theme }) => ({
  flex: 1,
  backgroundColor: "#FDBD29",
  color: "white",
  "&.Mui-selected": {
    backgroundColor: "#FD641F",
    color: "white",
  },
  "&.Mui-selected .MuiTab-wrapper": {
    borderBottom: "2px solid yellow",
  },
  "& .MuiTab-wrapper": {
    borderBottom: "2px solid orange",
  },
}));

const WriteFeature: React.FC<WriteFeatureProps> = ({
  nestedTab,
  setNestedTab,
}) => {
  const navigate = useNavigate();

  const handleNestedTabChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    if (newValue === 0) {
      navigate("/action-page/write-story");
    }
  };

  return (
    <>
      <Card sx={{ display: "flex", maxWidth: 600, mb: 2 }}>
        <CardMedia
          component="img"
          sx={{ width: 140 }}
          image="https://res.cloudinary.com/maheshidevelopments/image/upload/v1717975473/Book_Wall_Art_Book_Lover_Gift_Reading_Art_Print_Book_Lover_Art_Print_Reading_Illustration_Book_Print_Unique_Nursery_Decor_Book_Art_-_Etsy.jpg"
          alt="Book Lover Art"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography component="div" variant="h5">
              Place to start writing your story
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Write with words and complete it with pictures.
            </Typography>
          </CardContent>
        </Box>
      </Card>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <CustomTabs
          value={nestedTab !== null ? nestedTab : false}
          onChange={handleNestedTabChange}
          aria-label="nested tabs"
        >
          <CustomTab label="Start Write Your Story" />
          <CustomTab label="My Uploads" />
        </CustomTabs>
      </Box>
      <TabPanel value={nestedTab !== null ? nestedTab : -1} index={1}>
        Your uploads will appear here...
      </TabPanel>
    </>
  );
};

export default WriteFeature;
