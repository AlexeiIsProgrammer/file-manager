import readline from 'readline';
import os from 'os';
import checkInput from './commands.js';

const initialPath = os.homedir();
export const currentPath = { path: '' };

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function start() {
    const username = process.argv.slice(2)
    if (username[0]) {
        const [name, value] = username[0].split('=')
        if (name === '--username') {
            console.log(`Welcome to the File Manager, ${value}!`);
        } else {
            console.log('Bad username :(');
        }

        function promptUser() {
            rl.question(`You are currently in ${initialPath}${currentPath.path.split('/').join('\\')} \n`, (userInput) => {
                if (userInput.toLowerCase() === '.exit') {
                    console.log(`Thank you for using File Manager, ${name === '--username' ? value : 'Bad user'}, goodbye!`);
                    rl.close();
                } else {
                    checkInput(userInput)
                    promptUser();
                }
            });
        }

        promptUser();
    }
}

start()