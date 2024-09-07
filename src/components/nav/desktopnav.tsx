import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import "./desktopnav.css";

interface DesktopNavProps {
  visible: boolean;
  isAuthenticated: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  visible,
  isAuthenticated,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const secondaryNav = document.querySelector(
        ".secondary-nav"
      ) as HTMLElement;
      if (secondaryNav) {
        secondaryNav.style.display = "block";
      }
    }
  }, [isAuthenticated]);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!visible) {
    return null;
  }

  return (
    <>
      <AppBar position="static" className="desktop-nav">
        <Toolbar>
          <Box className="desktop-nav__logo">
            <img
              src="https://res.cloudinary.com/maheshidevelopments/image/upload/c_pad,w_300,h_169,ar_16:9/v1719869180/Photoroom_20240630_032335.png"
              alt="Logo"
              onClick={() => handleNavigate("/")}
            />
          </Box>
          <Box className="desktop-nav__links">
            <Button color="inherit" onClick={() => handleNavigate("/read")}>
              <Typography variant="h6">Read</Typography>
            </Button>
            <Button color="inherit" onClick={() => handleNavigate("/write")}>
              <Typography variant="h6">Write</Typography>
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigate("/illustrate")}
            >
              <Typography variant="h6">Illustrate</Typography>
            </Button>
            <Button
              color="inherit"
              onClick={() => handleNavigate("/subscription-plans")}
            >
              <Typography variant="h6">Subscription Plans</Typography>
            </Button>
            <Button color="inherit" onClick={() => handleNavigate("/about-us")}>
              <Typography variant="h6">About Us</Typography>
            </Button>
          </Box>
          <Box className="desktop-nav__auth-buttons">
            {!isAuthenticated ? (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleNavigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNavigate("/signup")}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                onClick={handleLogout}
                className="logout-button"
              >
                Log Out
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {isAuthenticated && (
        <AppBar position="static" className="desktop-nav secondary-nav">
          <Toolbar>
            <Box className="desktop-nav__links secondary-nav__links">
              <Button
                color="inherit"
                onClick={() => handleNavigate("/action-page/published")}
              >
                <Typography variant="h6">Read, Write & Illustrate</Typography>
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigate("/my-projects")}
              >
                <Typography variant="h6">My Projects</Typography>
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigate("/notifications")}
              >
                <Typography variant="h6">Notifications</Typography>
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigate("/profile")}
              >
                <Typography variant="h6">Profile</Typography>
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export default DesktopNav;
