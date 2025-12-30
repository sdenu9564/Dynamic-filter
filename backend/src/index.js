import './config/database.js';
import express from 'express';
import {createServer} from 'http';
import constants from './config/constants.js';
import middlewaresConfig from './config/middleware.js';
import ApiRoutes from "./routes/index.js";

const app = express();
const httpServer = createServer(app);

middlewaresConfig(app);
app.use('/api', ApiRoutes);

httpServer.listen(constants.PORT, async err => {
    if(err) {
        console.log('Cannot run!');
    } else {
        console.log(`API server listening on port: ${constants.PORT}`);
    }
})


