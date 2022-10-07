require('dotenv').config();

const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const ErrorHandler = require('../middlewares/ErrorHandler');
const cors = require('cors');

app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

const userRouter = require('../src/domains/users/controllers/index');
const musicRouter = require('../src/domains/musics/controllers/index');
const artistRouter = require('../src/domains/artists/controllers/index');

app.use("/api/user", userRouter);
app.use("/api/music", musicRouter);
app.use("/api/artist", artistRouter);
app.use(ErrorHandler);

module.exports = app;