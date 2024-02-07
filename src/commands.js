import compress from "./archive/compress.js";
import decompress from "./archive/decompress.js";
import copy from "./crud/copy.js";
import create from "./crud/create.js";
import move from "./crud/move.js";
import read from "./crud/read.js";
import remove from "./crud/remove.js";
import rename from "./crud/rename.js";
import hash from "./hash/index.js";
import cd from "./navigation/cd.js";
import ls from "./navigation/ls.js";
import up from "./navigation/up.js";
import osCommands from "./os/osCommands.js";

export default async function checkInput(userInput) {
    const regex = /^(\w+)(?:\s+((?:['"][^'"]+['"])|(?:\S+))?(?:\s+((?:['"][^'"]+['"])|(?:\S+))?)?)?$/;
    const matches = userInput.match(regex);

    if (!matches) {
        console.log('Invalid Input');
        return
    }

    const command = matches[1]
    const firstArg = matches[2] ? matches[2].replace(/['"]/g, '') : null; // First filename is optional
    const secondArg = matches[3] ? matches[3].replace(/['"]/g, '') : null; // Second filename is optional

    if (command === 'cd') {
        await cd(firstArg);
    } else if (command === 'up') {
        up();
    } else if (command === 'ls') {
        await ls();
    } else if (command === 'cat') {
        await read(firstArg);
    } else if (command === 'rn') {
        await rename(firstArg, secondArg);
    } else if (command === 'add') {
        await create(firstArg);
    } else if (command === 'rm') {
        await remove(firstArg);
    } else if (command === 'cp') {
        await copy(firstArg, secondArg);
    } else if (command === 'mv') {
        await move(firstArg, secondArg);
    } else if (command === 'compress') {
        await compress(firstArg, secondArg);
    } else if (command === 'decompress') {
        await decompress(firstArg, secondArg);
    } else if (command === 'os') {
        osCommands(firstArg);
    } else if (command === 'hash') {
        await hash(firstArg);
    } else {
        console.log('Invalid input');
    }
}