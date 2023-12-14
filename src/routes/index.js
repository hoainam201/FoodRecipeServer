const site = require("./site");
const food = require("./food");
const image = require("./image");

function route(app) {
    app.use('/food', food);
    app.use('/image', image);
    app.use('/', site);
}

module.exports = route;