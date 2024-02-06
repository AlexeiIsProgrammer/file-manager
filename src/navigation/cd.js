import { currentPath, initialPath } from "../index.js";
import { promises as fs } from 'fs';
import __relative from "../modules/__relative.js";
import path from "path";

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
    const pathArr = pathname.split(path.sep)

    if (pathname === path.sep) {
        currentPath.path = initialPath
        return
    }

    let startPath = ''
    for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[0] === '' || (pathArr[0] !== '.' && pathArr[0] !== '..')) {
            if (i === 0 && pathArr[0] === '') continue
            const finalPath = __relative(initialPath, startPath, pathArr[i])
            const folderPath = await getFolder(finalPath)

            if (folderPath) {
                startPath = __relative(initialPath, startPath, pathArr[i])
            }
        } else {
            if (pathArr[i] === '..') {
                if (currentPath.path !== initialPath) {
                    currentPath.path = currentPath.path.substring(0, currentPath.path.lastIndexOf(path.sep))
                } else {
                    console.log('You\'re trying to reach out of your initial directory!');
                    break
                }
            } else if (pathArr[i] !== '.' && pathArr[i] !== '') {
                const finalPath = __relative(initialPath, currentPath.path, pathArr[i])
                const folderPath = await getFolder(finalPath)
                if (folderPath) {
                    currentPath.path = __relative(currentPath.path, pathArr[i])
                }
            }
        }
    }

    if (startPath) {
        currentPath.path = startPath
    }
}