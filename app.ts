import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import http from 'http';
import middleware from '~/middleware';
import apiRoute from '~/routes';

const app = express();
app.use(express.json());

// config logging
// let logging = morgan('dev');
// if (process.env.NODE_ENV === 'production') {
//   const accessLogStream = rfs.createStream('access.log', {
//     interval: '1d',
//     path: './log'
//   });
//   logging = morgan('combined', {stream: accessLogStream});
// }
// app.use(logging);

const server = http.createServer(app);
const port = Number(process.env.PORT);
const hostName = process.env.HOST;

server.listen(port, hostName, () => {
  console.log(`app listening on port ${port}`);
});

app.use(middleware.reqInterceptor);

// config routing
app.use('/api', apiRoute);

// error handler
app.use(middleware.errorHandler);
