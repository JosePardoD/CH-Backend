const fs = require("fs")

class contenedor{

    constructor(nombreArchivo){
        this.nombreArchivo= "./"+nombreArchivo+".json";
    }

    async getData(){
        try {
            return  await fs.promises.readFile(this.nombreArchivo,"utf8")    
        } catch (error){
            if(error.code == "ENOENT"){
                fs.writeFile(this.nombreArchivo,"[]",(error)=>{
                    if(error){
                        console.log("El archivo no se pudo crear");
                    }
                })
            }
        }
        
    }

    async getAll(){
        const data= await this.getData();
        return JSON.parse(data);
    }

    async save(objeto){
        try {
        let contenidoObjeto=await this.getData();
        let contenidoObjetoJson=JSON.parse(contenidoObjeto);
        let arreglo = [];
        const indice =contenidoObjetoJson.map(x=>x.id).sort();
        objeto.id=indice[indice.length-1]+1;

        if(!objeto.id){
            objeto.id=1
            arreglo=[{...objeto}];
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(arreglo));
            return arreglo[0].id;
        }

        contenidoObjetoJson.push(objeto);
        

        await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(contenidoObjetoJson));

    } catch (error) {
            console.log("No se pudo grabar el archivo");
    }
    }

    async getById(numero){
        try{
        let contenidoObjeto=await this.getData();
        let contenidoObjetoJson=JSON.parse(contenidoObjeto);
        
        const indice =contenidoObjetoJson.map(x=>x.id);
        const arreglo = Object.values(indice);
        const maxId = Math.max(...arreglo)
        let y=1; //bandera
        

        if(maxId>=numero){ 
            for (let i = 0 ;i< indice.length;i++){
                if (indice[i]==numero) {
                    y=0;
                    console.log(contenidoObjetoJson[i]);
                    i=indice.length;
                    
                }        
            }
        }
        if(y==1){
            console.log(null);  
        }


        } catch (error) {
            console.log("No se encontro");   
        }
    }
    async deleteAll(numero){
        try {
            return  await fs.promises.writeFile(this.nombreArchivo,"")    
        } catch (error){
            console.log("No se borro");
        }
    
    }

}

module.exports = contenedor
