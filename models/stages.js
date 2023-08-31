'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Events, Stages_Event , SetTime}) {
      // define association here
      Stages.belongsToMany(Events, {
        foreignKey: 'stage_id',
        as : 'events',
        through: Stages_Event
      })

      Stages.belongsToMany(SetTime , {
        foreignKey: 'stage_id',
        as: 'set_times'
      })
    }
  }
  Stages.init({
    stage_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Stages',
    tableName: 'stages',
    timestamps: false
  });
  return Stages;
};