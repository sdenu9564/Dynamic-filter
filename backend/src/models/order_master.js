import Sequelize from 'sequelize';

const order = (sequelize, DataTypes) => {
  const OrderSchema = sequelize.define(
    'order_master',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      order_status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'placed'
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp')
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.fn('current_timestamp')
      }
    },
    {
      sequelize,
      tableName: 'order_master',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        },
        {
          name: 'user_id',
          using: 'BTREE',
          fields: [{ name: 'user_id' }]
        },
        {
          name: 'product_id',
          using: 'BTREE',
          fields: [{ name: 'product_id' }]
        },
        {
          name: 'order_status',
          using: 'BTREE',
          fields: [{ name: 'order_status' }]
        }
      ]
    }
  );

  return OrderSchema;
};

export default order;
