var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json())
require("./routers/todo-list")(app);

module.exports = app;
