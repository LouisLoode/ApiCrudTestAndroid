import { postEvent } from '../../handlers/eventHandler';
import Joi from 'joi';

module.exports = {
    method: 'POST',
    path: '/events',
    config: {
        // "tags" enable swagger to document API
        auth: false,
        tags: ['api'],
        description: 'Post event data',
        notes: 'Post event data', // We use Joi plugin to validate request
        validate: {
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
    handler: postEvent
};
