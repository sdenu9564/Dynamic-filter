import React, { useState, useEffect } from "react";
import OrdersTable from "./components/OrdersTable";
import FilterForm from "./components/FilterForm";
import AdvancedSearchModal from "./components/AdvancedSearchModal";
import { searchOrders } from "./services/api";
import { Container, Typography, Button, Box } from "@mui/material";

function App() {
  const [orders, setOrders] = useState(null);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const limit = 10;

  const fetchOrders = (filtersArray = [], pageNumber = 1) => {
    searchOrders({ filters: filtersArray, page: pageNumber, limit })
      .then((res) => {
        setOrders(res.data.data.data);
        setPage(pageNumber);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchOrders([], 1);
  }, []);

  const handleApplyFilters = (filtersArray) => {
    setFilters(filtersArray);
    fetchOrders(filtersArray, 1);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dynamic Orders Table
      </Typography>

      <FilterForm onApply={handleApplyFilters} />

      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setIsAdvancedOpen(true)}
        >
          Advanced Search
        </Button>
      </Box>

      <AdvancedSearchModal
        open={isAdvancedOpen}
        onClose={() => setIsAdvancedOpen(false)}
        onApply={handleApplyFilters}
      />

      <OrdersTable data={orders} />
    </Container>
  );
}

export default App;
