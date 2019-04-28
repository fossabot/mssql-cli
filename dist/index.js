#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const package_json = require("../package.json");
require("console.table");
const chalk = require("chalk");
const sql = require("mssql");
const fs = require("fs");
const figlet = require("figlet");
const yargs_1 = require("yargs");
const config_1 = require("./config");
const prompt_1 = require("./prompt");
(() => __awaiter(this, void 0, void 0, function* () {
    console.log(chalk.green(figlet.textSync(`MSSQL Query CLI V:${package_json.version}`, {
        font: "Doom",
        horizontalLayout: "fitted",
        verticalLayout: "fitted"
    })) + "\n");
    if (yargs_1.argv.reset) {
        config_1.delete_config();
        console.log(chalk.yellow("Reset sucessful"));
        process.exit(0);
    }
    if (!yargs_1.argv.f) {
        console.log(chalk.yellow("No file specified. You can specify your SQL file with the option `--f=FILENAME`"));
        process.exit(0);
    }
    if (!config_1.check_config()) {
        const prompt_data = yield prompt_1.config_questions();
        yield config_1.create_config({
            hostname: prompt_data.hostname,
            database: prompt_data.database,
            username: prompt_data.username,
            password: prompt_data.password
        });
    }
    const config = yield config_1.get_config();
    console.log(yargs_1.argv.f);
    yield sql.connect(`mssql://${config.username}:${config.password}@${config.hostname}/${config.database}`);
    const file_name = String(yargs_1.argv.f);
    if (!fs.existsSync(file_name)) {
        console.log(chalk.yellow("The file which you have specified does not exist."));
        process.exit(0);
    }
    const sql_string = fs.readFileSync(file_name, "utf8");
    let result;
    try {
        result = yield sql.query(sql_string);
        console.table(result.recordset);
    }
    catch (err) {
        console.log(err);
    }
    if (yargs_1.argv.save) {
        fs.writeFileSync("result.json", JSON.stringify(result.recordsets), "utf8");
    }
    process.exit(0);
}))();
//# sourceMappingURL=index.js.map