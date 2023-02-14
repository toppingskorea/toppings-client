"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var shelljs_1 = __importDefault(require("shelljs"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var colors = ['purple', 'pink', 'orange', 'green', 'blue', 'red'];
var generateRow = function (packageJson, index) { return "\n  <a href=\"".concat(path_1.default.join(packageJson.name, 'index.html'), "\" class=\"package-row\">\n    <span class=\"title is-").concat(colors[index % colors.length], "\">\n      ").concat(packageJson.name, "\n    </span>\n    <span class=\"description\">").concat(packageJson.description, "</span>\n  </a>\n"); };
var generateHTML = function (packages) { return "\n  <!DOCTYPE html>\n  <html>\n  <head>\n    <meta charset=\"utf-8\" />\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <title>Storybooks</title>\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n    <link rel=\"stylesheet\" type=\"text/css\" href=\"monorepo-index.css\">\n  </head>\n  <body>\n    <img class=\"banner\" src=\"storybook.svg\" alt=\"Storybook\"/>\n    <div class=\"content\">\n      ".concat(packages.map(generateRow).join(''), "\n    </div>\n  </body>\n  </html>\n"); };
function buildMonorepoIndex(packages, outputDir) {
    console.log('=> Building index.html for monorepo');
    var indexHtml = generateHTML(packages);
    shelljs_1.default.cp(path_1.default.join(__dirname, 'assets', 'storybook.svg'), path_1.default.join(outputDir, 'storybook.svg'));
    shelljs_1.default.cp(path_1.default.join(__dirname, 'assets', 'index.css'), path_1.default.join(outputDir, 'monorepo-index.css'));
    fs_1.default.writeFileSync(path_1.default.join(outputDir, 'index.html'), indexHtml);
}
exports.default = buildMonorepoIndex;
