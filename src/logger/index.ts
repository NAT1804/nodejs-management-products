import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  transport: {
    target: "pino-pretty",
    options: {
      ignore: "req.headers, res",
    },
  },
  base: {
    pid: false,
  },
  timestamp: () =>
    `,"time":"${dayjs().locale("vi").format("YYYY-MM-DD HH:mm:ss")}"`,
});

export default log;
