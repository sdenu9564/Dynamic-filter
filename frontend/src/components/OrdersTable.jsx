import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  Typography,
} from "@mui/material";

const OrdersTable = ({ data }) => {
  console.log(data?.data?.rows)
  if (!data || !data.rows || data.rows.length === 0) {
    return <Typography>No orders found.</Typography>;
  } 

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>User</strong></TableCell>
            <TableCell><strong>Product</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Total</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.rows.map((order) => (
            <TableRow key={order.id} hover>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.user?.first_name} {order.user?.last_name}</TableCell>
              <TableCell>{order.product?.product_name}</TableCell>
              <TableCell>{order.order_status}</TableCell>
              <TableCell>{order.total_amount}</TableCell>
              <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
