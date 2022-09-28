const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

const userRouter = require('../src/domains/usuarios/controllers/index');
const musicRouter = require('../src/domains/musicas/controllers/index');
const artistRouter = require('../src/domains/artistas/controllers/index');

app.use("/api/user", userRouter);
app.use("/api/music", musicRouter);
app.use("/api/artist", artistRouter);

module.exports = app;