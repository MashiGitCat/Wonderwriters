import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import NavWrapper from "./components/nav/navwrapper";
import DesktopNav from "./components/nav/desktopnav";
import WelcomePage from "./pages/Welcomepage";
import LoginPage from "./pages/Loginpage";
import SignupPage from "./pages/Signuppage";
import Home from "./pages/Homepage";
import ActionPage from "./pages/Actionspage";
import WriteTab from "./components/writeslide/writeslide";
import MyProjectsPage from "./pages/Projectspage";
import { useMediaQuery } from "@mui/material";

const App = () => (
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Router>
      <Main />
    </Router>
  </LocalizationProvider>
);

const Main = () => {
  const location = useLocation();
  const hideNavOnRoutes = [
    "/action-page/write-story",
    "/action-page/published",
    "/action-page/write",
    "/action-page/illustrate",
    "/action-page/write-illustrate",
    "/my-projects",
  ];
  const showNav = !hideNavOnRoutes.includes(location.pathname);
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width:1280px)");

  return (
    <>
      {showNav && (isDesktop ? <DesktopNav /> : <NavWrapper />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/action-page/*" element={<ActionPage />} />
        <Route path="/my-projects" element={<MyProjectsPage />} />
        <Route
          path="/action-page/write-story"
          element={<WriteTab onExit={() => navigate("/action-page/write")} />}
        />
      </Routes>
    </>
  );
};

export default App;
