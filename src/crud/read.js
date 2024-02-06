
import { currentPath } from '../index.js';
import __relative from '../modules/__relative.js';
import fs, { promises as fsPromises } from 'fs';

export default async function read(filename) {
    const filepath = __relative(currentPath.path, filename);

    try {
        const stats = await fsPromises.stat(filepath)

        if (stats.isFile()) {
            await new Promise((resolve) => {
                const stream = fs.createReadStream(filepath);

                let content = '';

                stream.on('data', (data) => {
                    content += data
                })

                stream.on('close', () => {
                    console.log(content);
                    resolve()
                })
            })
        } else {
            console.log('That\'s not a file!');
        }
    } catch {
        console.log('Pathname is incorrect!');
    }
};