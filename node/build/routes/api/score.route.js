"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var score_controller_1 = __importDefault(require("../../controllers/score.controller"));
var scoreRouter = (0, express_1.Router)();
scoreRouter.get("/", score_controller_1.default.getTop10Scores.bind(score_controller_1.default));
scoreRouter.post("/", score_controller_1.default.addNewScore.bind(score_controller_1.default));
scoreRouter.use(function (err, _, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render("error", { error: err });
});
exports.default = scoreRouter;
//# sourceMappingURL=score.route.js.map