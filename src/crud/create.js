import { promises as fs } from 'fs';
import __relative from '../modules/__relative.js';
import { currentPath } from '../index.js';

export default async function create(filename) {
    const filepath = __relative(currentPath.path, filename);

    try {
        await fs.writeFile(filepath, '')
    } catch {
        console.log('Smth went wrong!');
    }
}
