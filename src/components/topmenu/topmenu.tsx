import React from "react";
import {
  Paper,
  Button,
  Select,
  MenuItem,
  styled,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./topmenu.css";

interface TopMenuProps {
  onSave: () => void;
  onExit: () => void;
  onFontChange: (font: string) => void;
  hasUnsavedChanges: boolean;
  onOpenExitPopup: () => void;
  exitLabel: string;
}

const MenuBar = styled(Paper)({
  height: "65px",
  width: "85%",
  position: "fixed",
  top: 0,
  zIndex: 1001,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#F2F2F2",
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 19px 0 rgba(0, 0, 0, .7)",
  padding: "0 20px",
  fontSize: ".7em",
  fontWeight: 700,
  lineHeight: 1,
});

const MenuButtons = styled(Box)({
  display: "flex",
  gap: "10px",
});

const Logo = styled("div")({
  textAlign: "center",
  img: {
    borderRadius: "50%", // Makes the logo rounded
    backgroundColor: "transparent", // Ensures no background color
    height: "50px", // Adjust height as needed
    width: "50px", // Adjust width as needed to maintain aspect ratio
    objectFit: "cover", // Ensures the image covers the area without distortion
  },
});

const TopMenu: React.FC<TopMenuProps> = ({
  onSave,
  onExit,
  onFontChange,
  hasUnsavedChanges,
  onOpenExitPopup,
  exitLabel,
}) => {
  const navigate = useNavigate();
  const [font, setFont] = React.useState("");

  const handleFontChange = (event: SelectChangeEvent<string>) => {
    const selectedFont = event.target.value as string;
    setFont(selectedFont);
    onFontChange(selectedFont);
  };

  const handleExitClick = () => {
    if (hasUnsavedChanges) {
      onOpenExitPopup();
    } else {
      onExit();
    }
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <MenuBar className="topmenu__font">
      <MenuButtons>
        <Button className="topmenu__button" onClick={handleExitClick}>
          {exitLabel} {/* Use exitLabel prop */}
        </Button>
        <Button id="save_button" className="topmenu__button" onClick={onSave}>
          Save
        </Button>
      </MenuButtons>
      <Logo onClick={handleLogoClick}>
        <img
          src="https://res.cloudinary.com/maheshidevelopments/image/upload/v1717889883/Logo_A.jpg"
          className="storybird-logo-inner"
          alt="Logo"
        />
      </Logo>
      <Select
        value={font}
        onChange={handleFontChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        className="topmenu__select"
      >
        <MenuItem value="" disabled>
          FONT
        </MenuItem>
        <MenuItem value="Helvetica">Helvetica</MenuItem>
        <MenuItem value="Arial">Arial</MenuItem>
        <MenuItem value="Times New Roman">Times New Roman</MenuItem>
        <MenuItem value="Courier New">Courier New</MenuItem>
      </Select>
    </MenuBar>
  );
};

export default TopMenu;
