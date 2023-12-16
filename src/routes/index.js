const site = require("./site");
const food = require("./food");
const image = require("./image");
const user = require("./user");
const review = require("./review");

function route(app) {
    app.use('/food', food);
    app.use('/image', image);
    app.use('/user', user);
    app.use('/review', review);
    app.use('/', site);
}

module.exports = route;