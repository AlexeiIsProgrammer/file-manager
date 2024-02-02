import cd from "./navigation/cd.js";
import ls from "./navigation/ls.js";
import up from "./navigation/up.js";

export default async function checkInput(userInput) {
    if (userInput.startsWith('cd')) {
        await cd(userInput.split(' ')[1]);
    } else if (userInput === 'up') {
        up()
    } else if (userInput === 'ls') {
        ls()
    } else {
        console.log('Invalid input');
    }
}