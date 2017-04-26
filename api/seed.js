require( 'babel-core/register' );

const Async = require('async');
const faker = require('faker');
const request = require('request');
// require('./src/config/database');
const EventModel = require('./src/models/event');

const nbr = 25;

const seed = [];
for ( let i = 0; i < nbr; ++i ) {
    seed.push((callback) => {

        const event = new EventModel({
            name: faker.name.findName(),
            imageUrl: faker.image.imageUrl(),
            description: faker.lorem.paragraph(),
            information: faker.lorem.sentences(),
            location: {
              latitude: faker.address.latitude(),
              longitude: faker.address.longitude()
            }
        }); // Call save methods to save data into database
        // event.save((err, data) => {
        //
        //     if (err) {
        //         console.log('Error during import');
        //         console.log(err);
        //     }
        //     else {
        //         console.log('Good import');
        //         callback(null, i);
        //     }
        // });



        var options = { method: 'POST',
          url: 'http://163.172.29.197:8000/events',
          headers: { 'content-type': 'application/json' },
          body: event,
          json: true };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
        });

    });
}

Async.series(seed, (err, results) => {

    if (err){
        console.log(err);
        process.exit(1);
    }
    console.log('Import data in MongoDB done with ' + results.length + ' entries');
    process.exit(0);

});
