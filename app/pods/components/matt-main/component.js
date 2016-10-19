import Ember from "ember";
import faker from "faker";

const {Component, computed, String: {htmlSafe}} = Ember;

export default Component.extend({
    tagName: 'div',
    attributeBindings: ['style'],
    classNames: ['matt'],

    onInsertion: Ember.on('didInsertElement', function () {
        this.scheduleUpdate();
    }),

    scheduleUpdate() {
        Ember.run.later(this, () => {
            this.set("lastUpdated", new Date());
            this.scheduleUpdate();
        }, 3000);
    },

    style: computed('color', function () {
        return htmlSafe(`background-color: ${this.get('color')}`);
    }),

    message: computed('lastUpdated', function () {
        return faker.hacker.phrase();
    }),

    color: computed('lastUpdated', function () {
        return `rgb(${ [1, 1, 1].map(n => faker.random.number(255)).join(',')})`;
    }),

    fgColor: computed('color', function () {
        return htmlSafe(`color: ${this.get('color')}`);
    }),

    image: computed('lastUpdated', function () {
        return faker.internet.avatar();
    })
});
