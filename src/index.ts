
import debug from 'debug';
import * as http from 'http';

import Server from './server';
import { ContainerProvider } from './container/ContainerProvider';
import { log, LogLevel } from './logger/ILogger';

debug('ts-express:server');

const port = normalizePort(process.env.PORT || 3000);
Server.set('port', port);

const server = http.createServer(Server);
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