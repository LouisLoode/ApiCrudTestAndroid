// Import dependencies
import Hapi from 'hapi';
import Blipp from 'blipp';
import Good from 'good';
import Inert from 'inert';
import Vision from 'vision';

// Import database
import './config/database';

import glob from 'glob';
import path from 'path';

// Import configuration
import Config from './config/config';
import Swagger from './config/swagger';

const server = new Hapi.Server();

// bootstrap models
glob.sync('models/*.js', {
    root: __dirname,
    ignore: 'models/**/*.spec.js'
}).forEach((file) => {

    require(path.join(__dirname, file));

});

server.connection({
    port: 8000,
    routes: {
        cors: true
    }
});

if (process.env.NODE_ENV === 'development') {
    server.register([
        Inert,
        Vision,
        Swagger
    ]);
}

// Logger
if (process.env.NODE_ENV !== 'test') {
    server.register({
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        log: '*',
                        response: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout'
                ]
            }
        }
    }, (err) => {

        if (err) {
            console.error(err);
        }

    });
}


if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'test'){
    console.log('ROUTING :');
}

// Load routes
server.route(require(path.join(__dirname, 'routes/events/deleteEvent')));
server.route(require(path.join(__dirname, 'routes/events/getAllEvents')));
server.route(require(path.join(__dirname, 'routes/events/getOneEvent')));
server.route(require(path.join(__dirname, 'routes/events/postEvent')));
server.route(require(path.join(__dirname, 'routes/events/putEvent')));

// if (process.env.NODE_ENV !== 'test') {
server.register({ register: Blipp, options: { showAuth : true } }, (err) => {

    if (err) {
        console.error('Error was handled!');
        console.error(err);
    }

    server.start((err) => {

        if (err) {
            console.error('Error was handled!');
            console.error(err);
        }
        console.log(`Server started at ${server.info.uri}`);
        console.log(`Environment ${Config.env}`);

    });

});
// }

module.exports = server;
