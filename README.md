Chat App created with React.js, Node.js, Express.js and MySQL

## Frontend tools

Vite was used to set up the frontend environment, while React Bootstrap was used for styling. For fetching data from the server, Axios was utilized. In the following lines, versions of most important frontend tools are described.

[Vite](https://vitejs.dev) - 4.4.5

[React.js](https://react.dev) - 18.2.0

[Bootstrap](https://react-bootstrap.netlify.app) - 5.3.1

[Axios](https://axios-http.com/docs/intro) - 1.4.0

## Backend tools

MySQL was used as RDBMS. NPM was used as package manager. Node.js along with Express.js were used for backend development. Sequelize was used as ORM. Nodemon was used to monitor changes while developing the REST API. In the following lines, versions of most important backend tools are described.

[NPM](https://www.npmjs.com) - 9.8.0

[Node.js](https://nodejs.org) - 18.12.0

[Express.js](https://expressjs.com) - 4.18.2

[MySQL](https://www.mysql.com) - 8.0

[Sequelize](https://sequelize.org) - 6.32.1

[Nodemon](https://nodemon.io) - 3.0.1

## Environment Setup

For setting both frontend and backend, open the terminal, navigate to the corresponding folder and run

```bash
npm install
npm run dev
```

## Environment variables

Both frontend and backend use environment variables. In order to the application to work, an `.env` must be created inside `frontend` and `backend` folders

## .env structure for frontend

```
VITE_BACKEND_URL={YOUR_ROOT_BACKEND_URL}
```

For example

```
VITE_BACKEND_URL=http://localhost:4000
```

It is important to not have a `/` at the end of the backend url, because the `/` is included at the beginning of every API call from the frontend

## .env structure for backend

```
DB_HOST={YOUR_HOST}
DB_NAME={YOUR_DATABASE_NAME}
DB_USER={YOUR_DATABASE_USER}
DB_PASS={YOUR_DATABASE_PASSWORD}
DB_PORT={YOUR_DATABASE_PORT}

FRONTEND_URL={YOUR_FRONTEND_URL}
```

For example, using the given credentials for the challenge

```
DB_HOST=data-avimo.cgriqmyweq5c.us-east-2.rds.amazonaws.com
DB_NAME=testing_ali_fullstack
DB_USER=testing
DB_PASS=Pruebas%ALI%2020
DB_PORT=3306

FRONTEND_URL=http://localhost:5173
```

As in the frontend `.env` file, it is important to not have a `/` at the end of the frontend URL