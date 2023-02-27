import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import posts from './routes/posts.js';

const app = express();

app.use('/posts',posts);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;
const CONNECTIONSRTING = `mongodb+srv://ashishProject:Shivam_8755@cluster0.yzsw1ma.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTIONSRTING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))})
  .catch((err) => {console.log(err);});
