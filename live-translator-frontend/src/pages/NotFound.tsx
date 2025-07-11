import React from "react";
import { Box, Typography } from "@mui/material";

const NotFound: React.FC = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{ fontSize: "6rem", fontWeight: 700, color: "#1976d2" }}
      >
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>
    </Box>
  );
};

export default NotFound;
