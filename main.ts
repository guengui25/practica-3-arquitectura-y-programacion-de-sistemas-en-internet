//Así consigo la documentación de tipos de express

// @deno-types="npm:@types/express"

import express , {Request, Response}from "npm:express@4.18.2"; //Importo express

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";

const env = await load();
const url = env["URL"];

//Deno deploy
//https://docs.deno.com/deploy/manual

//Usar .env
//https://docs.deno.com/runtime/manual/basics/env_variables

//Documentacion de mongoose
//https://www.npmjs.com/package/mongoose
//https://mongoosejs.com/docs/

import mongoose from "npm:mongoose@7.6.3"; //Importo mongoose

import {DiscoModel, DiscoModelType} from "./disco.ts"; //Importo desde definiciones disco

const app = express(); //Inicializo el servidor de express

//Middleware para analizar el cuerpo de la solicitud JSON
//Hago que pueda recibir el body y sepa interpretarlo
app.use(express.json());

//Intento la conexión a la base de datos AtlasMongoDB usando Mongoose
try {
    await mongoose.connect(url);
    console.log("Conexión exitosa a MongoDB");
} catch (error) {
    console.error("Error al conectar a MongoDB:", error);
}

//Págian principal
app.get("/",(req: Request,res: Response)=>{
    res.send("Bienvenido a la página principal de Spin me like a record by guengui25");
});

//Métodos GET
//Obtener todos los discos existentes
app.get("/get/discos",async (req: Request,res: Response)=>{

    const coleccion = await DiscoModel.find().exec();

    res.json(coleccion);  //Mando el json con todos los discos

});

//Obtener un disco mediante id
app.get("/get/discos/:id",async (req: Request,res: Response)=>{
    try{
        const id = req.params.id;
        const coincidencia_id = await DiscoModel.findById(id).exec();

        res.json(coincidencia_id); //Mando el json con el disco o lo que sea que haya encontrado
    }

    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    }
});

//Obtener listado de discos según nombre
app.get("/get/discos/nombre/:nombre",async (req: Request,res: Response)=>{
    try{
        const nombre = req.params.nombre;

        const listado_nombre = await DiscoModel.find({nombre: nombre}).exec();

        res.json(listado_nombre); //Si cumple con el nombre
    }
    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    }
});

//Obtener listado de discos según formato
app.get("/get/discos/listado/formato/:formato",async (req: Request,res: Response)=>{
    try{
        const formato = req.params.formato;
        
        const listado_formato = await DiscoModel.find({formato: formato}).exec();

        res.json(listado_formato); //Si cumple con el formato
    }
    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    }
});

//Obtener listado de discos según país de impresión
app.get("/get/discos/listado/pais/:pais",async (req: Request,res: Response)=>{
    try{
        const pais = req.params.pais;
        
        const listado_pais = await DiscoModel.find({pais_impresion: pais}).exec();

        res.json(listado_pais); //Si cumple con el formato
    }
    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    }
});


//Métodos POST
app.post("/post/disco",async (req: Request,res: Response)=>{

    const disco:DiscoModelType = req.body; //Especifico que el disco tiene la información en el body del request

    console.log(disco); //Muestro por consola la información del disco a añadir

        //Verifico que el disco está completo
        if (!disco.nombre || !disco.autor || !disco.formato || !disco.matriz || !disco.pais_impresion || !disco.arte_portada) {
            res.status(403).send("Error, faltan datos");
            return;
        }
    
        //Compruebo si hay algún disco con el mismo nombre y autor
        const existe = await DiscoModel.findOne({nombre: disco.nombre,autor: disco.autor}).exec();
    
        if(existe){
            res.status(403).send("Error, ya existe una disco con ese nombre y autor");
            return;
        }
    
        const nuevoDisco = await DiscoModel.create({nombre: disco.nombre,autor: disco.autor,
            formato: disco.formato,matriz: disco.matriz,pais_impresion: disco.pais_impresion,
            arte_portada: disco.arte_portada});

    res.send("Datos recibidos correctamente"); //Devuelvo un mensaje de que se ha recibido correctamente
});

//Métodos PUT
app.put("/put/disco",async (req: Request,res: Response)=>{
    try {
        const disco = req.body; //Especifico que el disco tiene la información en el body del request

        if (!disco._id || !disco.nombre || !disco.autor || !disco.formato || !disco.matriz || !disco.pais_impresion || !disco.arte_portada) {
            res.status(403).send("Error, faltan datos");
            return;
        }

        const actualizar_disco = await DiscoModel.findByIdAndUpdate(disco._id,disco).exec(); 

        if(!actualizar_disco) res.send("No se ha encontrado el disco a modificar")
        else res.send("Datos modificados correctamente");

    } catch (error) {
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    }
});

//Métodos DELETE
app.delete("/delete/disco/:id",async (req: Request,res: Response)=>{

    try{
        const id = req.params.id; //Especifico que el disco tiene la información en el body del request

        const coincidencia_id = await DiscoModel.findByIdAndDelete(id).exec(); //Delete es el apropiado, REMOVE está obsoleto

        if(!coincidencia_id) res.send("No se ha encontrado el disco a borrar")
        else res.send("El disco con el id "+id+" se ha borrado correctamente"); //Devuelvo un mensaje de que se ha borrado correctamente
    }
    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    } 
});

//=======================================================================================================
//Ejecución
app.listen(3000, () => {
    console.log("El servidor está corriendo en el puerto 3000")
});