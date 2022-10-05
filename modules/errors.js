module.exports = (err, url) => {
    switch (err) {
        case "nofile":
            var model = {
                code: "Bad Request",
                message: "No file to be uploaded was found.",
                status: 400,
                url,
                date: new Date()
            };
            return model;
            break;
        case "notfound":
            var model = {
                code: "Not Found",
                message: "File with such a name does not exist.",
                status: 404,
                url,
                date: new Date()
            };
            return model;
            break;
        case "zerochar":
            var model = {
                code: "Bad Request",
                message: "File name must contain at least one character.",
                status: 400,
                url,
                date: new Date()
            };
            return model;
            break;
        case "filenotmoved":
            var model = {
                code: "Internal Server Error",
                message: "File was not moved to the uploads folder for some reason.",
                status: 500,
                url,
                date: new Date()
            };
            return model;
            break;
        case "filenotdeleted":
            var model = {
                code: "Internal Server Error",
                message: "File was not removed from the uploads folder for some reason.",
                status: 500,
                url,
                date: new Date()
            };
            return model;
            break;
        case "unauthorizedDeleteKey":
            var model = {
                code: "Unauthorized",
                message: "No deleteKey query was found, no file was removed.",
                status: 401,
                url,
                date: new Date()
            };
            return model;
            break;
        case "unauthorized":
            var model = {
                code: "Unauthorized",
                message: "Specified authorization key is invalid, nothing was changed.",
                status: 401,
                url,
                date: new Date()
            };
            return model;
            break;
        case "servererror":
            var model = {
                code: "Internal Server Error",
                message: "There was an error processing your request.",
                status: 500,
                url,
                date: new Date()
            };
            return model;
            break;
        default:
            break;
    }
};