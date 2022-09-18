import mongoose from "mongoose";
import dotenv from "dotenv";
import log from "../logger";

dotenv.config();

function connect() {
  const dbUri = process.env.MONGODB_URL as string;

  return mongoose
    .connect(dbUri)
    .then(() => {
      log.info("Database connected");
    })
    .catch((error) => {
      log.error("db error", error);
      process.exit(1);
    });
}
export default connect;
