import initModels from "../models/init-models.js";
import sequelize from "../config/database.js";


const models = initModels(sequelize);

export const fetchAllUser = async() => {
    return await models.user_master.findAll()
}