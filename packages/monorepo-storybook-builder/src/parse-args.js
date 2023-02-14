"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var argv = yargs_1.default
    .wrap(yargs_1.default.terminalWidth())
    .option('packages', {
    alias: 'p',
    desc: 'Directory for package.jsons (monorepo support)',
    type: 'string',
})
    .option('out', {
    alias: 'o',
    desc: 'Configure the output directory',
    type: 'string',
})
    .parseSync();
exports.default = (function () {
    return {
        PACKAGES_DIRECTORY: argv.packages,
        OUTPUT_DIR: argv.out,
    };
});
