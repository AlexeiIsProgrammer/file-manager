import { currentPath } from '../index.js';
import __relative from '../modules/__relative.js';
import fs, { promises as fsPromises } from 'fs';
import zlib from 'zlib'

export default async function compress(filename, archivename) {
    const filepath = __relative(`${currentPath.path}`, filename);
    const archivepath = __relative(`${currentPath.path}`, archivename);

    try {
        const stats = await fsPromises.stat(filepath)

        if (stats.isFile()) {
            const readStream = fs.createReadStream(filepath);
            const writeStream = fs.createWriteStream(archivepath);

            const brotliStream = zlib.createBrotliCompress();

            readStream.pipe(brotliStream).pipe(writeStream);

            await Promise.all([
                new Promise((resolve) => readStream.on('close', resolve)),
                new Promise((resolve) => writeStream.on('close', resolve)),
            ]);
        }

    } catch {
        console.log('Pathname is incorrect!');
    }
}