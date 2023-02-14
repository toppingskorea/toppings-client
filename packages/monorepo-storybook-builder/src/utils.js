"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
var shelljs_1 = require("shelljs");
function exec(command) {
    console.log("   executing: ".concat(command));
    var options = { silent: true };
    var ref = (0, shelljs_1.exec)(command, options);
    if (ref.code === 0) {
        return ref.stdout.trim();
    }
    throw new Error("Exec code(".concat(ref.code, ") on executing: ").concat(command, "\n").concat(ref.stderr));
}
exports.exec = exec;
