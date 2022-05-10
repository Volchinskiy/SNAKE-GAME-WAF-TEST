"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var person_controller_1 = __importDefault(require("../../controllers/person.controller"));
var personRouter = (0, express_1.Router)();
personRouter.post("/register", person_controller_1.default.createPerson.bind(person_controller_1.default));
personRouter.post("/login", person_controller_1.default.loginPerson.bind(person_controller_1.default));
personRouter.use(function (err, _, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500);
    res.render("error", { error: err });
});
exports.default = personRouter;
//# sourceMappingURL=person.route.js.map