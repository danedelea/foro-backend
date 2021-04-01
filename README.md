# CONFIGURACIÓN DEL SERVIDOR
Para la configuración del servidor se han instalado las siguientes dependencias:

- **Morgan**: Dependencia para ver por consola las peticiones (get, post...) que se realizan al servidor.

- **Express**: Dependencia para crear aplicaciones de servidor sin tener que crear todo de 0.

- **Mongoose**: Dependencia de mysql que da soporte a las promesas para poder usar async-await.

- **Cors**: Dependencia que permite la facilitanción en la comunicación con el Rest-API.

- **Dotenv**: Módulo para poder hacer uso de las variables de entorno.

---
Los comandos usados para la automatización del servidor son:

- **npm run build**: Para la transformación automática del archivo _src/index.ts_ al archivo _build/index.js_ cuando guardemos los cambios. 

>Para la creación del archivo _build/index.js_ se tiene que usar primero el comando _npm install -g typescript_, para poder transformar el archivo _.ts_ a _.js_.

>Después, es necesario usar el comando _tsc --init_ para la creación del archivo _tsconfig.json_, cambiando dentro la opción de _target_ a _es6_ y colocando en la opción de _outDir_ el valor de _"./build"_. Esto último es para que los cambios de la transformación, se guarden en la carpeta _build_

- **npm run dev**: Para comprobar automáticamente qué ha cambiando de la carpeta _build_ y reiniciar así el código cuando guardemos los cambios.

> Para que este comando sea efectivo, hay que instalar la dependencia de **nodemon** mediante el comando _npm i nodemon -D_, que con la opción de _-D_ la instalará a parte de las dependencias ya instaladas para que solo afecte mientras esté el proyecto en desarrollo y no en producción

Estos comandos quedan configurados en el archivo _package.json_ de la siguiente forma:
```JSON
  "scripts": {
    "build": "tsc -w",
    "dev": "nodemon build/index.js"
  }
```