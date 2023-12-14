const path = require("path");

const getImage = async (req, res) => {
    try {
        const filename = req.params.filename;
        res.sendFile(path.join(__dirname, `../../public/images/${filename}`));
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

module.exports = {
    getImage
}