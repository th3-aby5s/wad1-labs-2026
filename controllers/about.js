'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/employees.js";

const about = {
    createView(request, response) {
        logger.info("About page loading!");

        const viewData = {
            title: "Playlist App About",
            info: appStore.getAppInfo()
        };

        response.render('about', viewData);
    },
};

export default about;