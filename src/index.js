import readline from 'readline';
import os from 'os';
import checkInput from './commands.js';

export const initialPath = os.homedir();
export const currentPath = { path: initialPath };

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
            rl.question(`You are currently in ${currentPath.path.split('/').join('\\')} \n`, async (userInput) => {
                if (userInput.toLowerCase() === '.exit') {
                    console.log(`Thank you for using File Manager, ${name === '--username' ? value : 'Bad user'}, goodbye!`);
                    rl.close();
                } else {
                    await checkInput(userInput)
                    promptUser();
                }
            });
        }

        promptUser();
    }
}

start()