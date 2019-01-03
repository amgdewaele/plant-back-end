const assert = require('assert');
const mocha = require('mocha');
const beforeEach = mocha.beforeEach;
const describe = mocha.describe;
const it = mocha.it;
const Plant = require('../model/plant.model');
const PlantFactory = require('./factories/plant.factory');

describe('Finding plants in the database', () => {
    'use strict';
    let pilea;
    beforeEach(() => {
        pilea = new Plant( PlantFactory.generate);
        pilea.save()
            .then(() => {
                assert(!pilea.isNew);
                done();
            });
    });

    it('Find all plants by name', () => {
        Plant.find( { name: pilea.name } )
            .then((plants) => {
                assert(plants[0]._id.toString() === pilea._id.toString());
                done();
            });
    });

    it('Find one plant by Id', () => {
        Plant.findById( { _id: pilea._id } )
            .then((plant) => {
                assert(plant.name === pilea.name);
                done();
            });
    });
});