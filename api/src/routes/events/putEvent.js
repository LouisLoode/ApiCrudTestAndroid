import { putOneEvent } from '../../handlers/eventHandler';
import Joi from 'joi';

module.exports = {
    method: 'PUT',
    path: '/events/{id}',
    config: { // "tags" enable swagger to document API
        auth: false,
        tags: ['api'],
        description: 'Update event data',
        notes: 'Update event data', // We use Joi plugin to validate request
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: { // Both name and age are required fields
                name: Joi.string().required(),
                imageUrl: Joi.string(),
                description: Joi.string(),
                information: Joi.string(),
                location: Joi.object().keys({
                    latitude: Joi.number(),
                    longitude: Joi.number()
                })
            }
        }
    },
    handler: putOneEvent
};
