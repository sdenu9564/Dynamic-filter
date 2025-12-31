import { sendHttpResponse } from "../utils/createResponse.js";
import { getFilteredOrders } from "../sequelizeQueries/order.queries.js";
import { validateQueryParams } from "../utils/validations.js";
import ALLOWED_QUERY_PARAMS from "../validations/orders.validation.js";
import FILTERS_CONFIG from "../config/filters.config.js";

export const getFilters = async (req, res) => {
  return sendHttpResponse(res, 200, {
    success: true,
    data: FILTERS_CONFIG
  });
};



export const searchOrders = async (req, res) => {
  try {
    const { filters = [], page = 1, limit = 3 } = req.body;

    const errors = [];
    const params = {};

    for (const f of filters) {
      const rule = ALLOWED_QUERY_PARAMS[f.key];
      if (!rule) {
        errors.push(`Invalid filter key: ${f.key}`);
        continue;
      }
      params[f.key] = f.value;
    }

    if (errors.length) {
      return sendHttpResponse(res, 400, {
        success: false,
        message: "Validation failed",
        errors
      });
    }

    params.page = page;
    params.limit = limit;
    const result = await getFilteredOrders(params);

    return sendHttpResponse(res, 200, {
      success: true,
      data: result
    });
  } catch (err) {
    console.error(
      "err -------- searchOrders --------- order.controller.js",
      err?.message || err
    );
    return sendHttpResponse(res, 500, {
      success: false,
      message: "Failed to fetch orders"
    });
  }
};