const error = require('./../modules/errors');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {

    const file = req.params.id;

    const filePath = path.join(__dirname, '..', 'uploads', file);

    try {
        
        if (!fs.existsSync(filePath)) {

            var model = error("notfound", req.url);

            return res.status(404).send(model);

        };

        let options = {};

        let start;
        let end;

        const range = req.headers.range;
        if (range) {
            const bytesPrefix = "bytes=";
            if (range.startsWith(bytesPrefix)) {
                const bytesRange = range.substring(bytesPrefix.length);
                const parts = bytesRange.split("-");
                if (parts.length == 2) {
                    const rangeStart = parts[0] && parts[0].trim();
                    if (rangeStart && rangeStart.length > 0) {
                        options.start = start = parseInt(rangeStart);
                    };
                    const rangeEnd = parts[1] && parts[1].trim();
                    if (rangeEnd && rangeEnd.length > 0) {
                        options.end = end = parseInt(rangeEnd);
                    };
                };
            };
        };

        var fileType = require('mime-types').lookup(path.extname(filePath));

        res.setHeader('content-type', fileType);

        fs.stat(filePath, (err, stat) => {
            if (err) {
                console.error(`Error while processing stats of file with path "${filePath}"`);
                console.error(err.stack ? err.stack : err);
                var model = error("servererror", req.url);

                return res.status(500).send(model);
            };

            let contentLength = stat.size;

            if (req.method.toUpperCase() == "HEAD") {
                res.statusCode = 200;
                res.setHeader("accept-ranges", "bytes");
                res.setHeader("content-length", contentLength);
                res.end();
            } else {
                let retrievedLength;
                if (start != undefined && end != undefined) {
                    retrievedLength = (end+1) - start;
                }
                else if (start != undefined) {
                    retrievedLength = contentLength - start;
                }
                else if (end != undefined) {
                    retrievedLength = (end+1);
                }
                else {
                    retrievedLength = contentLength;
                };

                res.statusCode = start != undefined || end != undefined ? 206 : 200;

                res.setHeader("content-length", retrievedLength);

                if (range != undefined) {
                    res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
                    res.setHeader("accept-ranges", "bytes");
                };

                const fileStream = fs.createReadStream(filePath, options);
                fileStream.on('error', error => {
                    console.error('Error while processing stream of file with path '+filePath);
                    console.error(error.stack ? error.stack : error);
                    var model = error("servererror", req.url);

                    return res.status(500).send(model);
                });

                fileStream.pipe(res);
            };
        });

    } catch (e) {
        
        console.error(e.stack ? e.stack : e);

        var model = error("servererror", req.url);

        return res.status(500).send(model);

    };

};