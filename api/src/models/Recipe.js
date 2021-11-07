const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    resume: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score:{
      type: DataTypes.INTEGER,
    },
    healthylevel:{
      type: DataTypes.INTEGER,
    },
    stepbystep:{
      type: DataTypes.TEXT,
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    },
    image:{
      type: DataTypes.STRING,

    }
  }, {timestamps:false});
};
