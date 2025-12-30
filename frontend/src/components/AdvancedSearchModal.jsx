import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import axios from "axios";

const USERS_API = "http://localhost:9000/api/users";
const PRODUCTS_API = "http://localhost:9000/api/products";

const AdvancedSearchModal = ({ open, onClose, onApply }) => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    user_id: "",
    user_gender: "",
    product_id: "",
    product_category: "",
    order_status: "",
    start_date: "",
    end_date: "",
    min_total: "",
    max_total: "",
  });

  useEffect(() => {
    axios.get(USERS_API).then(res => setUsers(res?.data?.data || []));
    axios.get(PRODUCTS_API).then(res => setProducts(res?.data?.data || []));
  }, []);

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleApply = () => {
    const filters = [];

    Object.entries(form).forEach(([key, value]) => {
      if (value !== "") {
        filters.push({ key, value });
      }
    });

    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setForm({
      user_id: "",
      user_gender: "",
      product_id: "",
      product_category: "",
      order_status: "",
      start_date: "",
      end_date: "",
      min_total: "",
      max_total: "",
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Advanced Order Search</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>

          <TextField
            select
            label="User"
            value={form.user_id}
            onChange={handleChange("user_id")}
            fullWidth
          >
            <MenuItem value="">All Users</MenuItem>
            {users.map(u => (
              <MenuItem key={u.id} value={u.id}>
                {u.first_name} {u.last_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="User Gender"
            value={form.user_gender}
            onChange={handleChange("user_gender")}
            fullWidth
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>

          <TextField
            select
            label="Product"
            value={form.product_id}
            onChange={handleChange("product_id")}
            fullWidth
          >
            <MenuItem value="">All Products</MenuItem>
            {products.map(p => (
              <MenuItem key={p.id} value={p.id}>
                {p.product_name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Product Category"
            value={form.product_category}
            onChange={handleChange("product_category")}
            fullWidth
          />

          <TextField
            select
            label="Order Status"
            value={form.order_status}
            onChange={handleChange("order_status")}
            fullWidth
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="placed">Placed</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Start Date"
              type="date"
              value={form.start_date}
              onChange={handleChange("start_date")}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              label="End Date"
              type="date"
              value={form.end_date}
              onChange={handleChange("end_date")}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              label="Min Total Amount"
              type="number"
              value={form.min_total}
              onChange={handleChange("min_total")}
              fullWidth
            />

            <TextField
              label="Max Total Amount"
              type="number"
              value={form.max_total}
              onChange={handleChange("max_total")}
              fullWidth
            />
          </Stack>

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleReset} color="secondary">
          Reset
        </Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} variant="contained">
          Apply Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdvancedSearchModal;
