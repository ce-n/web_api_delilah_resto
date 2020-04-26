# Delilah Restó - Web API
## Orders management API

El objetivo de esta API es permitir la administración de pedidos hechos por usuarios a un restaurante.

1. Cómo comenzar
2. Prerrequisitos
3. Estructura de carpetas
4. Instalación
5. Inicializar 
6. Funcionamiento

## Cómo comenzar
Las siguientes instrucciones te permitirán ejecutar el proyecto en un entorno local.

## Prerrequisitos
En primer lugar debes descargar Node JS en tu computadora (https://nodejs.org/es/). Una vez que lo tengas instalado podrás levantar el servidor desde una consola.

## Estructura de carpetas
A continuación se presenta la estructura de carpetas. Cada una contiene los archivos necesarios para el funcionamiento de la API.

- **src**
    - **app**
        - database
        - features
            - client_orders
            - detail_orders
            - detail_per_products
            - favourites
            - payment_methods
            - status
            - users
        - middleware
    - **config**


## Instalación
Una vez que tengas la copia local del proyecto, deberás acceder a la carpeta

*proyecto/src/config*

Allí encontrarás un script en el que podrás setear las distintas propiedades que tendrá tanto la base de datos, como el servidor y la firma necesaria para generar tokens.

### **Crear Base de Datos**
Desde la carpeta database (*proyecto/src/app/database*) podrás acceder a un script **DB_delilah_resto.sql**  que te permitirá generar una base de datos.  
  
## Inicializar 

### **Levantar Servidor**
Luego de haber realizado la configuraciones pertinentes y generado la base de datos, podrás poner en funcionamiento el servidor.  
**Pasos a seguir:**  
Desde la carpeta raíz del proyecto, debemos instalar las dependencias necesarias por medio del comando:  

~~~  
npm i  
~~~

Si todo sale correctamente, en el directorio raíz se generará una carpeta ***node_modules***.

Para levantar el servidor existen dos opciones:
Ejecutando el comando  
~~~  
npm start  
~~~
Ejecutando el comando  
~~~  
node server.js  
~~~  
Desde la carpeta ***proyecto/src***

Si todo está bien, veremos un mensaje en  la consola:
~~~
Connection has been established successfully.
Server listen in port 3000  
~~~
## Funcionamiento
### **Operaciones CRUD a la base de datos**
Es posible agregar, consultar, actualizar e eliminar datos por medio de diferentes endpoints.

### **Crear usuario**
Método HTTP: **POST**  
Endpoint: *localhost:3000/user*  
**Request body:**
~~~
{
  "name": "John",
  "lastname": "Doe",
  "email": "joe-doe@gmail.com",
  "telephone": "351123654",
  "address": "Calle 50, Barrio. Ciudad, País.",
  "password": "pss_123",
}

~~~

**Response:**
~~~
{
    "message": "Successful operation. User created",
    "user_id": 16
}

~~~

### **Crear log in de usuario**
Método HTTP: **POST**  
Endpoint: *localhost:3000/user/login*  
**Request body:**
~~~
{
	"username": "Ce",
	"password": "eddadasd56565"
}

~~~

**Response:**
~~~
{
    "message": "User logged in succefully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInVzZXJuYW1lIjoiQ2UiLCJlbWFpbCI6ImMubmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJlZGRhZGFzZDU2NTY1IiwiaXNBZG1pbiI6MCwiaWF0IjoxNTg3NDA5NzM0fQ.ZU--XTDBXst-fXVG7Enxs0nvgDe76qNk496vQ5eJf7U"
}

~~~

### **Listar productos**
Método HTTP: **GET**  
Endpoint: *localhost:3000/products*  

**Response:**
~~~
[
    {
        "id": 1,
        "name": "Pizza Napolitana",
        "price_per_unit": 300,
        "image_url": ""
    },
    {
        "id": 2,
        "name": "Hamburguesa Completa",
        "price_per_unit": 250,
        "image_url": ""
    },
    {
        "id": 3,
        "name": "Cerveza Stella Artois",
        "price_per_unit": 150,
        "image_url": ""
    }
]

~~~

### **Crear pedido**
Método HTTP: **POST**  
Endpoint: *localhost:3000/orders*

**Request header:**
~~~

    key: Authorization
    value": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInVzZXJuYW1lIjoiQ2UiLCJlbWFpbCI6ImMubmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJlZGRhZGFzZDU2NTY1IiwiaXNBZG1pbiI6MCwiaWF0IjoxNTg3NDA5NzM0fQ.ZU--XTDBXst-fXVG7Enxs0nvgDe76qNk496vQ5eJf7U


~~~

**Request body:**
~~~
{
    "hour": "10:00:11",
    "status_id": 1,
    "payment_id": 2,
    "product_id": 6,
    "number_of_unit": 2
}
~~~

**Response:**
~~~
{
    "message": "Successful operation. Order created",
    "client_order_information": {
        "client_order_id": 37,
        "detail_order_id": 32,
        "detail_per_product_id": 35
    }
}
~~~

### **Actualizar status de pedido**
Método HTTP: **PUT**  
Endpoint: *localhost:3000/orders/status/:orderid*

**Request header:**
~~~

    key: Authorization
    value": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInVzZXJuYW1lIjoiQ2UiLCJlbWFpbCI6ImMubmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJlZGRhZGFzZDU2NTY1IiwiaXNBZG1pbiI6MCwiaWF0IjoxNTg3NDA5NzM0fQ.ZU--XTDBXst-fXVG7Enxs0nvgDe76qNk496vQ5eJf7U


~~~

**Request body:**
~~~
{
    "status_id": 4
}
~~~

**Response:**
~~~
{
    "message": "Order status updated",
    "order_id": 9,
    "status": 4
}
~~~

### **Borrar pedido**
Método HTTP: **DELETE**  
Endpoint: *localhost:3000/orders/:orderid*

**Request header:**
~~~

    key: Authorization
    value": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInVzZXJuYW1lIjoiQ2UiLCJlbWFpbCI6ImMubmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJlZGRhZGFzZDU2NTY1IiwiaXNBZG1pbiI6MCwiaWF0IjoxNTg3NDA5NzM0fQ.ZU--XTDBXst-fXVG7Enxs0nvgDe76qNk496vQ5eJf7U


~~~

**Response:**
~~~
{
    "message": "The order has been deleted"
}
~~~

### **Crear producto**
Método HTTP: **POST**  
Endpoint: *localhost:3000/products*

**Request header:**
~~~

    key: Authorization
    value": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInVzZXJuYW1lIjoiQ2UiLCJlbWFpbCI6ImMubmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJlZGRhZGFzZDU2NTY1IiwiaXNBZG1pbiI6MCwiaWF0IjoxNTg3NDA5NzM0fQ.ZU--XTDBXst-fXVG7Enxs0nvgDe76qNk496vQ5eJf7U


~~~

**Request body:**
~~~
{
  "name": "Pizza Napolitana Grande",
  "price_per_unit": 300,
  "image_url": ""
}
~~~

**Response:**
~~~
{
    "message": "Successful operation. Product created",
    "product_id": 12
}
~~~

### **Editar producto**
Método HTTP: **PUT**  
Endpoint: *localhost:3000/products/:productid*

**Request header:**
~~~

    key: Authorization
    value": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInVzZXJuYW1lIjoiQ2UiLCJlbWFpbCI6ImMubmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJlZGRhZGFzZDU2NTY1IiwiaXNBZG1pbiI6MCwiaWF0IjoxNTg3NDA5NzM0fQ.ZU--XTDBXst-fXVG7Enxs0nvgDe76qNk496vQ5eJf7U


~~~

**Request body:**
~~~
{
  "name": "Milanesa de Pollo",
  "price_per_unit": 280,
  "image_url": ""
}
~~~

**Response:**
~~~
{
    "message": "Product updated",
    "product": {
        "name": "Milanesa de Pollo",
        "price_per_unit": 280,
        "image_url": ""
    }
}
~~~

### **Eliminar producto**
Método HTTP: **DELETE**  
Endpoint: *localhost:3000/products/:productid*

**Request header:**
~~~

    key: Authorization
    value": Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjQsInVzZXJuYW1lIjoiQ2UiLCJlbWFpbCI6ImMubmFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJlZGRhZGFzZDU2NTY1IiwiaXNBZG1pbiI6MCwiaWF0IjoxNTg3NDA5NzM0fQ.ZU--XTDBXst-fXVG7Enxs0nvgDe76qNk496vQ5eJf7U


~~~

**Response:**
~~~
{
    "message": "The product has been deleted"
}
~~~

### **Aclaraciones**
Es importante tener en cuenta que algunas acciones solo podrán ser generadas si el usuario cuenta con permisos de administrador. Es por ello que el rol se verifica por medio de un token, el cual se envía en las peticiones dentro de los headers. 

