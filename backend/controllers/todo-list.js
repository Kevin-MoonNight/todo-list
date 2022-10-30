const { Todo } = require('../models/todo-list');

/*
    #swagger.start
    #swagger.path = '/'
    #swagger.method = 'get'
    #swagger.description = 'Get all todos.'
    #swagger.responses[200]
    #swagger.responses[500]
    #swagger.end
*/
const findAll = (req, res) => {
    Todo.findAll()
        .then(result => {
            res.send(result);
        }).catch(error => {
            res.status(500).send({
                message:
                    error.message || "Get fail!"
            });
        });
};

/*
    #swagger.start
    #swagger.path = '/'
    #swagger.method = 'post'
    #swagger.description = 'Create todo.'

    #swagger.parameters['describe'] = {
        in: 'body',
        description: 'Todo description.',
        type: 'string', 
    } 
    
    #swagger.responses[201]
    #swagger.responses[400]
    #swagger.responses[500]
    #swagger.end
*/
const create = (req, res) => {
    if (!req.body.describe) {
        res.status(400).send('describe is empty');
        return;
    }

    const todo = {
        describe: req.body.describe
    };

    Todo.create(todo)
        .then(result => {
            res.send(result);
        }).catch(error => {
            res.status(500).send({
                message:
                    error.message || "Create fail!"
            });
        });
};

/* 
    #swagger.start
    #swagger.path = '/{id}'
    #swagger.method = 'put'
    #swagger.description = 'Update todo.'

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Todo id.',
        type: 'string', 
    } 

    #swagger.parameters['describe'] = {
        in: 'body',
        description: 'Todo description.',
        type: 'string', 
    } 

    #swagger.responses[200]
    #swagger.responses[500]
    #swagger.end
*/
const update = (req, res) => {
    const id = req.params.id;

    Todo.update(req.body, {
        where: { id: id }
    }).then(result => {
        res.send('updated!');
    }).catch(error => {
        res.status(500).send({
            message:
                error.message || "Update fail!"
        });
    });
};

/*
    #swagger.start
    #swagger.path = '/{id}'
    #swagger.method = 'delete'
    #swagger.description = 'Delete todo.'

    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Todo id.',
        type: 'string', 
    } 

    #swagger.responses[200]
    #swagger.responses[500]
    #swagger.end
*/
const destroy = (req, res) => {
    const id = req.params.id;

    Todo.destroy({
        where: { id: id }
    }).then(result => {
        res.send('deleted!');
    }).catch(error => {
        res.status(500).send({
            message:
                error.message || "Delete fail!"
        });
    });
};

module.exports = { findAll, create, update, destroy };