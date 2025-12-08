import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuthStore } from "../stores/useAuthStore";
import { signOut, useSession } from "next-auth/react";
import Box from "@mui/material/Box";

const Navbar = React.memo(function Navbar() {
  const { data: session } = useSession();
  const logout = useAuthStore((state) => state.clear);

  const handleLogout = async () => {
    logout(); // Clear Zustand
    await signOut({ redirect: false }); // Clear NextAuth session
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">
          Help Study Abroad - Admin
        </Typography>

        {session ? (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Link href="/users" passHref>
              <Button color="inherit">Users</Button>
            </Link>
            <Link href="/products" passHref>
              <Button color="inherit">Products</Button>
            </Link>
            <Typography variant="body2">
              {session.user?.username || session.user?.firstName}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Link href="/login" passHref>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
});

export default Navbar;
