import express from "express";
import nunjucks from "nunjucks";
import { logger } from "./middlewares/loggerMiddleware";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3033;

app.use(logger);
app.use(cors());

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
});

app.get("/", (req, res) => {
  res.render("index.njk", {
    title: "Burn on Read",
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
