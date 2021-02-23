"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var commands_1 = require("./commands/");
commander_1.program.addCommand(commands_1.serveCommand);
commander_1.program.parse(process.argv);
