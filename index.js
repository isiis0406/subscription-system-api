import express from 'express';
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 9500


//Middlewares
app.use(express.json());
app.use(cors());
//routes

//ErrorHandler

//Server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    
})