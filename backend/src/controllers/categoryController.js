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
            console.log(error.code);
            if(error.code == 'MYSQL_CONSTRAINT'){                
                return response.json({'message':'Erro ao criar a Categoria'});
            }else{
                return response.json({'message':error.message});
            }
        }
    },
    async selectAll(request, response){
        try {                                            
            const categories = await connection('category')
                .select('*');
            
            return response.json(categories);           
            
        } catch (error) {
            return response.json({'message':error.message});        
        }
    },
    async delete(request, response){
        try {          
            const { id } = request.params;                                  
            const devices = await connection('device')
                .where('category_id', id)
                .select('deviceId');
            console.log(devices);

            if (devices.length > 0){
                return response.status(401).json({error: 'Operation not permitted.'});
            }

            await connection('category').where('categoryId', id).delete();

            return response.status(204).send();       
            
        } catch (error) {
            return response.json({'message':error.message});        
        }
    }
}

module.exports = categoryController;