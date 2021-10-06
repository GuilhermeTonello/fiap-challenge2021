const { Sequelize, DataTypes, Model } = require('sequelize');

const sequelize = new Sequelize('mariadb://FORD:FORD@150.230.88.140:3306/FORD');
module.exports = function(sequelize, DataTypes) {
return sequelize.define('OBD2', {
    ID: {type: DataTypes.INTEGER, primaryKey: true},
    GPS_TIME: {type: DataTypes.STRING},
    DEVICE_TIME: {type: DataTypes.STRING},
    LONGITUDE: {type: DataTypes.DECIMAL},
    LATITUDE: {type: DataTypes.DECIMAL},
    GPS_SPEED: {type: DataTypes.DECIMAL},
    HORIZONTAL_DILUTION: {type: DataTypes.DECIMAL},
    ALTITUDE: {type: DataTypes.DECIMAL},
    BEARING: {type: DataTypes.DECIMAL},
    GX: {type: DataTypes.DECIMAL},
    GY: {type: DataTypes.DECIMAL},
    GZ: {type: DataTypes.DECIMAL},
    GCALIBRATED: {type: DataTypes.STRING},
    ENGINE_COOLANT_TEMPERATURE: {type: DataTypes.DECIMAL},
    ENGINE_RPM: {type: DataTypes.DECIMAL},
    INTAKE_AIRTEMPERATURE: {type: DataTypes.DECIMAL},
    ENGINE_LOAD: {type: DataTypes.DECIMAL},
    MASS_AIR_FLOW: {type: DataTypes.DECIMAL},
    THROTTLE_POSSITION: {type: DataTypes.DECIMAL}
},
{
    sequelize,
    tableName: 'OBD2',
    timestamps: false
})
};
