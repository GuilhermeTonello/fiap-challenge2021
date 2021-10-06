const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes, Model } = require('sequelize');

import obd2Routes from './routes/obd2.routes.js';

const app = express();


app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/obd2', obd2Routes);

const CONNECTION_URL ='mariadb://FORD:FORD@150.230.88.140:3306/FORD';
const PORT = 5000;

const sequelize = new Sequelize(CONNECTION_URL);

sequelize
    .authenticate()
    .then(() => {
        app.listen(PORT, () => console.log(`Servidor iniciado na porta ${PORT}`));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
