import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Paper, Button, CircularProgress } from "@mui/material";
import Link from "next/link";
import { useProductsStore } from "../../stores/useProductsStore";
import PrivateRoute from "../../components/PrivateRoute";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { fetchProductById } = useProductsStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>No product found.</Typography>;

  return (
    <PrivateRoute>
      <Box p={3}>
        <Button component={Link} href="/products" variant="outlined" sx={{ mb: 2 }}>Back to Products</Button>

        <Typography variant="h4" mb={2}>{product.title}</Typography>

        <Paper sx={{ p: 3 }}>
          <img src={product.thumbnail} alt={product.title} style={{ width: 300, borderRadius: 10 }} />
          <Typography mt={2}>{product.description}</Typography>
          <Typography>Price: ₹{product.price}</Typography>
          <Typography>Rating: {product.rating}</Typography>
          <Typography>Category: {product.category}</Typography>
        </Paper>
      </Box>
    </PrivateRoute>
  );
}
