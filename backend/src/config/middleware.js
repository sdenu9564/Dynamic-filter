import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import compression from 'compression';
import constants from './constants.js';
import cookieParser from 'cookie-parser';
import winstonInstance from './winston.js';
import expressWinston from 'express-winston';
import methodOverride from 'method-override';
import session from 'express-session';

const allowedDomains = [constants.ALLOWED_DOMAIN];

export default app => {
  app.use(compression());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
  app.use(helmet());
  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedDomains.indexOf(origin) === -1) {
          const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      }
    })
  );
  app.use(session({
    secret: 'Caeselona',
    resave: false,
    saveUninitialized: true,
  }));
  app.use(cookieParser());
  app.use(methodOverride());
  if (constants.isDev) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
      expressWinston.logger({
        winstonInstance,
        meta: true,
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true
      })
    );
  }
};
