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
import { getFilters } from "../services/api"; 
import axios from "axios";

const USERS_API = "http://localhost:9000/api/users"; 
const PRODUCTS_API = "http://localhost:9000/api/products"; 

const AdvancedSearchModal = ({ open, onClose, onApply }) => {
  const [filtersConfig, setFiltersConfig] = useState([]);
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (open) {
      getFilters()
        .then(res => {
          const configs = res?.data?.data.data || [];
          setFiltersConfig(configs);

          const initialForm = {};
          configs.forEach(f => initialForm[f.key] = "");
          setForm(initialForm);
        })
        .catch(console.error);

      axios.get(USERS_API).then(res => setUsers(res?.data?.data || [])).catch(console.error);
      axios.get(PRODUCTS_API).then(res => setProducts(res?.data?.data || [])).catch(console.error);
    }
  }, [open]);

  const handleChange = (key) => (e) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const handleApply = () => {
    const filtersArray = [];
    Object.entries(form).forEach(([key, value]) => {
      if (value !== "") filtersArray.push({ key, value });
    });
    onApply(filtersArray);
    onClose();
  };

  const handleReset = () => {
    const resetForm = {};
    filtersConfig.forEach(f => resetForm[f.key] = "");
    setForm(resetForm);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Advanced Order Search</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {filtersConfig.map(f => {
            if (f.type === "enum") {
              return (
                <TextField
                  key={f.key}
                  select
                  label={f.title}
                  value={form[f.key]}
                  onChange={handleChange(f.key)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="">Any</MenuItem>
                  {f.options?.map(opt => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                  ))}
                </TextField>
              );
            }

            if (f.key === "user_id") {
              return (
                <TextField
                  key={f.key}
                  select
                  label={f.title}
                  value={form[f.key]}
                  onChange={handleChange(f.key)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="">All Users</MenuItem>
                  {users.map(u => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.first_name} {u.last_name}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            if (f.key === "product_id") {
              return (
                <TextField
                  key={f.key}
                  select
                  label={f.title}
                  value={form[f.key]}
                  onChange={handleChange(f.key)}
                  fullWidth
                  size="small"
                >
                  <MenuItem value="">All Products</MenuItem>
                  {products.map(p => (
                    <MenuItem key={p.id} value={p.id}>{p.product_name}</MenuItem>
                  ))}
                </TextField>
              );
            }

            if (f.type === "date") {
              return (
                <TextField
                  key={f.key}
                  label={f.title}
                  type="date"
                  value={form[f.key]}
                  onChange={handleChange(f.key)}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  size="small"
                />
              );
            }

            if (f.type === "number" || f.type === "string") {
              return (
                <TextField
                  key={f.key}
                  label={f.title}
                  type={f.type === "number" ? "number" : "text"}
                  value={form[f.key]}
                  onChange={handleChange(f.key)}
                  fullWidth
                  size="small"
                />
              );
            }

            return null;
          })}
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
