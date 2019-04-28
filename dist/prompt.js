"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
exports.config_questions = () => {
    const questions = [
        {
            name: "hostname",
            type: "input",
            message: "What is the hostname of your Database Server?"
        },
        {
            name: "database",
            type: "input",
            message: "Which database you want to acess to?"
        },
        {
            name: "username",
            type: "input",
            message: "What is the database username?"
        },
        {
            name: "password",
            type: "input",
            message: "What is the database password?"
        }
    ];
    return inquirer.prompt(questions);
};
//# sourceMappingURL=prompt.js.map