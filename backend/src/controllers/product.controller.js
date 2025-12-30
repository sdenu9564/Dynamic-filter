import {fetchAllProduct} from '../sequelizeQueries/product.queries.js';
import { sendHttpResponse } from '../utils/createResponse.js';


export const getAllProduct = async(req, res) => {
    try {
        const productList  = await fetchAllProduct();
        sendHttpResponse(res, 'Success', productList);
    } catch (err) {
        console.error(
            'err ---------- getAllProduct ------- product.controller.js',
            err?.message || err
        );
        sendHttpResponse(res, 'Failed to fetch products', {}, 500, false)
    }
}