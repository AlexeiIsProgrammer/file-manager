
import { resolve } from 'path';
import { currentPath } from '../index.js';
import __relative from '../modules/__relative.js';
import fs from 'fs';

export default async function copy(filename, directoryName) {
    const filepath = __relative(`${process.cwd()}${currentPath.path}`, filename);
    const directoryPath = __relative(`${process.cwd()}${currentPath.path}`, `${directoryName}/${filename}`);

    console.log(filepath);
    console.log(directoryPath);

    try {
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