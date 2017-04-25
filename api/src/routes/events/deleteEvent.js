import { deleteOneEvent } from '../../handlers/eventHandler';
import Joi from 'joi';

module.exports = {
    method: 'DELETE',
    path: '/events/{id}',
    config: {
        // Include this API in swagger documentation
        auth: false,
        tags: ['api'],
        description: 'Delete One User',
        notes: 'Delete One User',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: deleteOneEvent
};
