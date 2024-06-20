import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "./nav";

const NavWrapper: React.FC = () => {
  const location = useLocation();
  const hideNavOnRoutes = [
    "/welcome",
    "/login",
    "/signup",
    "/action-page",
    "/write",
    "my-projects",
  ];
  const visible = !hideNavOnRoutes.includes(location.pathname);

  return <Nav visible={visible} />;
};

export default NavWrapper;
