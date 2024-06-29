import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import "./nav.css";

interface NavProps {
  visible: boolean;
}

const Nav: React.FC<NavProps> = ({ visible }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleDrawer = (drawer: "menu" | "profile", open: boolean) => {
    if (drawer === "menu") {
      setDrawerOpen(open);
    } else {
      setProfileDrawerOpen(open);
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
    setProfileDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
    setProfileDrawerOpen(false);
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      toggleDrawer("profile", true);
    } else {
      navigate("/welcome");
    }
  };

  if (!visible) {
    return null;
  }

  const menuList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer("menu", false)}
      onKeyDown={() => toggleDrawer("menu", false)}
      className="drawer-content"
    >
      <List>
        <ListItem onClick={() => handleNavigate("/read")}>
          <ListItemText primary="Read" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/write")}>
          <ListItemText primary="Write" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/illustrate")}>
          <ListItemText primary="Illustrate" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/subscription-plans")}>
          <ListItemText primary="Subscription Plans" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/about-us")}>
          <ListItemText primary="About Us" />
        </ListItem>
      </List>
    </Box>
  );

  const profileList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => toggleDrawer("profile", false)}
      onKeyDown={() => toggleDrawer("profile", false)}
      className="drawer-content"
    >
      <List>
        <ListItem onClick={() => handleNavigate("/read")}>
          <ListItemText primary="Read" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/write")}>
          <ListItemText primary="Write" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/illustrate")}>
          <ListItemText primary="Illustrate" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/subscription-plans")}>
          <ListItemText primary="Subscription Plans" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/about-us")}>
          <ListItemText primary="About Us" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="fullWidth" />
        <ListItem onClick={() => handleNavigate("/action-page/published")}>
          <ListItemText primary="Read, Write & Illustrate" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/my-projects")}>
          <ListItemText primary="My Projects" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/notifications")}>
          <ListItemText primary="Notifications" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={() => handleNavigate("/profile")}>
          <ListItemText primary="Profile" />
        </ListItem>
        <Divider className="navbar__divider-color" variant="middle" />
        <ListItem onClick={handleLogout}>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#ffff", paddingBottom: "24px" }} className="navbar">
        <Toolbar className={`navbar__toolbar ${isAuthenticated ? "navbar__toolbar--authenticated" : ""}`}>
          {!isAuthenticated && (
            <Box className="navbar__left">
              <IconButton edge="start" sx={{ color: "#0E100F" }} aria-label="menu" onClick={() => toggleDrawer("menu", true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          <Box className={`navbar__center ${isAuthenticated ? "navbar__center--left" : ""}`}>
            <img
              src="https://res.cloudinary.com/dchzjr4bz/image/upload/v1710545748/Logo_A_bidb54.jpg"
              alt="Logo"
              style={{ maxHeight: 80, cursor: "pointer" }}
              onClick={() => handleNavigate("/")}
            />
          </Box>

          <Box className="navbar__right">
            <IconButton sx={{ color: "#0E100F" }} onClick={handleProfileClick} className="navbar__profile-icon">
              <AccountCircle sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer("menu", false)} PaperProps={{ className: 'navbar__drawer-paper' }}>
        {menuList}
      </Drawer>

      <Drawer anchor="right" open={profileDrawerOpen} onClose={() => toggleDrawer("profile", false)} PaperProps={{ className: 'navbar__drawer-paper' }}>
        {profileList}
      </Drawer>
    </>
  );
};

export default Nav;
