"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var build_monorepo_index_1 = __importDefault(require("./build-monorepo-index"));
var glob_1 = __importDefault(require("glob"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var utils_1 = require("./utils");
var shelljs_1 = __importDefault(require("shelljs"));
function buildStorybook(currentPackage, outputDirectory, npmScriptName) {
    console.log("=> Building storybook for: ".concat(currentPackage.name));
    // clear and re-create the out directory
    shelljs_1.default.rm('-rf', outputDirectory);
    shelljs_1.default.mkdir(outputDirectory);
    if (currentPackage.scripts[npmScriptName]) {
        (0, utils_1.exec)("npm run ".concat(npmScriptName, " -- -o ").concat(outputDirectory));
    }
    else {
        (0, utils_1.exec)("build-storybook  -o ".concat(outputDirectory));
    }
}
function buildSubPackage(originalDirectory, subDirectory, outputDirectory, npmScriptName) {
    shelljs_1.default.cd(subDirectory);
    if (!fs_1.default.existsSync('package.json')) {
        return;
    }
    var subPackageJsonBinary = fs_1.default.readFileSync(path_1.default.resolve('package.json'), 'utf8');
    var subPackageJson = JSON.parse(subPackageJsonBinary);
    if (!fs_1.default.existsSync('.storybook')) {
        return;
    }
    buildStorybook(subPackageJson, outputDirectory, npmScriptName);
    var builtStorybook = path_1.default.join(subDirectory, outputDirectory, '*');
    var outputPath = path_1.default.join(originalDirectory, outputDirectory, subPackageJson.name);
    shelljs_1.default.mkdir('-p', outputPath);
    shelljs_1.default.cp('-r', builtStorybook, outputPath);
    shelljs_1.default.rm('-rf', builtStorybook);
    return subPackageJson;
}
function build(outputDirectory, packagesDirectory, npmScriptName) {
    var originalDirectory = process.cwd();
    var packages = glob_1.default
        .sync(path_1.default.join(originalDirectory, packagesDirectory, '**/package.json'), {
        ignore: '**/node_modules/**',
    })
        // eslint-disable-next-line @typescript-eslint/unbound-method
        .map(path_1.default.dirname)
        .map(function (subPackage) { return buildSubPackage(originalDirectory, subPackage, outputDirectory, npmScriptName); })
        .filter(function (subPackage) { return !!subPackage; });
    shelljs_1.default.cd(originalDirectory);
    (0, build_monorepo_index_1.default)(packages, outputDirectory);
    console.log('Done!');
}
exports.default = build;
