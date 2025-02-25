const db_config = require('./models/db_config');

/* in app.js : const app = express ();*/
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.SERVER_PORT || db_config.SERVER_PORT);
app.set('port', port);

const errorHandler = error => {
    // console.log ('In errorHandler error ', error);
    if (error.syscall !== 'listen') {
	throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
    case 'EACCES':
	console.error(bind + ' requires elevated privileges.');
	process.exit(1);
	break;
    case 'EADDRINUSE':
	console.error(bind + ' is already in use.');
	process.exit(1);
	break;
    default:
	throw error;
    }
};

const server = app.listen(port, function(){
    console.log('Listening on Server port ' + port);
});
