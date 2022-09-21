import express from "express";
import dotenv from "dotenv";
import connect from "./db/connect";
import log from "./logger";

import routes from "./routes";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Express TypeScript Server hello");
});

app.use("/api/v1", routes);

const port = process.env.PORT || 3000;

app.listen(Number(port), () => {
  log.info(`Server is running at port:${port}`);
  connect();
});
