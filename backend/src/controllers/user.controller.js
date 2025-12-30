import {fetchAllUser} from '../sequelizeQueries/user.queries.js';
import { sendHttpResponse } from '../utils/createResponse.js';


export const getAllUser = async(req, res) => {
    try {
        const userlist  = await fetchAllUser();
        sendHttpResponse(res, 'Success', userlist);
    } catch (err) {
        console.error(
            'err ---------- getAllUser ------- user.controller.js',
            err?.message || err
        );
        sendHttpResponse(res, 'Failed to fetch user', {}, 500, false)
    }
}