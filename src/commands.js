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
    if (userInput.startsWith('cd')) {
        await cd(userInput.split(' ')[1]);
    } else if (userInput === 'up') {
        up();
    } else if (userInput === 'ls') {
        await ls();
    } else if (userInput.startsWith('cat')) {
        await read(userInput.split(' ')[1]);
    } else if (userInput.startsWith('rn')) {
        await rename(userInput.split(' ')[1], userInput.split(' ')[2]);
    } else if (userInput.startsWith('add')) {
        await create(userInput.split(' ')[1]);
    } else if (userInput.startsWith('rm')) {
        await remove(userInput.split(' ')[1]);
    } else if (userInput.startsWith('cp')) {
        await copy(userInput.split(' ')[1], userInput.split(' ')[2]);
    } else if (userInput.startsWith('mv')) {
        await move(userInput.split(' ')[1], userInput.split(' ')[2]);
    } else if (userInput.startsWith('os')) {
        osCommands(userInput.split(' ')[1]);
    } else if (userInput.startsWith('hash')) {
        await hash(userInput.split(' ')[1]);
    } else {
        console.log('Invalid input');
    }
}