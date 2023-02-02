import { CorsOptions } from 'cors';
import { Server } from 'http';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const logger = require('./app/utilities/logger');
const routes = require('./app/routes/appRoutes');

// How to create localhost https node server
// https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/

dotenv.config();

const app = express();
const allowedOrigins = [
  'https://localhost',
  'http://localhost',
  'https://localhost:3000',
  'http://localhost:3000',
  /\.omegafox\.me$/
];

const options: CorsOptions = {
  origin: allowedOrigins
};

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins
  })
);

app.use(cors(options));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const environment = app.get('env');
let server: Server;
let serverPort: number;

app.set('trust proxy', 1); // trust first proxy

if (environment === 'production') {
  serverPort = 40000;
} else {
  serverPort = 63768;
}
server = http.createServer(app);
app.use(logger);

server
  .listen(serverPort, () => {
    console.log(
      `Web server listening on port ${serverPort} at ${environment} environment`
    );
  })
  .on('error', (error: any) => {
    let result;
    if (typeof error === 'string') {
      result = error.toUpperCase(); // works, `e` narrowed to string
    } else if (error instanceof Error) {
      result = error.message; // works, `e` narrowed to Error
    }

    console.log(result);
  });

routes(app); // register the routes

module.exports = app;
