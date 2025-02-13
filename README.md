# 🛒 Tienda API - Backend
**Prueba Técnica Backend - Boxit (Febrero 2025)**

API RESTful para la gestión de productos, usuarios y pedidos, con reportes en tiempo real.  
Desarrollado con **Node.js, Express, Sequelize (SQL Server), Mongoose (MongoDB) y TypeScript**.

---

## 📌 Características Principales
✅ **CRUD de Productos** 🛍  
✅ **Registro y Autenticación de Usuarios** 🔑  
✅ **Creación y Consulta de Pedidos** 📦  
✅ **Reportes en Tiempo Real con `Socket.io`** 📊  
✅ **Base de Datos Relacional (SQL Server) y NoSQL (MongoDB)** 🛢  
✅ **Pruebas Automáticas con Jest** ✅  

---

## 🔹 **Instalación y Configuración**
### **1️⃣ Clonar el Repositorio**
```sh
git clone https://github.com/martinheler/Tienda.git
cd Tienda

2️⃣ Instalar Dependencias

npm install

3️⃣ Configurar Variables de Entorno
Crea un archivo .env en la raíz del proyecto y agrega:

PORT=3000
SQL_SERVER_HOST=localhost
SQL_SERVER_USER=sa
SQL_SERVER_PASSWORD=tu_contraseña
SQL_SERVER_DATABASE=tienda
MONGODB_URL=mongodb://localhost:27017/tienda_logs
JWT_SECRET=supersecretkey

⚠ IMPORTANTE:
Si usas MongoDB Atlas, cambia MONGODB_URL con tu cadena de conexión.

🔹 Ejecución del Proyecto
1️⃣ Crear Base de Datos
npx sequelize-cli db:migrate

Si necesitas reiniciar la BD:

npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate

2️⃣ Iniciar el Servidor

🔹 Modo Desarrollo
npm run dev

🔹 Modo Producción
npm run build
npm start

El servidor correrá en:
📍 http://localhost:3000

🔹 Endpoints Disponibles

📌 CRUD de Productos
Método	Ruta	        Descripción
GET	    /products	    Obtener todos los productos
POST	/products	    Crear un producto
PUT	    /products/:id	Actualizar un producto
DELETE	/products/:id	Eliminar un producto

📌 Registro y Autenticación de Usuarios

Método	Ruta	            Descripción
POST	/users/register	    Registrar un usuario
POST	/users/login	    Iniciar sesión

📌 Gestión de Pedidos
Método	Ruta	        Descripción
POST	/orders	        Crear un pedido
GET	    /orders/:userId	Obtener pedidos de un usuario

📌 Reportes en Vivo
Método	Ruta	                        Descripción
GET	    /reports/daily-sales	        Total de ventas del día
GET	    /reports/best-selling-product	Producto más vendido
GET	    /reports/top-users	            Usuarios con más compras

📌 Los reportes se actualizan en tiempo real con socket.io.

🔹 Pruebas Automáticas
Ejecuta las pruebas con:
npm test

Ejecutar una prueba específica:

npm test order.test.ts
npm test user.test.ts
npm test report.test.ts

🔹 Tecnologías Utilizadas
Node.js y Express - API REST
Sequelize - ORM para SQL Server
Mongoose - ODM para MongoDB
TypeScript - Código tipado
Jest y Supertest - Pruebas unitarias y de integración
Socket.io - Actualización en tiempo real
JWT - Autenticación segura

🚀 Autor
Martín Coronado
📧 martin.coronado@yahoo.com
🔗 https://github.com/martinheler

📌 Licencia
Este proyecto está bajo la licencia MIT.

