# Spin me like a record

Crear un API para el guardado de discos de música. 

De cada disco se guardarán los siguientes datos:
   - Nombre
   - Autor
   - Formato (LP, CD, single, cassette, reel to reel, minidisc, videocd ...)
   - Matriz (si existe)
   - País de impresión
   - Arte de portada
   - id

## El api deberá de poseer las siguientes llamadas:

### GET
   - Obtener todos los discos existentes
   - Obtener un disco mediante id
   - Obtener listado de discos según nombre
   - Obtener listado de discos según formato
   - Obtener listado de discos según país de impresión

### POST

   - Crear nuevo disco

### PUT

   - Actualizar un disco existente indicándolo por su id

### DELETE

   - Eliminar un disco mediante su id


## Notas

En el repositorio el readme deberá funcionar como documentación del API indicando todos los endpoints y parámetros necesarios para su uso.

Creando el api con exclusivamente datos locales se podrá llegar a la nota máxima de 6.

Implementando mongodb al guardado, obtención y modificación de los datos se podrá llegar a un 9.

Para obtener la puntuación máxima habrá que publicar el trabajo en deno deploy.

----