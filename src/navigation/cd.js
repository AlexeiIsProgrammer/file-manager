import { currentPath, initialPath } from "../index.js";
import { promises as fs } from 'fs';
import __relative from "../modules/__relative.js";
import path from "path";
import { stat } from "fs/promises";

const getFolder = async (pathname) => {
    try {
        const stats = await fs.stat(pathname)
        if (stats.isDirectory()) {
            return pathname;
        } else {
            console.log('This isn\'t a directory!');
            return
        }
    } catch {
        console.log('Path is invalid!');
        return
    }
}

export default async function cd(pathname) {

    const newPath = path.resolve(currentPath.path, pathname);

    if (!(await stat(newPath)).isDirectory()) {
        console.log('Wrong directory');
        return
    }

    if (currentPath.path !== initialPath) {
        currentPath.path = newPath
    } else {
        console.log('You\'re trying to reach out of your initial directory!');
    }

}