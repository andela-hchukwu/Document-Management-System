const express = require('express');
const parser = require('body-parser');
const route = require('./config/routes');

const port = process.env.PORT || 4000;

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use('/', route);
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

module.exports = app;