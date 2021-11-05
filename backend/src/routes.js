const express = require('express');
const categoryController = require('./controllers/categoryController.js');


const routes = express.Router();

routes.get('/category', categoryController.selectAll);
routes.post('/category', categoryController.create);
routes.delete('/category/:id', categoryController.delete);

// routes.get('/device', IncidentController.index);
// routes.post('/device', IncidentController.create);
// routes.delete('/device/:id', IncidentController.delete);


routes.get('/', (request, response) => {   
    
    return response.json({
        evento: 'FullStack Eldorado',
        developer: 'Jacqson'
    })
});

module.exports = routes;