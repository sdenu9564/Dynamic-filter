import axios from "axios";

const API_BASE = "http://localhost:9000/api/orders";

export const getFilters = () => axios.get(`${API_BASE}/filters`);
export const searchOrders = (data) => axios.post(`${API_BASE}/search`, data);
