#!/usr/bin/env node

const package_json = require("../package.json");
require("console.table");

const chalk = require("chalk");
const sql = require("mssql");
import * as fs from "fs";
import * as figlet from "figlet";
import { argv } from "yargs";
import {
  check_config,
  create_config,
  delete_config,
  get_config
} from "./config";
import { config_questions } from "./prompt";

(async () => {
  console.log(
    chalk.green(
      figlet.textSync(`MSSQL Query CLI V:${package_json.version}`, {
        font: "Doom",
        horizontalLayout: "fitted",
        verticalLayout: "fitted"
      })
    ) + "\n"
  );

  if (argv.reset) {
    delete_config();
    console.log(chalk.yellow("Reset sucessful"));
    process.exit(0);
  }

  if (!argv.f) {
    console.log(
      chalk.yellow(
        "No file specified. You can specify your SQL file with the option `--f=FILENAME`"
      )
    );
    process.exit(0);
  }

  if (!check_config()) {
    const prompt_data: any = await config_questions();
    await create_config({
      hostname: prompt_data.hostname,
      database: prompt_data.database,
      username: prompt_data.username,
      password: prompt_data.password
    });
  }

  const config = await get_config();
  console.log(argv.f);

  await sql.connect(
    `mssql://${config.username}:${config.password}@${config.hostname}/${
      config.database
    }`
  );

  const file_name: string = String(argv.f);
  if (!fs.existsSync(file_name)) {
    console.log(
      chalk.yellow("The file which you have specified does not exist.")
    );
    process.exit(0);
  }
  const sql_string = fs.readFileSync(file_name, "utf8");

  let result;
  try {
    result = await sql.query(sql_string);
    console.table(result.recordset);
  } catch (err) {
    console.log(err);
  }

  if (argv.save) {
    fs.writeFileSync("result.json", JSON.stringify(result.recordsets), "utf8");
  }

  process.exit(0);
})();
