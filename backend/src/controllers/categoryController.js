const  connection = require("../database/connection");


const categoryController = {
    async create(request, response){        
        try {
            const { name } = request.body;
            if(!name){
                throw new Error('Categoria inválida');
            }else{                         
                const [id] = await connection('category')
                    .insert({name});              
                    return response.json(id);                
            }
            
        } catch (error) {            
            if(error.code != undefined){              
                return response.json({'message':'Erro ao criar a Categoria'});
            }else{
                return response.json({'message':error.message});
            }
        }
    },
    async selectAll(request, response){ //Done
        try {                                            
            const categories = await connection('category')
                .select('*');
            
            return response.json(categories);           
            
        } catch (error) {
            return response.json({'message':error.message});        
        }
    },
    async selectByName(request, response){ //Done
        try {                                      
            const { name } = request.params;
            if(!name){
                throw new Error('Categoria inválida');
            }else{
            const categories = await connection('category')
                .select('*')
                .where('name','like',`%${name}%`);
                return response.json(categories);           
            }
            
        } catch (error) {
            return response.json({'message':error.message});        
        }
    },
    async delete(request, response){ //Done
        try {          
            const { id } = request.params;                                  
            const devices = await connection('device')
                .where('category_id', id)
                .select('deviceId');
            console.log(devices);

            if (devices.length > 0){
                return response.status(401).json({error: 'Operação não permitida.'});
            }

            const rows = await connection('category').where('categoryId', id).delete();
            if(rows > 0){
                return response.status(204).send();       
            }else{
                return response.status(406).json({'message':"Informações incorretas"});           
            }                 
            
        } catch (error) {
            return response.json({'message':error.message});        
        }
    }
}

module.exports = categoryController;