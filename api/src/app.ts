import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import userRoute from './routes/users.route';
import errorHandler from "./middlewares/errors";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(morgan('dev'));
app.use('/api/users', userRoute);
app.use(errorHandler);

export default app;