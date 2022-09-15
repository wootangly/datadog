const tracer = require('dd-trace').init({

    //enabled: true,
    logsInjection: true,
    profiling_enable: true,
	env: 'cw-macos',
    service: 'web-blog',
	tags: {'is_runtimeEnabled':'true'},
	runtimeMetrics: true,
    debug: true
    
});

//Datadog RUM - web-blog

//import { datadogRum } from '@datadog/browser-rum';
const { datadogRum } = require('@datadog/browser-rum'); 

datadogRum.init({
    applicationId: '2edf00f7-5cf4-494b-a76d-f0419dd75c30',
    clientToken: 'pubd7ac46ff3ad6504b85eeb3110ed7a998',
    site: 'datadoghq.com',
    service:'web-blog',
    
    // Specify a version number to identify the deployed version of your application in Datadog 
    // version: '1.0.0',
    sampleRate: 100,
    premiumSampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel:'allow'
});
    
datadogRum.startSessionReplayRecording();


//const path = require('path');
const { resolve } = require('path');
const expressEdge = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = new express();
const { createLogger, format, transports } = require('winston');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const storePost = require('./middleware/storePost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./database/models/User')

//const winston = require('winston');

// var myFormat = winston.format.combine(
//     winston.format.timestamp({
//         format: 'YYYY-MM-DD HH:mm:ss.SSS'
//     }),
//     winston.format.json()
// );

const logger = createLogger({
    format: format.combine(
        //format.timestamp({format:'MM-YY-DD'}),
        format.timestamp(),
        //format.myFormat,
        format.ms(),
        format.json()  
    ),
    level: 'info',
    exitOnError: false,
    transports: [
      new transports.File({ filename: `./logs/app.log` }),
    ],
  });

module.exports = logger;

// Example logs
//logger.log('info', 'Hello simple log!');
logger.info('Node app restarted!',{color: 'blue'});

mongoose.connect('mongodb://localhost/node-js-blog');

app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge.engine);
app.set('views', `${__dirname}/views`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/posts/store', storePost)  //use if you want to create error messages

app.get("/", homePageController);
app.get('/post/:id', getPostController);
app.get('/posts/new', createPostController);
app.post('/posts/store', storePostController);
app.get('/auth/register', createUserController);
app.post('/users/register', storeUserController); //came from the app.edge  href="/auth/register">Register line

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
});
app.get('/pagenotfound', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    logger.error('new `/post` page has errors', {color: 'red', creator: 'wootang' });
    res.render('pagenotfound')
});
app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
});

app.listen(4000, () => {
    console.log('App listening on port 4000')
    logger.log('info', 'accessed home page')
});

// some comment
