import Mongoose from 'mongoose';
const Schema = Mongoose.Schema;

// set up a mongoose model
const EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: { type: String, required: true, default: 'http://lorempixel.com/500/500/' },
    description: { type: String, required: true, default: null },
    information: { type: String, required: true, default: null },
    location: {
        latitude: { type: Number, required: true, default: null },
        longitude: { type: Number, required: true, default: null }
    }
},{
    timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

//Transform
EventSchema.options.toJSON = {
    transform(doc, ret) {

        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;

    }
};

/**
 * Middleware for updating the date.
 */
EventSchema.pre('update',() => {

    this.update({},{ $set: { updated: new Date() } });

});


module.exports = Mongoose.model('Event', EventSchema);
