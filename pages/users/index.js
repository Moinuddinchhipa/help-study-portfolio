import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import PrivateRoute from "../../components/PrivateRoute";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users API
  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("https://dummyjson.com/users?limit=20");
        const data = await res.json();
        setUsers(data.users);
      } catch (e) {
        console.error("Failed to load users:", e);
      }
      setLoading(false);
    }
    loadUsers();
  }, []);

  return (
    <PrivateRoute>
      <Box
        sx={{
          backgroundColor: "#bcaaa4", // brown shade
          minHeight: "100vh",
          p: 5,
        }}
      >
        <Typography
          variant="h3"
          color="blue"
          fontWeight={700}
          textAlign="center"
          mb={4}
        >
          Users List
        </Typography>

        <Paper
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: "#fff3e0", // light yellow-orange
            boxShadow: 4,
          }}
        >
          {loading ? (
            <Box sx={{ textAlign: "center", py: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Phone</b></TableCell>
                  <TableCell><b>Age</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.age}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Box>
    </PrivateRoute>
  );
}
