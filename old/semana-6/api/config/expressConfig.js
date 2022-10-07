const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

const userRouter = require('../src/domains/usuarios/controllers/index');
app.use("/api/music", userRouter);

module.exports = app;