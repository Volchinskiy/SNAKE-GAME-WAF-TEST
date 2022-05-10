"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var server = (0, express_1.default)();
// Express configuration
server.set("port", process.env.PORT || 5000);
server.use(body_parser_1.default.json());
server.use(body_parser_1.default.urlencoded({ extended: false }));
server.use((0, cors_1.default)());
// Connection to DB
// Router
var router = new routes_1.default(server);
router.init();
var PORT = server.get("port");
server.listen(PORT, function () { return console.log("Server Working on http://localhost:".concat(PORT)); });
//# sourceMappingURL=server.js.map