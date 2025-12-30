import Sequelize from 'sequelize';
import constants from '../config/constants.js';

const user = (sequelize, DataTypes) => {
  const UserSchema = sequelize.define(
    'user_master',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: 'user_master_UN1'
      },
      phone_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: 'user_master_UN2'
      },
      age : {
        type: DataTypes.DATE,
        allowNull: true
      },
      gender : {
        type : DataTypes.STRING(10),
        allowNull: true
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
      },
      
    },
    {
      sequelize,
      tableName: 'user_master',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }]
        },
        {
          name: 'email',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'email' }]
        },
        {
          name: 'phone_number',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'phone_number' }]
        },
      ]
    }
  );
  return UserSchema;
};

export default user;
