import Sequelize from 'sequelize';

const product = (sequelize, DataTypes) => {
  const ProductSchema = sequelize.define(
    'product_master',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      product_name: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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
      tableName: 'product_master',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        },
        {
          name: 'category',
          using: 'BTREE',
          fields: [{ name: 'category' }]
        }
      ]
    }
  );

  return ProductSchema;
};

export default product;
