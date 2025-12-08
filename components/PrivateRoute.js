import React from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useAuthStore } from "../stores/useAuthStore";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function PrivateRoute({ children }) {
  const { status, data: session } = useSession();
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const isAuth = !!(token || session?.accessToken);
  if (!isAuth) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }

  return <>{children}</>;
}
