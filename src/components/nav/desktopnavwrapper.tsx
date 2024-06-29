// DesktopNavWrapper.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import DesktopNav from "../nav/desktopnav";

const DesktopNavWrapper: React.FC = () => {
  const location = useLocation();
  const hideOnDesktopNavRoutes = ["/login", "/signup"];

  const visible = !hideOnDesktopNavRoutes.includes(location.pathname);
  return <DesktopNav visible={visible} />;
};

export default DesktopNavWrapper;
