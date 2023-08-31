'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SetTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band , Events , Stages}) {
      // define association here
      SetTime.belongsTo(Band, {
        foreignKey: 'band_id',
        as: 'band'
      })

      SetTime.belongsTo(Events , {
        foreignKey : 'event_id',
        as : 'event'
      })

      SetTime.belongsTo(Stages , {
        foreignKey: 'stage_id',
        as : 'stage'
      })
    }
  }
  SetTime.init({
    set_time_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    stage_id: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'SetTime',
    tableName: 'sets_time'
  });
  return SetTime;
};