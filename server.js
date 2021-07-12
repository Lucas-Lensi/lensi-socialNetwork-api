const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const jsonwebtoken = require("jsonwebtoken");
const bodyParser = require("body-parser");
const compression = require("compression");

const cors = require("cors");

require('dotenv').config();

const VAR_ENV = require("./api/config.js");

// Imporing routes Files
const userRoutes = require('./api/Routes/user.routes');
const postRoutes = require('./api/Routes/post.routes');
const errorRoutes = require('./api/Routes/error.routes');

var app = express();

//Set up default mongoose connection
const settings = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

//Get the default connection
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Bind connection to error event (to get notification of connection errors)
mongoose.connect(VAR_ENV.MONGODB_URI, settings, function (err, dbref) {
    if (!err) {
        console.log("Mongodb connected");
        db = dbref;
    } else {
        console.log("Error while connecting to mongoDB" + err);
    }
});

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;

// Server Config
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(morgan("combined"));
app.use(compression());

// Is user allowed to use the API
app.use(function (req, res, next) {
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "JWT"
    ) {
        jsonwebtoken.verify(
            req.headers.authorization.split(" ")[1],
            VAR_ENV.JWT_API_KEY,
            function (err, decode) {
                if (err) {
                    req.user = undefined;
                }
                req.user = decode;
                next();
            }
        );
    } else {
        req.user = undefined;
        next();
    }
});

let allowedOrigins = [
    'https://perspro.fr', '.perspro.fr$'
];

if (VAR_ENV.NODE_ENV === "development") {
    allowedOrigins.push("http://localhost:8080$", ".localhost:8080$", "");
}

const corsOptions = {
    origin: (origin, callback) => {
        let valid = false;
        for (let allowedOrigin of allowedOrigins) {
            if (new RegExp(allowedOrigin).test(origin)) {
                valid = true;
            }
        }
        if (valid) {
            callback(null, true);
        } else {
            console.log("Not allowed by CORS");
            callback(new Error("Not allowed by CORS"));
        }
    },
};

// Cors required
app.use('/users', cors(), userRoutes);
app.use('/posts', cors(), postRoutes);
app.use('/errors', cors(), errorRoutes);

app.get("*", function (req, res) {
    res.status(404).send({
        "bad-request 404": "The requested route is not implemented",
    });
});

// Create an HTTP service.
// if (VAR_ENV.NODE_ENV === 'development') {
//     console.log('server listening in port 3000')
//     app.listen(process.env.PORT || 3000);
// } else {
//     app.listen(process.env.PORT || 3000);
// }
console.log('Server listening in port ' + process.env.PORT)
app.listen(process.env.PORT);
