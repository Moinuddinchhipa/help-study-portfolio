import React from "react";
import Navbar from "./Navbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
        <Box>{children}</Box>
      </Container>
    </>
  );
}
