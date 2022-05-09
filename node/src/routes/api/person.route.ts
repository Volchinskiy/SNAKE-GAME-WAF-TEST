import { Router, Request, Response, NextFunction } from "express";
import personController from "../../controllers/person.controller";

const personRouter: Router = Router();
personRouter.post("/register", personController.createPerson.bind(personController));
personRouter.post("/login", personController.loginPerson.bind(personController));
personRouter.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

export default personRouter;