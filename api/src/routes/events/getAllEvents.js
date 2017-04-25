import { getAllEvents } from '../../handlers/eventHandler';

module.exports = {
    method: 'GET',
    path: '/events',
    config: {
        // Include this API in swagger documentation
        // auth: 'jwt',
        auth: false,
        tags: ['api'],
        description: 'Get All Events',
        notes: 'Get All Events',
    },
    handler: getAllEvents
};
