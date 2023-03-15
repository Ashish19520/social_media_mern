import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import posts from './routes/posts.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/posts',posts);

 

const PORT = process.env.PORT || 5000;
const CONNECTIONSRTING = process.env.CONNECTION_URL
// `mongodb+srv://ashishSocial:Shivam@cluster0.yzsw1ma.mongodb.net/memories`


mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTIONSRTING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))})
  .catch((err) => {console.log(err);});
