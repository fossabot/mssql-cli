import * as fs from "fs";

const path = "../config.json";

export const get_config = (): mssql_config => {
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, "utf8"));
  }
};

export const check_config = (): boolean => {
  return fs.existsSync(path);
};

export const create_config = (config: mssql_config): void => {
  fs.writeFileSync(path, JSON.stringify(config), "utf8");
};

export const delete_config = (): void => {
  if (fs.existsSync(path)) {
    fs.unlink(path, () => {});
  }
};

export interface mssql_config {
  hostname: string;
  database: string;
  username: string;
  password: string;
}
