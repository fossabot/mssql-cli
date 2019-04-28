"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = "../config.json";
exports.get_config = () => {
    if (fs.existsSync(path)) {
        return JSON.parse(fs.readFileSync(path, "utf8"));
    }
};
exports.check_config = () => {
    return fs.existsSync(path);
};
exports.create_config = (config) => {
    fs.writeFileSync(path, JSON.stringify(config), "utf8");
};
exports.delete_config = () => {
    if (fs.existsSync(path)) {
        fs.unlink(path, () => { });
    }
};
//# sourceMappingURL=config.js.map