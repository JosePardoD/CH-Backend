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
        numero = Number(numero);
        try{
        let contenidoObjeto=await this.getData();

        let contenidoObjetoJson=JSON.parse(contenidoObjeto);

        return contenidoObjetoJson.find((producto) => producto.id === numero);
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
    async updateOne(id, productoActualizado) {
        try {
            id = Number(id);
            console.log(productoActualizado)
            let contenidoObjeto = await this.getData();
            let contenidoObjetoJson= JSON.parse(contenidoObjeto);
            
            let objectIdToBeUpdated = contenidoObjetoJson.find(
              (producto) => producto.id === id
            );
            console.log(objectIdToBeUpdated)
            if (objectIdToBeUpdated) {
                
                const indice = contenidoObjetoJson.indexOf(objectIdToBeUpdated);
                console.log(indice)
 
                contenidoObjetoJson[indice].title = productoActualizado.title

                contenidoObjetoJson[indice].price = productoActualizado.price
                contenidoObjetoJson[indice].description = productoActualizado.description
                contenidoObjetoJson[indice].code = productoActualizado.code
                contenidoObjetoJson[indice].image = productoActualizado.image
                contenidoObjetoJson[indice].stock = productoActualizado.stock

            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenidoObjetoJson));
            return true;
                }
        } catch (error) {
            console.log("No se actualizo");
        }
    }
    async deleteObject(id){
        try {
            id = Number(id);
            console.log("hola")
            const contenidoObjeto= await this.getData();
            const contenidoObjetoJson = JSON.parse(contenidoObjeto);
            const objectDelete= contenidoObjetoJson.find(
                (producto) => producto.id === id
            );
            if(objectDelete){
                const indice = contenidoObjetoJson.indexOf(objectDelete);
                contenidoObjetoJson.splice(indice,1);
                await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenidoObjetoJson));
                return true;
            }
        } catch (error) {
            console.log(`No se encuentra ID`)
        }
    }
    async removeProductByIdCarrito(id, productIdRemove, product) {
        try {
          id = Number(id);
          const contenidoObjeto= await this.getData();
          const contenidoObjetoJson = JSON.parse(contenidoObjeto);
          const  removeByID= contenidoObjetoJson.find(
            (producto) => producto.id === id
          );

          if (removeByID) {
            const index = contenidoObjetoJson.indexOf(removeByID);
            const valorActual = contenidoObjetoJson[index].product;
            let deleteIndex = -1;
            valorActual.forEach((element, index2) => {
              if(element.id == productIdRemove) {
                deleteIndex  = index2
              }
            })
            const newArray = [...valorActual];
            if (deleteIndex>-1) {
              newArray.splice(deleteIndex,1)
            }
            contenidoObjetoJson[index][product] = newArray;
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(contenidoObjetoJson));
            return true;
          } else {
            console.log(` ${id} no se encuentra en el carroto`);
            return false;
          }
    
        } catch (error) {
          `Error Code: ${error.code}`
        }
      
    }


}

module.exports = contenedor






