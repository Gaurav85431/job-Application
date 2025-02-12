import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";


const app = express();
config({ path: "./config/config.env" });


// const dotenv = require('dotenv');
import dotenv from 'dotenv';
// app.use({ dotenv });

// const dotenv = require('dotenv');
dotenv.config();

// Your Express app setup and other code goes here...


// app.use(cors());

const corsOptions = {
  origin: "http://localhost:5173",
  // origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
}
app.use(cors(corsOptions));


// app.use(
//   cors({
//     // origin: [process.env.FRONTEND_URL],
//     origin: "*",
//     methods: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
dbConnection();

app.use(errorMiddleware);
export default app;
