/* eslint no-console: "off" */
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
import swaggerSpec from './server/config/routes/swagger';
require('dotenv').config();

const express = require('express');
const parser = require('body-parser');
const route = require('./server/config/routes');


const port = process.env.PORT || 4000;

const app = express();

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
  res.send(swaggerSpec);
});

app.use('/', route.userRouter);
app.use('/', route.rolesRouter);
app.use('/', route.documentRouter);
app.get('/doc', (req, res) => {
  res.status(200)
  .sendFile(path.join(__dirname, 'server/swagger', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'client')));

app.use(express.static(path.join(__dirname, 'server/swagger')));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

module.exports = app;
