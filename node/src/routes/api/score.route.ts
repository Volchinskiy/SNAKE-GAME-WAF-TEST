import { Router, Request, Response, NextFunction } from "express";
import scoreController from "../../controllers/score.controller";

const scoreRouter: Router = Router();
scoreRouter.get("/", scoreController.getTop10Scores.bind(scoreController));
scoreRouter.post("/", scoreController.addNewScore.bind(scoreController));
scoreRouter.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

export default scoreRouter;