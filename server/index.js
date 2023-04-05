const express = require('express');
const cors = require('cors');
const mongoose = require('./configuration/connection');
const userrouter = require('./routers/router')
const cookieParser = require('cookie-parser')
const router = express.Router();
const logger = require('morgan')
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();


app.use('/public', express.static(path.join(__dirname, 'public')));



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
        console.log(file.fieldname + '_' + Date.now() + path.extname(file.originalname))
    }
})

const filefilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500).json(response.error(err.status || 500));
});

// app.use(multer({ dest: './uploads/' }).single('singleInputFileName'));
app.use(multer({ storage, filefilter }).single('image'))
// app.use(multer({ s t ora }))

app.use(cors({
    origin: ['http://localhost:3000'],
    method: ['GET', 'POST'],
    credentials: true
})
);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));

app.use(cookieParser())

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json());
app.use("/", userrouter)

app.listen(3001, () => {
    console.log('Server started at 3001');
});