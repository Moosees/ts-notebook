"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serveCommand = void 0;
var commander_1 = require("commander");
exports.serveCommand = new commander_1.Command()
    .command('serve [filename]')
    .description('Open a local notebook')
    .option('-p, --port <number>', 'port to run server on', '4242')
    .action(function (filename, _a) {
    if (filename === void 0) { filename = 'notebook.js'; }
    var port = _a.port;
    return console.log(filename, port);
});
