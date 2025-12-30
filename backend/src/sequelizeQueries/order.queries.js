// src/sequelizeQueries/order.queries.js
import initModels from "../models/init-models.js";
import sequelize from "../config/database.js";
import { Op } from "sequelize";

const models = initModels(sequelize);
const { order_master, user_master, product_master } = models;

const buildWhere = (params = {}) => {
  const orderWhere = {};
  const userWhere = {};
  const productWhere = {};

  if (params.order_status) orderWhere.order_status = params.order_status;

  if (params.start_date || params.end_date) {
    orderWhere.order_date = {};
    if (params.start_date) orderWhere.order_date[Op.gte] = new Date(params.start_date);
    if (params.end_date) orderWhere.order_date[Op.lte] = new Date(params.end_date);
  }

  if (params.min_total || params.max_total) {
    orderWhere.total_amount = {};
    if (params.min_total !== undefined) orderWhere.total_amount[Op.gte] = parseFloat(params.min_total);
    if (params.max_total !== undefined) orderWhere.total_amount[Op.lte] = parseFloat(params.max_total);
  }

  if (params.user_id) userWhere.id = parseInt(params.user_id, 10);
  if (params.user_gender) userWhere.gender = params.user_gender;

  if (params.product_id) productWhere.id = parseInt(params.product_id, 10);
  if (params.product_category) productWhere.category = params.product_category;

  const page = params.page ? Math.max(parseInt(params.page, 10), 1) : 1;
  const limit = params.limit ? Math.max(parseInt(params.limit, 10), 1) : 20;
  const offset = (page - 1) * limit;

  return { orderWhere, userWhere, productWhere, pagination: { page, limit, offset } };
};


export const getFilteredOrders = async (params = {}) => {
  const { orderWhere, userWhere, productWhere, pagination } = buildWhere(params);
  const { limit, offset } = pagination;

  const include = [
    {
      model: user_master,
      as: 'user', 
      where: Object.keys(userWhere).length > 0 ? userWhere : undefined,
      required: Object.keys(userWhere).length > 0
    },
    {
      model: product_master,
      as: 'product', 
      where: Object.keys(productWhere).length > 0 ? productWhere : undefined,
      required: Object.keys(productWhere).length > 0
    }
  ];

  const result = await order_master.findAndCountAll({
    where: orderWhere,
    include,
    limit,
    offset,
    order: [['order_date', 'DESC']]
  });

  return {
    count: result.count,
    rows: result.rows,
    page: pagination.page,
    limit
  };
};
