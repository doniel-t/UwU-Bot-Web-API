import express from "express";
import { Request } from "node-fetch";

const app = express();
const port = 6969;

app.get("/", (request: express.Request, response: express.Response) => {
  console.log("get /");
  response.status(200);
  response.send("gamer");
});

app.listen(port, () => {
  console.log("started listening");
});
