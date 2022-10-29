const { Todo } = require('../models/todo-list');

const findAll = (req, res) => {
    Todo.findAll()
        .then(result => {
            res.send(result);
        }).catch(error => {
            res.status(500).send(error);
        });
};

const create = (req, res) => {
    if (!req.body.describe) {
        res.status(400).send('describe is empty')
    }

    const todo = {
        describe: req.body.describe
    };

    Todo.create(todo)
        .then(result => {
            res.send(result);
        }).catch(error => {
            res.status(400).send(error);
        });
};

const update = (req, res) => {
    const id = req.params.id;

    Todo.update(req.body, {
        where: { id: id }
    }).then(result => {
        res.send('updated!');
    }).catch(error => {
        res.status(400).send(error);
    });
};

const destroy = (req, res) => {
    const id = req.params.id;

    Todo.destroy({
        where: { id: id }
    }).then(result => {
        res.send('deleted!');
    }).catch(error => {
        res.status(400).send(error);
    });
};

module.exports = { findAll, create, update, destroy };