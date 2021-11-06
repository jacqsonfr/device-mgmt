const express = require('express');
const categoryController = require('./controllers/categoryController.js');
const deviceController = require('./controllers/deviceController.js');


const routes = express.Router();

routes.get('/category', categoryController.selectAll);
routes.get('/category/:name', categoryController.selectByName);
routes.post('/category', categoryController.create);
routes.delete('/category/:id', categoryController.delete);

routes.get('/device', deviceController.selectAll);
routes.post('/device', deviceController.create);
routes.delete('/device/:id', deviceController.delete);


routes.get('/', (request, response) => {   
    
    return response.json({
        evento: 'FullStack Eldorado',
        developer: 'Jacqson'
    })
});

module.exports = routes;