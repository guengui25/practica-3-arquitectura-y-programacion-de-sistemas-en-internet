//Así consigo la documentación de tipos de express

// @deno-types="npm:@types/express"

import express , {Request, Response}from "npm:express@4.18.2"; //Importo express

import {disco} from "./disco.ts"; //Importo desde definiciones disco

const app = express(); //Inicializo el servidor de express

const temporal:disco[] = [{
    nombre: "Álbum 1",
    autor: "Artista 1",
    formato: "CD",
    matriz: "MATRIZ_1",
    pais_impresion: "País 1",
    arte_portada: "URL_1",
    id: 1
  },
  {
    nombre: "Álbum 2",
    autor: "Artista 2",
    formato: "Vinilo",
    pais_impresion: "País 2",
    arte_portada: "URL_2",
    id: 2
  },
  {
    nombre: "Álbum 3",
    autor: "Artista 3",
    formato: "CD",
    matriz: "MATRIZ_3",
    pais_impresion: "País 3",
    arte_portada: "URL_3",
    id: 3
  },
  {
    nombre: "Álbum 4",
    autor: "Artista 4",
    formato: "Casete",
    pais_impresion: "País 4",
    arte_portada: "URL_4",
    id: 4
  },
  {
    nombre: "Álbum 5",
    autor: "Artista 5",
    formato: "Vinilo",
    matriz: "MATRIZ_5",
    pais_impresion: "País 5",
    arte_portada: "URL_5",
    id: 5
  }];

//Métodos GET
//Obtener todos los discos existentes
app.get("/get/discos",(req: Request,res: Response)=>{
    res.json(temporal);  //Mando el json con todos los discos
});

//Obtener un disco mediante id
app.get("/get/disco/:id",(req: Request,res: Response)=>{
    try{
        const id = Number(req.params.id);
        if(isNaN(id)){
            res.status(400).send("El id tiene que ser un número");
            return;
        }

        temporal.forEach(element => {
            if(element.id === id){
                res.json(element); //Si el id dado es igual al id del disco devuelvo su información
            }
        })
    }
    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    }
});

//Obtener listado de discos según nombre
app.get("/get/discos/:nombre",(req: Request,res: Response)=>{
    try{
        const nombre = req.params.nombre;
        const coincide = temporal.filter(element => {
            return element.nombre.includes(nombre)
        })

        res.json(coincide); //Si cumple con el nombre
    }
    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    }
});

//Obtener listado de discos según formato
app.get("/get/discos/listado/formato/:formato",(req: Request,res: Response)=>{
    try{
        const formato = req.params.formato;
        const coincide = temporal.filter(element => {
            return element.formato === formato
        })

        res.json(coincide); //Si cumple con el formato
    }
    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    }
});

//Obtener listado de discos según país de impresión
app.get("/get/discos/listado/pais/:pais",(req: Request,res: Response)=>{
    try{
        const pais = req.params.pais;
        const coincide = temporal.filter(element => {
            return element.pais_impresion.includes(pais);
        })

        res.json(coincide); //Si cumple con el formato
    }
    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    }
});


//Métodos POST

//Middleware para analizar el cuerpo de la solicitud JSON
//Hago que pueda recibir el body y sepa interpretarlo
app.use(express.json());

app.post("/post",(req: Request,res: Response)=>{

    const disco = req.body; //Especifico que el disco tiene la información en el body del request

    console.log(disco); //Muestro por consola la información del disco a añadir

    disco.id = temporal.length + 1; //Agrego el id -- Cambiar por el de mongo

    temporal.push(disco); //Agrego el disco a la "base de datos"

    res.json({ mensaje: 'Datos recibidos correctamente', disco}); //Devuelvo un JSON con el disco, para mostrarlo
});

//Métodos PUT
app.put("/put",(req: Request,res: Response)=>{

    const disco = req.body; //Especifico que el disco tiene la información en el body del request

    console.log(disco); //Muestro por consola la información del disco a añadir

    temporal.forEach(element => {
        if(element.id === disco.id){
            element = disco;
        }
    });

    res.json({ mensaje: 'Datos modificados correctamente', disco});
});

//Métodos DELETE
app.delete("/delete/:id",(req: Request,res: Response)=>{

    try{
        const id = Number(req.params.id);
        if(isNaN(id)){
            res.status(400).send("El id tiene que ser un número");
            return;
        }
        console.log("Se va a borrar el disco con el id:",id); //Muestro por consola la información del disco a añadir

        temporal.splice(id-1,1) //Elimino el elemento con el id dado

        res.json({ mensaje: "El disco con el id "+id+" se ha borrado correctamente"});
    }
    catch(e){
        res.status(500).send("Error 500"); //Devuelvo un status 500 (error fatal)
    } 
});


//Ejecución
app.listen(3000, () => {
    console.log("El servidor está corriendo en el puerto 3000")
});