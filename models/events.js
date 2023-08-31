'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Events extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stages, Stages_Event, MeetGreet, SetTime }) {
      // define association here
      Events.belongsToMany(Stages, {
        foreignKey: 'event_id',
        as: 'stages',
        through: Stages_Event
      })

      Events.hasMany(MeetGreet, {
        foreignKey: 'event_id',
        as: 'meet_greet'
      })

      Events.hasMany(SetTime, {
        foreignKey: 'event_id',
        as : 'set_times'
      })
    }
  }
  Events.init({
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING(96),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    start_time:{
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Events',
    tableName: 'events',
    timestamps: false
  });
  return Events;
};