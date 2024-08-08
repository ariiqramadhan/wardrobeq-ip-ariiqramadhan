'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'OrderID Required!'
        },
        notEmpty: {
          msg: 'OrderID Required!'
        }
      }
    },
    transToken: {
      type: DataTypes.STRING
    },
    UserId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pending'
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};