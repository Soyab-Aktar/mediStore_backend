import express from "express";
import cors from 'cors';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { authMiddleware } from "./middleware/authMiddleware";
import { UserRole } from "./constants/UserRoles";
import { userRouter } from "./modules/users/user.route";
import { authRouter } from "./modules/auth/auth.route";



const app = express();
app.use(cors({
  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true
}))


app.use(express.json());

app.use('/api/admin/users', userRouter);
app.use('/api/auth', authRouter);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.get('/', (req, res) => {
  res.send("Hello, Welcome To Medi Store")
})


export default app;