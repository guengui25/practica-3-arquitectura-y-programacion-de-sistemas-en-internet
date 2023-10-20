# Documentación del proyecto

Está actualmente deployeado usando DenoDeploy

https://pr3-discos.deno.dev/


Hay que añadir un archivo .env con la variable de entorno URL que contenga la url de la base de datos de mongo.


Ejemplo:

```env
URL=mongodb+srv://usuario:contrasena@cluster0.ioi135h.mongodb.net/Practica3-Discos?retryWrites=true&w=majority
```

## Endpoints

### GET

- Obtener todos los discos existentes
    - /get/discos
- Obtener un disco mediante id
    - /get/discos/:id
- Obtener listado de discos según nombre
    - /get/discos/nombre/:nombre
- Obtener listado de discos según formato
    - /get/discos/listado/formato/:formato
- Obtener listado de discos pais de impresión
    - /get/discos/listado/pais/:pais


### POST

- Añadir un disco (mandar el disco en formato JSON)
    - /post/disco


Ejemplo formato de los discos:
```json
{
  "nombre": "Nombre del disco",
  "autor": "Nombre del autor",
  "formato": "Formato del disco",
  "matriz": "Nombre de matriz (opcional)",
  "pais_impresion": "País de impresión",
  "arte_portada": "URL de la imagen de portada"
}

```

### PUT

- Modificar un disco (mandar el disco en formato JSON)
    - /put/disco


### DELETE

- Eliminar un disco
    - /delete/disco/:id
