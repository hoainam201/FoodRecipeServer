const site = require("./site");
const food = require("./food");

function route(app) {
    app.use('/food', food);
    app.use('/', site);
}

module.exports = route;