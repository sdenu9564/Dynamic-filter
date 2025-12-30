import { sendHttpResponse } from "../utils/createResponse.js";
import { getFilteredOrders } from "../sequelizeQueries/order.queries.js";
import { validateQueryParams } from "../utils/validations.js";
import ALLOWED_QUERY_PARAMS from "../validations/orders.validation.js";

export const getOrders = async (req, res) => {
  try {
    const params = req.query || {};

    const validationErrors = validateQueryParams(params);
    if (validationErrors.length > 0) {
      return sendHttpResponse(res, 400, {
        success: false,
        message: "Validation failed",
        errors: validationErrors
      });
    }

    const result = await getFilteredOrders(params);

    return sendHttpResponse(res, 200, {
      success: true,
      data: result
    });
  } catch (err) {
    console.error(
      "err -------- getOrders --------- order.controller.js",
      err?.message || err
    );

    return sendHttpResponse(res, 500, {
      success: false,
      message: "Failed to fetch orders"
    });
  }
};



export const searchOrders = async (req, res) => {
  try {
    const { filters = [], page = 1, limit = 20 } = req.body;

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