const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('mariadb://FORD:FORD@150.230.88.140:3306/FORD');

const OBD2 = require('../models/OBD2.js')(sequelize, DataTypes);

export const getOBD2ById = async (req, res) => {
    const { id } = req.params;
    const obd2 = OBD2.findOne({
        where: {ID: id}
    })
    .then((obd2Object) => {
        res.status(200).json(obd2Object);
    })
    .catch(err => {
        console.log('Não encontrado');
    });
}

export const getAllOBD2 = async (req, res) => {
    console.log('aaaaaaaaaaaaaaaa');
    const obd2 = await OBD2.findAll();
    res.status(200).json(obd2);
}
