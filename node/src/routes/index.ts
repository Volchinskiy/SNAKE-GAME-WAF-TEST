import { Application, Request, Response } from "express";
import personRouter from "./api/person.route";
import scoreRouter from "./api/score.route";

class ServerRouter {
  constructor(private server: Application) {}
  init() {
    this.server.get("/", (_req: Request, res: Response) => {
      res.send("<h1 style='width: 100%; height: 100%; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center;'>Api Running...<h1/>")
    });
    this.server.use("/api/person", personRouter);
    this.server.use("/api/score", scoreRouter);
  }
}

export default ServerRouter;
