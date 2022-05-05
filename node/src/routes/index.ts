import { Application } from "express";
import userRouter from "./api/user.route";

class ServerRouter {
  constructor(private server: Application) {}
  init() {
    this.server.get("/", (req, res) => {
      res.send("<h1 style='width: 100%; height: 100%; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center;'>Api Running...<h1/>")
    });
    this.server.use("/api/question", userRouter);
  }
}

export default ServerRouter;
