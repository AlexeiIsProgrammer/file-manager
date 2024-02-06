import { currentPath } from '../index.js';
import __relative from '../modules/__relative.js';
import fs, { promises as fsPromises } from 'fs';

export default async function move(filename, directoryName) {
    const filepath = __relative(currentPath.path, filename);
    const directoryPath = __relative(currentPath.path, directoryName, filename);

    try {

        const readStream = fs.createReadStream(filepath);
        const writeStream = fs.createWriteStream(directoryPath);

        await new Promise((resolve, reject) => {
            readStream.pipe(writeStream);

            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });

        await fsPromises.unlink(filepath);
    } catch {
        console.log('Pathname is incorrect!');
    }
}
