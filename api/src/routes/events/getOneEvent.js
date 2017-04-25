import { getOneEvent } from '../../handlers/eventHandler';
import Joi from 'joi';

module.exports = {
    method: 'GET',
    path: '/events/{id}',
    config: {
        // Include this API in swagger documentation
        auth: false,
        tags: ['api'],
        description: 'Get One Event data',
        notes: 'Get One Event data',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: getOneEvent
};
