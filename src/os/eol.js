import os from 'os'

export default function eol() {
    console.log('Your EOL is: ', JSON.stringify(os.EOL));
}