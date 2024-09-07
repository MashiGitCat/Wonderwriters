import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <Box className="footer">
      <Container maxWidth="lg">
        <Typography variant="body2" component="div" className="footer__content">
          <Link to="/about" className="footer__link">
            About
          </Link>
          <Link to="/terms-of-service" className="footer__link">
            Terms of Service
          </Link>
          <Link to="/privacy-policy" className="footer__link">
            Privacy Policy
          </Link>
          <Link to="/guidelines" className="footer__link">
            Guidelines
          </Link>
          <Link to="/qa-help" className="footer__link">
            Q&A Help
          </Link>
          <Link to="/updates" className="footer__link">
            Updates
          </Link>
          <Link to="/contact" className="footer__link">
            Contact Us
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
