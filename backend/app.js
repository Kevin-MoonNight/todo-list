var express = require('express');
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')

app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json())
require("./routers/todo-list")(app);

module.exports = app;
