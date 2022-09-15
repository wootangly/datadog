const tracer = require('dd-trace').init({
	logger: {
		debug: message => logger.trace(message),
		error: err => logger.error(err)
	},
	// debug tracer for confirmation via tracer logs
	debug:true,
	logsInjection: true,
	env: 'cw-nodejs-app',
	tags: {'is_runtimeEnabled':'true'},
	runtimeMetrics: true,
	profiling: true
});
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const winston = require('winston');
const logger = winston.createLogger({
 level: 'info',
 format: winston.format.json(),
 transports: [
  //
  // - Write all logs with importance level of `error` or less to `error.log`
  // - Write all logs with importance level of `info` or less to `combined.log`
  //
  new winston.transports.File({ filename: 'error.log', level: 'error' }),
  new winston.transports.File({ filename: 'combined.log',level: 'info' }),
 ],
});

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// call sysc()
const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to woo-tang-ful NodeJS application." });
});

// tutorial routes
require("./app/routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = {logger}