import __relative from '../modules/__relative.js';
import { promises as fs } from 'fs'
import path from 'path'
import { currentPath } from '../index.js';

async function printFiles(source) {
    try {
        const files = await fs.readdir(source);
        const data = []
        for (const file of files) {
            const stats = await fs.stat(path.join(source, file));
            const item = { Name: file }
            if (stats.isDirectory()) {
                data.push({ ...item, Type: 'directory' })
            } else if (stats.isFile()) {
                data.push({ ...item, Type: 'file' })
            }
        }

        data.sort((a, b) => a.Name.localeCompare(b.Name) && a.Type.localeCompare(b.Type))

        console.table(data)
    } catch (error) {
        console.log('You have an error: ', error.message);
    }
}

export default async function ls() {
    const filesPath = __relative(currentPath.path);
    printFiles(filesPath)
};
