const  connection = require("../database/connection");

const deviceController = {
    async create(request, response){ //Done
        try {            
            const { category_id = 0, color = undefined, part_number = 0 } = request.body;
            if( (!category_id && category_id <= 0) ||
                (!color && color.length <= 16) ||
                (!part_number && part_number <= 0)
            ){
                throw new Error('Dados do dispositivo inválidos');
            }else{                
                
                //Verify if category exists  
                const category = await connection('category')
                .where('categoryId', category_id)
                .select('*');                
            
                if ( !category || category.length == 0){
                    return response.status(400).json({"message": 'Operação não permitida.'});
                }
                
                const [id] = await connection('device')
                    .insert({
                        category_id,
                        color,
                        part_number
                    });              
                    return response.json(id);                
            }
            
        } catch (error) {            
            if(error.code != undefined){                
                return response.json({'message':'Erro ao criar o Dispositivo'});
            }else{
                return response.json({'message':error.message});
            }
        }
    },
    async selectAll(_request, response){ //Done
        try {                                            
            const devices = await connection('device')
                .select('*')
                .join('category', 'device.category_id', 'category.categoryId');
            
            return response.json(devices);           
            
        } catch (error) {
            return response.json({'message':error.message});        
        }
    },    
    async delete(request, response){ //Done
        try {          
            const { id = 0 } = request.params;
            
            if (isNaN(id) || id <= 0){
                return response.status(400).json({"message": 'Operação não permitida.'});
            }

            const rows = await connection('device').where('deviceId', id).delete();
            if(rows > 0){
                return response.status(204).send();       
            }else{
                return response.status(406).json({'message':"Informações incorretas"});           
            }
            
        } catch (error) {
            console.log(error);
            return response.json({'message':error.message});        
        }
    }
}

module.exports = deviceController;