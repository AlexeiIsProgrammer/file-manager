import os from 'os'

export default function username() {
    console.log(os.userInfo().username);
}