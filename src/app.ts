import express from "express";
import cors from 'cors';


const app = express();
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true
}))

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello, Welcome To Medi Store")
})

export default app;