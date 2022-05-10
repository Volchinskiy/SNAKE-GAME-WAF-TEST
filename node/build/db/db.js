"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("pg"));
var pool = new pg_1.default.Pool({
    host: "ec2-176-34-211-0.eu-west-1.compute.amazonaws.com",
    database: "di2e9p35ftokq",
    user: "xffuzqwfeveywu",
    port: 5432,
    password: "05a3a384e1dd48bffaca500a667329a01baf28b732be4d7aa8dfe8bcba9dd847",
});
exports.default = pool;
//# sourceMappingURL=db.js.map