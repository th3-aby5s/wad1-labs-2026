'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const appStore = {

    store: new JsonStore('./models/employees.json', { employee: {} }),
    collection: 'employee',

    getAppInfo() {
        return this.store.findAll(this.collection);
    },

};

export default appStore;