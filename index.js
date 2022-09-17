require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const { join: path } = require('path');

const app = express();

const basicRoute = require('./routes/basic');
const filesRoute = require('./routes/files');

app.disable('x-powered-by');

app.use(fileUpload({
    createParentPath: true
}));

app.use('/', express.static(path(__dirname, "uploads")));

app.use('/', filesRoute);
app.use('/', basicRoute);


app.listen(1440, () => {
    console.log(`[ ${new Date().toLocaleString()} ] Server Started...`);
    console.log(`[ ${new Date().toLocaleString()} ] Listening on port 1440.`);
});