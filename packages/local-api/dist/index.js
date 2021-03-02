"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var express_1 = __importDefault(require("express"));
var http_proxy_middleware_1 = require("http-proxy-middleware");
var path_1 = __importDefault(require("path"));
var cells_1 = require("./routes/cells");
var serve = function (port, filename, dir, useProxy) {
    var app = express_1.default();
    var clientPath = require.resolve('local-client/build/index.html');
    if (useProxy) {
        app.use(http_proxy_middleware_1.createProxyMiddleware({
            target: 'http://localhost:3000',
            ws: true,
            logLevel: 'silent',
        }));
    }
    else {
        app.use(express_1.default.static(path_1.default.dirname(clientPath)));
    }
    app.use(cells_1.createCellsRouter(filename, dir));
    return new Promise(function (resolve, reject) {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;