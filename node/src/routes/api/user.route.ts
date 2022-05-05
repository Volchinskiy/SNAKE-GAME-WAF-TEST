import { Router, Request, Response, NextFunction } from "express";
// import { questionValidation } from "../../middlewares/validation";

const userRouter: Router = Router();
userRouter.get("/", );
userRouter.get("/repeat", );
userRouter.post("/", );
userRouter.put("/:id", );
userRouter.delete("/:id", );
userRouter.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

export default userRouter;