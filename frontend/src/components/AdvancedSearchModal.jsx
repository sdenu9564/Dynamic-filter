import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  IconButton,
  Box,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { getFilters } from "../services/api";

const USERS_API = "http://localhost:9000/api/users";
const PRODUCTS_API = "http://localhost:9000/api/products";

const DATE_RANGE = "date_range";
const AMOUNT_RANGE = "amount_range";

const EXCLUDED_KEYS = [
  "start_date",
  "end_date",
  "min_total",
  "max_total"
];

const AdvancedSearchModal = ({ open, onClose, onApply, resetKey }) => {
  const [filtersConfig, setFiltersConfig] = useState([]);
  const [activeFilters, setActiveFilters] = useState({});
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);


  useEffect(() => {
    setActiveFilters({});
  }, [resetKey]);
  useEffect(() => {
    if (!open) return;

    getFilters()
      .then(res => setFiltersConfig(res?.data?.data?.data || []))
      .catch(console.error);

    axios.get(USERS_API).then(r => setUsers(r?.data?.data || [])).catch(console.error);
    axios.get(PRODUCTS_API).then(r => setProducts(r?.data?.data || [])).catch(console.error);
  }, [open]);
  
  const availableFilters = useMemo(() => {
    const usedKeys = Object.keys(activeFilters);

    const normalFilters = filtersConfig
      .filter(f => !EXCLUDED_KEYS.includes(f.key))
      .filter(f => !usedKeys.includes(f.key));

    const filters = [...normalFilters];

    if (!usedKeys.includes(DATE_RANGE)) {
      filters.push({ key: DATE_RANGE, title: "Date Range" });
    }

    if (!usedKeys.includes(AMOUNT_RANGE)) {
      filters.push({ key: AMOUNT_RANGE, title: "Amount Range" });
    }

    return filters;
  }, [filtersConfig, activeFilters]);
  const handleAddFilter = key => {
    if (!key) return;

    if (key === DATE_RANGE) {
      setActiveFilters(p => ({
        ...p,
        [DATE_RANGE]: { start_date: "", end_date: "" }
      }));
      return;
    }

    if (key === AMOUNT_RANGE) {
      setActiveFilters(p => ({
        ...p,
        [AMOUNT_RANGE]: { min_total: "", max_total: "" }
      }));
      return;
    }

    setActiveFilters(p => ({ ...p, [key]: "" }));
  };

  const removeFilter = key => {
    setActiveFilters(p => {
      const copy = { ...p };
      delete copy[key];
      return copy;
    });
  };

  const updateValue = (key, value) =>
    setActiveFilters(p => ({ ...p, [key]: value }));

  const getConfig = key => filtersConfig.find(f => f.key === key);

  const handleApply = () => {
    const filtersArray = [];

    Object.entries(activeFilters).forEach(([key, value]) => {
      if (key === DATE_RANGE || key === AMOUNT_RANGE) {
        Object.entries(value).forEach(([k, v]) => {
          if (v !== "") filtersArray.push({ key: k, value: v });
        });
      } else {
        if (value !== "") filtersArray.push({ key, value });
      }
    });

    onApply(filtersArray);
    onClose();
  };

  const handleReset = () => setActiveFilters({});

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Advanced Order Search</DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {/* Add Filter */}
          <TextField
            select
            label="Add Filter"
            value=""
            onChange={e => handleAddFilter(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="" disabled>Select filter</MenuItem>
            {availableFilters.map(f => (
              <MenuItem key={f.key} value={f.key}>
                {f.title}
              </MenuItem>
            ))}
          </TextField>

          {Object.entries(activeFilters).map(([key, value]) => {
            if (key === DATE_RANGE) {
              return (
                <FilterBox key={key} title="Date Range" onRemove={() => removeFilter(key)}>
                  <TextField
                    type="date"
                    label="Start Date"
                    value={value.start_date}
                    onChange={e =>
                      updateValue(key, { ...value, start_date: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                  />
                  <TextField
                    type="date"
                    label="End Date"
                    value={value.end_date}
                    onChange={e =>
                      updateValue(key, { ...value, end_date: e.target.value })
                    }
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    fullWidth
                  />
                </FilterBox>
              );
            }

            if (key === AMOUNT_RANGE) {
              return (
                <FilterBox key={key} title="Amount Range" onRemove={() => removeFilter(key)}>
                  <TextField
                    type="number"
                    label="Min Amount"
                    value={value.min_total}
                    onChange={e =>
                      updateValue(key, { ...value, min_total: e.target.value })
                    }
                    size="small"
                    fullWidth
                  />
                  <TextField
                    type="number"
                    label="Max Amount"
                    value={value.max_total}
                    onChange={e =>
                      updateValue(key, { ...value, max_total: e.target.value })
                    }
                    size="small"
                    fullWidth
                  />
                </FilterBox>
              );
            }

            const cfg = getConfig(key);
            if (!cfg) return null;

            return (
              <FilterBox key={key} title={cfg.title} onRemove={() => removeFilter(key)}>
                {cfg.key === "user_id" ? (
                  <TextField
                    select
                    value={value}
                    onChange={e => updateValue(key, e.target.value)}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="">Any</MenuItem>
                    {users.map(u => (
                      <MenuItem key={u.id} value={u.id}>
                        {u.first_name} {u.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : cfg.key === "product_id" ? (
                  <TextField
                    select
                    value={value}
                    onChange={e => updateValue(key, e.target.value)}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="">Any</MenuItem>
                    {products.map(p => (
                      <MenuItem key={p.id} value={p.id}>
                        {p.product_name}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : cfg.type === "enum" ? (
                  <TextField
                    select
                    value={value}
                    onChange={e => updateValue(key, e.target.value)}
                    fullWidth
                    size="small"
                  >
                    <MenuItem value="">Any</MenuItem>
                    {cfg.options.map(opt => (
                      <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                  </TextField>
                ) : cfg.type === "number" ? (
                  <TextField
                    type="number"
                    value={value}
                    onChange={e => updateValue(key, e.target.value)}
                    fullWidth
                    size="small"
                  />
                ) : (
                  <TextField
                    value={value}
                    onChange={e => updateValue(key, e.target.value)}
                    fullWidth
                    size="small"
                  />
                )}
              </FilterBox>
            );
          })}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleReset} color="secondary">Reset</Button>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleApply} variant="contained">Apply Search</Button>
      </DialogActions>
    </Dialog>
  );
};

/** UI wrapper */
const FilterBox = ({ title, children, onRemove }) => (
  <Box border="1px solid rgba(0,0,0,0.15)" borderRadius={1} p={2}>
    <Stack direction="row" justifyContent="space-between" mb={1}>
      <Typography fontWeight={600}>{title}</Typography>
      <IconButton size="small" onClick={onRemove}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Stack>
    <Stack spacing={2}>{children}</Stack>
  </Box>
);

export default AdvancedSearchModal;
