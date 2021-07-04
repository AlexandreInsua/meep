# App recurso de transporte

Se trata de una pequeña applicación web escrita en Angular. 

## Levantar la aplicación

Para levantar la aplicación en modo desarrollo hay que seguir los pasos que se detallan a continuación.

### Requisitos previos

1. Es necesario instalar el entorno de ejecucion **NodeJS**. Para ello se debe ir a su [sitio web](https://nodejs.org/es/) y consultar el procedimiento de instalación adecuado para el equipo. La versión usada es la 12.16.1.

2. En segundo lugar, hay que instalar **Angular**. En la [web oficial](https://angular.io/) se puede descargar la versión adecuada. Se ha usado Angular 9.0.0.

### Preparación y ejecución

3. Descargar el repositorio y descomprimirlo.
4. Abrir una consola en la raiz del proyecto y moverse dentro de la carpeta `source`.
5. Instalar las dependencias del proyecto con el comando `$ npm install`.
6. Lanzar la aplicación con el comando `$ ng serve`. Se levantará un servidor en el puerto 4200 del localhost. 

## Notas
En el proyecto se ha usado la libreria **Angular Material**, que aporta fuentes, iconos y algunos componentes. 

Para redenrizar el mapa, se ha escogido la librería **Leaflet**, que gestiona los marcadores. En este mapa, los recursos se representan con un marcador verde (con batería >25%) o gris.

El árbol que permite filtrar los marcadores según el tipo de recurso se construye dinámicamente en función del los datos recibidos.

El panel de la tabla integra varios componentes de Angular Material. Concretamente se ha usado `mat-table` y `mat-input`.

La comunicación con el backend se realiza con un servicio de angular que usa un cliente de http propioo de este framework. 

Como el servicio falló en dos ocasiones, la llamada al servicio está comentada. Se ha mockeado una respuesta desde un fichero json que repruduce la estructura de datos enviada.
