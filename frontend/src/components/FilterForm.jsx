// import React, { useEffect, useState } from "react";
// import { Box, Stack, MenuItem, TextField, Button } from "@mui/material";
// import axios from "axios";

// const USERS_API = "http://localhost:9000/api/users"; 
// const PRODUCTS_API = "http://localhost:9000/api/products"; 

// const FilterForm = ({ onApply }) => {
//   const [users, setUsers] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [productId, setProductId] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     axios.get(USERS_API).then(res => setUsers(res?.data?.data)).catch(console.error);
//     axios.get(PRODUCTS_API).then(res => setProducts(res?.data?.data)).catch(console.error);
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const filters = [];
//     if (userId) filters.push({ key: "user_id", value: userId });
//     if (productId) filters.push({ key: "product_id", value: productId });
//     if (startDate) filters.push({ key: "start_date", value: startDate });
//     if (endDate) filters.push({ key: "end_date", value: endDate });

//     onApply(filters);
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, p: 2, border: "1px solid #ccc", borderRadius: 2 }}>
//       <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//         <TextField
//           select
//           label="User"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//           fullWidth
//           size="small"
//         >
//           <MenuItem value="">All Users</MenuItem>
//           {users.map(u => (
//             <MenuItem key={u.id} value={u.id}>{u.first_name} {u.last_name}</MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           select
//           label="Product"
//           value={productId}
//           onChange={(e) => setProductId(e.target.value)}
//           fullWidth
//           size="small"
//         >
//           <MenuItem value="">All Products</MenuItem>
//           {products.map(p => (
//             <MenuItem key={p.id} value={p.id}>{p.product_name}</MenuItem>
//           ))}
//         </TextField>

//         <TextField
//           label="Start Date"
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           InputLabelProps={{ shrink: true }}
//           size="small"
//         />

//         <TextField
//           label="End Date"
//           type="date"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           InputLabelProps={{ shrink: true }}
//           size="small"
//         />

//         <Button type="submit" variant="contained" color="primary">
//           Apply
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default FilterForm;
