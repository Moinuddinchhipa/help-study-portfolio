import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useUsersStore } from "../../stores/useUsersStore";
import PrivateRoute from "../../components/PrivateRoutes";

export default function UserDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { fetchUserById } = useUsersStore();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchUserById(id)
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user) return <Typography>No user found.</Typography>;

  return (
    <PrivateRoute>
      <Box p={3}>
        <Button component={Link} href="/users" variant="outlined" sx={{ mb: 2 }}>Back to Users</Button>

        <Typography variant="h4" mb={2}>{user.firstName} {user.lastName}</Typography>

        <Paper sx={{ p: 3 }}>
          <Typography>Email: {user.email}</Typography>
          <Typography>Phone: {user.phone}</Typography>
          <Typography>Age: {user.age}</Typography>
          <Typography>Gender: {user.gender}</Typography>
          <Typography>Company: {user.company?.name}</Typography>
        </Paper>
      </Box>
    </PrivateRoute>
  );
}
