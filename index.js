import express from "express";
import dotenv from "dotenv";
import connect from "./src/db/connect";
import log from "./src/logger";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server hello");
});

app.listen(port, () => {
  log.info(`Server is running at http://localhost:${port}`);
  connect();
});
