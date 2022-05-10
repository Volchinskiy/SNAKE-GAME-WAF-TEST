"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var person_route_1 = __importDefault(require("./api/person.route"));
var score_route_1 = __importDefault(require("./api/score.route"));
var ServerRouter = /** @class */ (function () {
    function ServerRouter(server) {
        this.server = server;
    }
    ServerRouter.prototype.init = function () {
        this.server.get("/", function (_req, res) {
            res.send("<h1 style='width: 100%; height: 100%; display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; -webkit-box-align: center; -ms-flex-align: center; align-items: center;'>Api Running...<h1/>");
        });
        this.server.use("/api/person", person_route_1.default);
        this.server.use("/api/score", score_route_1.default);
    };
    return ServerRouter;
}());
exports.default = ServerRouter;
//# sourceMappingURL=index.js.map