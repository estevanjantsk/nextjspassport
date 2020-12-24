'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) { }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async user => {
    user.id = uuidv4();
    user.password = await bcrypt.hash(user.password, 10);
  })
  return User;
};