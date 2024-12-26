require("dotenv").config({ path: './utils/.env' });
const express = require("express");
const cors = require("cors");
const axios = require('axios');
const app = express();
const authrouter = require('./router/auth-router');
const carrouter = require('./router/car-router');
const cityrouter = require('./router/city-router');
const insurancerouter = require('./router/insurance-router');
const masterrouter = require('./router/master-router');
const leadrouter = require('./router/lead-router');
const ileadrouter = require('./router/ilead-router');
const checkApiStatus = require('./utils/checkApiStatus');
const errorMiddleware = require("./middlewares/error-middleware");
const connectDb = require("./utils/db");
app.use(cors());
app.use(express.json());
app.use(checkApiStatus);
app.use("/api/auth",authrouter);
app.use("/api/car",carrouter);
app.use("/api/city",cityrouter);
app.use("/api",insurancerouter);
app.use("/api/master",masterrouter);
app.use('/api/lead', leadrouter);
app.use('/api/ilead', ileadrouter);

app.use(errorMiddleware);
const PORT = 5000;

connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`'server is running  at port : ' ${PORT}`);
    });
});
