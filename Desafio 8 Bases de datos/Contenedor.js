const fs = require("fs")

class contenedor{

    constructor(options,nombretable){
        this.knex = require("knex")(options);
        this.table = nombretable;
    }


    async getAll(){
        try {
            const data= await this.knex(this.table).select("*");
            return data;
        } catch (error) {
            console.log(error); 
        } finally{
            this.knex.destroy();
        }
        

        
    }

    async save(objeto){
        try {
        let contenidoObjeto=await this.knex(this.table).insert(objeto);
        return contenidoObjeto;

    } catch (error) {
            console.log(error);
    } finally{
        this.knex.destroy;
    }
    }

    async getById(numero){
        try{
        let contenidoObjeto=await this.knex(this,this.table).where("id",id);
        } catch (error) {
            console.log(error);   
        } finally{
            this.knex.destroy();
        }
    }
    async deleteAll(){
        try {
            let contenidoObjeto=await this.knex(this,this.table).del();
        } catch (error){
            console.log("No se borro");
        }finally{
            this.knex.destroy()
        }
    
    }

}

module.exports = contenedor

