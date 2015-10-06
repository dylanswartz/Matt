import Ember from 'ember';
import faker from 'npm:faker/build/build/faker.min';

export default Ember.Controller.extend({

    init: function () {
        this.scheduleUpdate();
    },

    scheduleUpdate: function () {
        Ember.run.later(this, () => {
            this.set("lastUpdated", new Date());
            this.scheduleUpdate();
        }, 3000);
    },

    message: Ember.computed('lastUpdated', function () {
        return faker.hacker.phrase();
    }),

    color: Ember.computed('lastUpdated', function () {
        return `rgb(${ [1, 1, 1].map(n => faker.random.number(255)).join(',')})`;
    }),

    fgColor: Ember.computed('color', function () {
        return new Ember.Handlebars.SafeString(`color: ${this.get('color')}`);
    }),

    bgColor: Ember.computed('color', function () {
        return new Ember.Handlebars.SafeString(`background-color: ${this.get('color')}`);
    }),

    image: Ember.computed('lastUpdated', function () {
        return faker.internet.avatar();
    })
});