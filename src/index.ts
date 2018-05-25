
import debug from 'debug';
import * as http from 'http';
import fs from 'fs';
import spdy from 'spdy';
import Server from './server';
import { ContainerProvider } from './container/ContainerProvider';
import { log, LogLevel } from './logger/ILogger';

debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3000);
Server.set('port', port); 
const options: spdy.ServerOptions = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert:  fs.readFileSync(__dirname + '/server.crt'),
  spdy: {
    protocols: [ 'h2', 'spdy/3.1', 'http/1.1' ],
    plain: false,

    // **optional**
    // Parse first incoming X_FORWARDED_FOR frame and put it to the
    // headers of every request.
    // NOTE: Use with care! This should not be used without some proxy that
    // will *always* send X_FORWARDED_FOR
    'x-forwarded-for': true,

    connection: {
      windowSize: 1024 * 1024, // Server's window size

      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
      autoSpdy31: false
    }
  }
}

 const server = spdy.createServer(options, Server);
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);


ContainerProvider.registerProviders();

function normalizePort(val: number|string): number|string|boolean {
  const port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(port)) { return val; } else if (port >= 0) { return port; } else { return false; }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') { throw error; }
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      log(`${bind} requires elevated privileges`, 'index.ts', 'onError', LogLevel.Error);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      log(`${bind} is already in use`, 'index.ts', 'onError', LogLevel.Error);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`); 
  log(`Server listening on port ${port}`);
}