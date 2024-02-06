import { currentPath } from '../index.js';
import __relative from '../modules/__relative.js';
import fs, { promises as fsPromises } from 'fs';
import crypto from 'crypto'

export default async function hash(filename) {
    const filepath = __relative(`${currentPath.path}`, filename);
    const hash = crypto.createHash('sha256');

    try {
        const stats = await fsPromises.stat(filepath)

        if (stats.isFile()) {
            await new Promise((resolve) => {
                const stream = fs.createReadStream(filepath);

                stream.on('data', (data) => {
                    hash.update(data);
                })

                stream.on('close', () => {
                    console.log('Hash is', hash.digest("hex"));
                    resolve()
                })
            })
        } else {
            console.log('That\'s not a file!');
        }
    } catch {
        console.log('Pathname is incorrect!');
    }
}