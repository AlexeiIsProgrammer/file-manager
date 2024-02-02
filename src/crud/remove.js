
import { currentPath } from '../index.js';
import __relative from '../modules/__relative.js';
import { promises as fs } from 'fs';

export default async function remove(filename) {
    const filepath = __relative(`${process.cwd()}${currentPath.path}`, filename);

    try {
        const stats = await fs.stat(filepath)

        if (stats.isFile()) {
            await fs.unlink(filepath)
        } else {
            console.log('That\'s not a file!');
        }
    } catch {
        console.log('Pathname is incorrect!');
    }
};