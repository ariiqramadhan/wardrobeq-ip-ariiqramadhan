'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {
        msg: 'Email already registered'
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email Required!'
        },
        notEmpty: {
          msg: 'Email Required!'
        },
        isEmail: {
          msg: 'Please input valid email!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password Required!'
        },
        notEmpty: {
          msg: 'Password Required!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};