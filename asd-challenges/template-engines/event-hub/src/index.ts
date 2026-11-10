import express from "express";
import nunjucks from "nunjucks";
import { events } from "./data/events";

const app = express();
const port = 3011;

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  noCache: true,
});

app.use(express.json());

app.get("/", (_req, res) => {
  res.render("index.html");
});

app.get("/events", (_req, res) => {
  res.render("events.html", { events });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
