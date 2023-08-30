const { Sequelize , Datatypes, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.PG_URI);

class Band extends Model{

}

Band.init({
    band_id : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    genre : {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    available_start_time : {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time : {
        type: DataTypes.DATE,
        allowNull: false
    },
    recommendation : {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Band',
    tableName: 'bands',
    timestamps: false
})

module.exports = Band;
