import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan'
import connectDB from "./config/db.js";
import cors from 'cors'
import authRouter from './routes/authRouter.js'
import categoryRoute from './routes/categoryRoutes.js'
import productRouter from './routes/productRouter.js'
//configure env this is inside our root so need to add path
dotenv.config();

//database config
connectDB();

//rest object
const app = express();


 //middleware
 app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/product',productRouter)
//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to jewellery app</h1>");
});
const PORT = process.env.PORT || 8080;

//run
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
