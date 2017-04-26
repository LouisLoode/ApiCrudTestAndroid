import Boom from 'boom';
import Faker from 'faker';
import EventModel from '../models/event';

const eventHandler = {

    deleteOneEvent(req, res) {

        //Fetch all data from mongodb User Collection
        EventModel.findOneAndRemove({ _id: req.params.id }, (error, data) => {

            if (error) {
                res(Boom.serverUnavailable('Failed to delete data', error));
            }
            else {
                if (data === null){
                    res(Boom.notFound('Event Not Found'));
                }
                else {
                    res({ statusCode: 200, message: 'Event Successfully Deleted', data });
                }
            }
        });
    },

    getAllEvents(req, res) {

        const outputFieldsSecurity = 'id name imageUrl createdAt updatedAt';

        //Fetch all data from mongodb User Collection
        EventModel.find({}, outputFieldsSecurity, (error, data) => {

            if (error) {
                res(Boom.serverUnavailable('Failed to get data', error));
            }
            else {
                res({
                    statusCode: 200,
                    message: 'Events Data Successfully Fetched',
                    data
                });
            }
        });
    },

    getOneEvent(req, res) {

        //Fetch all data from mongodb User Collection
        EventModel.findOne({ _id: req.params.id }, (error, data) => {

            if (error) {
                res(Boom.serverUnavailable('Failed to get data', error));
            }
            else {
                if (data != null || data.length === null) {
                    res(Boom.notFound('Event Not Found', data));
                }
                else {
                    res({ statusCode: 200, message: 'Event Data Successfully Fetched', data });
                }
            }
        });
    },

    putOneEvent(req, res) { // Create mongodb user object to save it into database

        // and pass callback methods to handle error
        EventModel.findByIdAndUpdate(req.params.id, req.payload, { new: true, upsert:true }, (error, data) => {

            if (error) {
                res(Boom.serverUnavailable('Failed to put a message', error));
            }
            else {
                res({ statusCode: 200, message: 'Event Saved Successfully', data });
            }
        });
    },

    postEvent(req, res) { // Create mongodb user object to save it into database

        // and pass callback methods to handle error
        const event = new EventModel(req.payload); // Call save methods to save data into database
        event.save((err, data) => {

            if (err) {
                throw Boom.badRequest(err);
            }
            else {
                // If the user is saved successfully, issue a JWT
                res({ statusCode: 201, message: 'User Register Successfully', data}).code(201);
            }
        });
    }
};

module.exports = eventHandler;
