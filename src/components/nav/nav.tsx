import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./nav.css";

interface NavProps {
  visible: boolean;
}

const Nav: React.FC<NavProps> = ({ visible }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isAuthenticated) {
      setMenuAnchorEl(event.currentTarget);
    }
  };

  const handleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/welcome");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAnchorEl(null);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleActionPageNavigate = () => {
    navigate("/action-page/published");
    handleClose();
  };

  const handleMyProjectsNavigate = () => {
    navigate("/my-projects");
    handleClose();
  };

  if (!visible) {
    return null;
  }

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#ffff", paddingBottom: "24px" }}
      className="navbar"
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!isAuthenticated && (
          <IconButton
            edge="start"
            sx={{ color: "#0E100F" }}
            aria-label="menu"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box
          sx={{
            flexGrow: 20,
            display: "flex",
            justifyContent: "center",
            width: "26.875rem",
          }}
        >
          <img
            src="https://res.cloudinary.com/dchzjr4bz/image/upload/v1710545748/Logo_A_bidb54.jpg"
            alt="Logo"
            style={{ maxHeight: 80 }}
            onClick={handleHomeClick}
          />
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <IconButton sx={{ color: "#0E100F" }} onClick={handleProfileMenu}>
          <AccountCircle sx={{ fontSize: 30 }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(menuAnchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Read</MenuItem>
          <MenuItem onClick={handleClose}>Write</MenuItem>
          <MenuItem onClick={handleClose}>Illustrate</MenuItem>
          <MenuItem onClick={handleClose}>Subscription Plans</MenuItem>
          <MenuItem onClick={handleClose}>About Us</MenuItem>
        </Menu>
        {isAuthenticated && (
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleActionPageNavigate}>
              Read, Write & Illustrate
            </MenuItem>
            <MenuItem onClick={handleMyProjectsNavigate}>
              My Projects
            </MenuItem>
            <MenuItem onClick={handleClose}>Notifications</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
