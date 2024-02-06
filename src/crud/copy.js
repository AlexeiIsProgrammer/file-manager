import { currentPath } from '../index.js';
import __relative from '../modules/__relative.js';
import fs, { promises as fsPromises } from 'fs';

export default async function copy(filename, directoryName) {
    const filepath = __relative(`${currentPath.path}`, filename);
    const directoryCheckPath = __relative(`${currentPath.path}`, directoryName);
    const directoryPath = __relative(`${currentPath.path}`, `${directoryName}/${filename}`);
    try {
        await fsPromises.stat(filepath)
        await fsPromises.stat(directoryCheckPath)

        const readStream = fs.createReadStream(filepath);
        const writeStream = fs.createWriteStream(directoryPath);

        await new Promise((resolve, reject) => {
            readStream.pipe(writeStream);

            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
    } catch {
        console.log('Pathname is incorrect!');
    }
};