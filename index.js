import express from 'express';
import cors from "cors"
import dotenv from "dotenv"
import handleError from './middlewares/errorHandler.js';
import logHandler from './middlewares/logHandler.js';
import authRoute from './routes/auth.route.js'
import userRoute from './routes/user.route.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 9500


//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(logHandler);

//routes
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
//ErrorHandler
app.use(handleError);
//Server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);

})