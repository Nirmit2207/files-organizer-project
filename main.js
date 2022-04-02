#!/usr/bin/env node
const input = process.argv.slice(2)
let cmd = input[0]

const treeFn = require("./commands/tree")
const helpFn = require("./commands/help")
const organizeFn = require("./commands/organize")

switch(cmd) {
    case "tree":
        treeFn(input[1])
        break;
    case "organize":
        organizeFn(input[1])
        break;
    case "help":
        helpFn()
        break;
    default:
        console.log("This command is not available")
        break;
}