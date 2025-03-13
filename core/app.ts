import express from 'express';
import bodyParser from 'body-parser'; 
import cors from "cors";
import router from '../routes/userRoutes.js';
import dotenv from "dotenv";

const app = express();
const port = 2323;
dotenv.config();

const corsOption = { 
  origin: [`http://localhost:3000`, `http://localhost:3001`], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Authorization", "Content-Type"] 
}

app.use(express.json());
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export default app;