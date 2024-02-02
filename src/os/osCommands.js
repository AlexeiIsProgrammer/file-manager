import architecture from "./architecture.js";
import cpus from "./cpus.js";
import eol from "./eol.js";
import homedir from "./homedir.js";
import username from "./username.js";

export default function osCommands(osArg) {
    switch (osArg) {
        case '--EOL':
            eol();
            break;
        case '--cpus':
            cpus();
            break;
        case '--homedir':
            homedir();
            break;
        case '--username':
            username();
            break;
        case '--architecture':
            architecture();
            break;
        default:
            console.log('Invalid OS argument');
            break;
    }
}