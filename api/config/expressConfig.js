const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

const musicRouter = require('../src/domains/musicas/controllers/index');
app.use('/api/musica', musicRouter);

module.exports = app;