import PrivateRoute from "../components/PrivateRoute";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import Link from "next/link";

export default function Dashboard() {
  return (
    <PrivateRoute>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#b3e5fc", // sky blue
          p: 5,
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          color="blue"
          textAlign="center"
          mb={5}
        >
          Help Study Abroad - Admin Dashboard
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Users */}
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/users" style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  backgroundColor: "#ff5252", // red card
                  color: "white",
                  borderRadius: 3,
                  p: 2,
                  boxShadow: 5,
                  cursor: "pointer",
                  ":hover": { boxShadow: 10, transform: "scale(1.03)" },
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={600}>
                    Users
                  </Typography>
                  <Typography>View and search all users</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          {/* Products */}
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/products" style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  backgroundColor: "#ff4081", // pinkish red
                  color: "white",
                  borderRadius: 3,
                  p: 2,
                  boxShadow: 5,
                  cursor: "pointer",
                  ":hover": { boxShadow: 10, transform: "scale(1.03)" },
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight={600}>
                    Products
                  </Typography>
                  <Typography>Browse all products easily</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </PrivateRoute>
  );
}
