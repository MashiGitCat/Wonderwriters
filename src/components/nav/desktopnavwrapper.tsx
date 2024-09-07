import React from "react";
import { useLocation } from "react-router-dom";
import DesktopNav from "../nav/desktopnav";

interface DesktopNavWrapperProps {
  isAuthenticated: boolean;
}

const DesktopNavWrapper: React.FC<DesktopNavWrapperProps> = ({
  isAuthenticated,
}) => {
  const location = useLocation();
  const hideOnDesktopNavRoutes = ["/login", "/signup"];

  const visible = !hideOnDesktopNavRoutes.includes(location.pathname);
  return <DesktopNav visible={visible} isAuthenticated={isAuthenticated} />;
};

export default DesktopNavWrapper;
