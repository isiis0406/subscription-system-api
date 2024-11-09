import express from 'express';
import cors from "cors"
import dotenv from "dotenv"
import handleError from './middlewares/errorHandler.js';
import logHandler from './middlewares/logHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9500


//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(logHandler);

//routes

//ErrorHandler
app.use(handleError);
//Server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

})