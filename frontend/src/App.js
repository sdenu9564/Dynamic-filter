import React, { useState, useEffect } from "react";
import OrdersTable from "./components/OrdersTable";
import FilterForm from "./components/FilterForm";
import AdvancedSearchModal from "./components/AdvancedSearchModal";
import { searchOrders } from "./services/api";
import {
  Container,
  Typography,
  Button,
  Box,
  Pagination,
  Stack,
} from "@mui/material";

function App() {
  const [orders, setOrders] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const limit = 3;

  const fetchOrders = (filtersArray = [], pageNumber = 1) => {
    searchOrders({
      filters: filtersArray,
      page: pageNumber,
      limit,
    })
      .then((res) => {
        // backend: res.data.data.data
        setOrders(res.data.data.data);
        setPage(pageNumber);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
      });
  };

  useEffect(() => {
    fetchOrders([], 1);
  }, []);

  const handleApplyFilters = (filtersArray) => {
    setFilters(filtersArray);
    fetchOrders(filtersArray, 1);
  };

  const handleReset = () => {
  setFilters([]);
  setResetKey(prev => prev + 1);  
  fetchOrders([], 1);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Orders Table
      </Typography>

      {/* <FilterForm onApply={handleApplyFilters} /> */}

      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsAdvancedOpen(true)}
        >
          Search
        </Button>
        <Button
        sx={{m: 2}}
          variant="contained"
          color="secondary"
          onClick={ handleReset}
        >
          Reset
        </Button>
      </Box>

      <AdvancedSearchModal
        open={isAdvancedOpen}
        onClose={() => setIsAdvancedOpen(false)}
        onApply={handleApplyFilters}
         resetKey={resetKey}
      />

      <OrdersTable data={orders} />

      {orders && orders.count > limit && (
        <Stack spacing={2} sx={{ mt: 3 }} alignItems="center">
          <Pagination
            count={Math.ceil(orders.count / limit)}
            page={page}
            onChange={(e, value) => fetchOrders(filters, value)}
            color="primary"
          />
        </Stack>
      )}
    </Container>
  );
}

export default App;
