import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import testRoutes from "./routes/test.js";
dotenv.config();

const { LMS_PORT = 5555, LMS_MONGOOSE } = process.env;

const app = express();

app.use("/", testRoutes);

app.use(
  bodyParser.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "30mb",
    extended: true,
  })
);

app.use(cors());

mongoose
  .connect(LMS_MONGOOSE)
  .then(() =>
    app.listen(LMS_PORT, () =>
      console.log(
        `==========================${LMS_PORT}==========================`
      )
    )
  )
  .catch((err) => console.log(err.message));
