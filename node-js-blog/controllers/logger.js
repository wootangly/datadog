const { createLogger, format, transports } = require('winston');

module.exports = (
    {
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
      }
)