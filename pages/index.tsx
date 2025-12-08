// pages/index.tsx
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Box, TextField, Button, Typography, Paper, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("kminchelle"); // default demo
  const [password, setPassword] = useState("0lelplR"); // default demo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if logged in
  if (status !== "loading" && session?.accessToken) {
    router.push("/dashboard");
    return <p>Redirecting to Dashboard...</p>;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0f7fa",
      }}
    >
      <Paper
        sx={{
          p: 5,
          width: 400,
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: "#ffffff",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Avatar sx={{ m: 1, bgcolor: "#00bcd4" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" fontWeight={600}>
            Admin Login
          </Typography>
        </Box>

        {error && (
          <Typography color="error" mb={2} textAlign="center">
            {error}
          </Typography>
        )}

        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ mb: 2, backgroundColor: "#f1f8e9", borderRadius: 1 }}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ mb: 3, backgroundColor: "#f1f8e9", borderRadius: 1 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ bgcolor: "#00bcd4", ":hover": { bgcolor: "#0097a7" } }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
