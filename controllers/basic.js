const error = require('./../modules/errors');

module.exports = {
    home: async(req, res) => {

        if (req.query.ui == "true") {
            
            let html = `<!DOCTYPE html><form action="/" method="post" enctype="multipart/form-data"><label for="file">File: </label><input type="file" name="file" id="file" required> <input type="submit" value="Upload!"></form>`;

            return res.status(200).send(html);

        };

        var model = error("zerochar", req.url);

        return res.status(400).send(model);

    },
    notfound: async(req, res) => {

        var model = error("notfound", req.url);

        return res.status(404).send(model);

    }
};