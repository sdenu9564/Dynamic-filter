import initModels from "../models/init-models.js";
import sequelize from "../config/database.js";

const models = initModels(sequelize);

export const fetchAllProduct = async() => {
    return await models.product_master.findAll()
}