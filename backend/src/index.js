'use strict'
require("dotenv").config();

const express = require('express');
const cors = require('cors')
const morgar = require('morgan');
const app = express();
const mongoose = require('mongoose');
const brand = require('./routes/brand');
const modelBrand = require('./routes/modelBrand');

const PORTA = 8081;

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('MongoDB Conectado..');
}).catch((err) => {
    console.log('Erro ao conectar no banco', err);
});

app.listen(PORTA, () => {
    console.log('Servidor rodando...');
});

app.use(cors());
app.use(express.json());
app.use(morgar('dev'));

app.use('/list-brand-fipe', brand);
app.use('/list-model-brand-fipe', modelBrand);
