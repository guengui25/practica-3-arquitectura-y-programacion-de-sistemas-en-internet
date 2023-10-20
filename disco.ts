//Creo el esquema para mongo y tipo para typescript

import mongoose from "npm:mongoose@7.6.3"; //Importo mongoose

const Schema = mongoose.Schema; //Creo un esquema
const ObjectId = Schema.ObjectId; //Creo un id de esquema

//Creo el tipo disco
export interface DiscoModelType {
    nombre:string,
    autor:string,
    formato:string,
    matriz?:string,
    pais_impresion:string,
    arte_portada:string, //URL de la imagen
}

//Creo el esquema de disco con mongo
const DiscoSchema = new Schema({
    //Son en mayusculas porque son los tipos de mongoose
    nombre:String,
    autor:String,
    formato:String,
    matriz:String,
    pais_impresion:String,
    arte_portada:String, //URL de la imagen
    //Mongo añade '_id' por defecto
});

//Exporto el modelo de persona
export const DiscoModel = mongoose.model<DiscoModelType>("Disco", DiscoSchema);