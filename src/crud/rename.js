
import { currentPath } from '../index.js';
import __relative from '../modules/__relative.js';
import { promises as fs } from 'fs';

export default async function rename(filename, newFilename) {
    const filepath = __relative(currentPath.path, filename);
    const newFilepath = __relative(currentPath.path, newFilename);

    try {
        const stats = await fs.stat(filepath)

        if (stats.isFile()) {
            await fs.rename(filepath, newFilepath)
        } else {
            console.log('That\'s not a file!');
        }
    } catch {
        console.log('Pathname is incorrect!');
    }
};