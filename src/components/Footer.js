import { Box } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Email } from "@mui/icons-material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "rgba(0,0,0,.7)",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ color: "#fafafa" }}>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook
              sx={{
                fontSize: "2rem",
                mr: 2,
                color: "#fff",
                "&:hover": { color: "#3b5998" },
              }}
            />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram
              sx={{
                fontSize: "2rem",
                mr: 2,
                color: "#fff",
                "&:hover": { color: "#e4405f" },
              }}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/jayashreemorejaya/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedIn
              sx={{
                fontSize: "2rem",
                mr: 2,
                color: "#fff",
                "&:hover": { color: "#0077b5" },
              }}
            />
          </a>
          <a
            href="mailto:your-email@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Email
              sx={{
                fontSize: "2rem",
                color: "#fff",
                "&:hover": { color: "#ff0000" },
              }}
            />
          </a>
        </Box>
      </Box>
      <Box
        sx={{
          bgcolor: "rgba(0,0,0,.7)",
          height: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ color: "#fafafa" }}>
          &copy; {new Date().getFullYear()} Jays's Blog. All Rights Reserved.
        </Box>
      </Box>
    </>
  );
};

export default Footer;
