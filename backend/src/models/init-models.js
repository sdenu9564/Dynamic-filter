import { Sequelize, DataTypes } from "sequelize";
import _user_master from './user_master.js';
import _product_master from './product_master.js';
import _order_master from './order_master.js';

function initModels(sequelize) {
  const user_master = _user_master(sequelize, DataTypes);
  const product_master = _product_master(sequelize, DataTypes);
  const order_master = _order_master(sequelize, DataTypes);

  // Associations
  user_master.hasMany(order_master, { foreignKey: 'user_id', as: 'orders' });
  order_master.belongsTo(user_master, { foreignKey: 'user_id', as: 'user' });

  product_master.hasMany(order_master, { foreignKey: 'product_id', as: 'orders' });
  order_master.belongsTo(product_master, { foreignKey: 'product_id', as: 'product' });

  return {
    user_master,
    product_master,
    order_master
  };
}

export default initModels;
