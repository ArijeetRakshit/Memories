import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from './routes/posts.js';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json({
    limit:"30mb",
    extended:true
}));
app.use(express.urlencoded({
    limit:"30mb",
    extended:true
}));
app.use(cors())

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>app.listen(PORT,()=>console.log(`Server running on port ${PORT}`)))
.catch((err)=>console.log(err.message))

mongoose.set('useFindAndModify',false);

app.use('/posts',postRouter);