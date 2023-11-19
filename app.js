const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

require('dotenv').config();
const cors = require('cors');
const app = express();

const routes = require('./src/routes/v1');
const config = require('./src/config/config');
const port = config.port;
app.use(express.json());
app.use(cors());
app.options('*', cors());
const router = express.Router();
const Queue = require('bull');
const Log = require('./src/models/logs.model');
const logQueue = new Queue('add-log', {
    redis: {
        host: '127.0.0.1',
        port: 6379,
    }
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001"
  }
});

io.on("connection", (socket) => {
  console.log('connected socket.io',socket.id)
});




logQueue.process(async function(job, done) {
    try {
        const {
            level,
            message,
            resourceId,
            timestamp,
            traceId,
            spanId,
            commit,
            metadata
        } = job.data;
        io.emit("event",  {
        
            level,
            message,
            resourceId,
            timestamp,
            traceId,
            spanId,
            commit,
            metadata
      
         
        });
        await Log.AddLog({
            level,
            message,
            resourceid: resourceId,
            timestamp,
            traceid: traceId,
            spanid: spanId,
            commit,
            metadata
        })
        job.progress(42);

        done(console.log('done'));


        // or pass it a result
        done(null, {
            samplerate: 48000 /* etc... */
        });

    } catch (error) {
        throw new Error(error);
    }
});

httpServer.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use(router);
app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!'
    });
});