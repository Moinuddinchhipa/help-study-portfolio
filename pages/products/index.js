import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useProductsStore } from "../../stores/useProductsStore";
import PrivateRoute from "../../components/PrivateRoute";

export default function Products() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const limit = 10;

  const {
    products,
    categories,
    loading,
    error,
    total,
    fetchProducts,
    fetchCategories,
  } = useProductsStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts({ limit, skip: page * limit, q, category });
  }, [page, q, category]);

  return (
    <PrivateRoute>
      <Box
        sx={{
          backgroundColor: "#bcaaa4", // brown background
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
          Products
        </Typography>

        {/* Search + Category */}
        <Paper
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            backgroundColor: "#fff3e0", // light cream
          }}
        >
          <Box display="flex" gap={2}>
            <TextField
              label="Search products"
              value={q}
              fullWidth
              onChange={(e) => setQ(e.target.value)}
            />

            <TextField
              label="Category"
              select
              value={category}
              sx={{ width: 250 }}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(0);
              }}
            >
              <MenuItem value="">All</MenuItem>

              {/* FIXED CATEGORY ERROR */}
              {categories.map((cat) => (
                <MenuItem key={cat.slug || cat} value={cat.slug || cat}>
                  {cat.name || cat}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Paper>

        {/* PRODUCTS GRID */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={4}>
            {products.map((p) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={p.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: 5,
                    ":hover": { transform: "scale(1.03)", boxShadow: 10 },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={p.thumbnail}
                    height="180"
                    alt={p.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{p.title}</Typography>
                    <Typography>₹{p.price}</Typography>
                    <Typography>Rating: {p.rating}</Typography>
                    <Link href={`/products/${p.id}`}>View Details</Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </PrivateRoute>
  );
}
