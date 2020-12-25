'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    isPasswordValid(password) {
      return bcrypt.compare(password, this.password)
    }

    static associate(models) { }

  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async user => {
    user.password = await bcrypt.hash(user.password, 10);
  })
  return User;
};