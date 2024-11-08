'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    nombre: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    telefonoCasa: DataTypes.STRING,
    telefonoTrabajo: DataTypes.STRING,
    direccionCasa: DataTypes.STRING,
    direccionTrabajo: DataTypes.STRING,
    correoElectronico: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};