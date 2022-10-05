const error = require('./../modules/errors');

module.exports = {
    uploadFile: async(req, res) => {

        const { join: path } = require('path');
        const { readFileSync: read } = require('fs');

        if (!req.files) return res.status(400).send(error("nofile", req.url));

        let file = req.files.file;

        let fileName = file.name;

        try {
            
            file.mv(path(__dirname, "..", "uploads", fileName));

            res.status(201).redirect('/'+fileName);

        } catch (errors) {

            console.error(`[ ${new Date().toLocaleString()} ] Error "${errors.name}" appeared during "file.mv()" function...`);
            console.error(`[ ${new Date().toLocaleString()} ] Error: `, errors);

            return res.status(500).send(error("filenotmoved", req.url));

        }

    },
    deleteFile: async(req, res) => {

        const { join: path } = require('path');
        const { readFileSync: read, unlinkSync: remove } = require('fs');

        const { file } = req.params;
        const { deleteKey } = req.query;

        if (!deleteKey) return res.status(401).send(error("unauthorizedDeleteKey", req.url));

        if (deleteKey !== process.env["deleteKey"]) return res.status(401).send(error("unauthorized", req.url));

        if (deleteKey === process.env["deleteKey"]) try {

            remove(path(__dirname, "..", "uploads", file));

            return res.status(200).send({ code: "OK", message: "File was removed successfuly", status: 200, url: req.url, date: new Date() });

        } catch (errors) {

            console.error(`[ ${new Date().toLocaleString()} ] Error "${errors.name}" appeared during "remove()" function...`);
            console.error(`[ ${new Date().toLocaleString()} ] Error: `, errors);

            return res.status(500).send(error("filenotdeleted", req.url));

        };

    }
};