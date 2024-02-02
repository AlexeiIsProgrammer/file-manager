import { currentPath } from "../index.js";
import { promises as fs } from 'fs';
import __relative from "../modules/__relative.js";

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
    const pathArr = pathname.split('/')
    let startPath = ''
    const initialPath = currentPath.path

    for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[0] === '' || (pathArr[0] !== '.' && pathArr[0] !== '..')) {
            if (i === 0 && pathArr[0] === '') continue
            const finalPath = __relative(process.cwd(), `${startPath ? `${startPath}\\` : ''}${pathArr[i]}`)

            const folderPath = await getFolder(finalPath)
            if (folderPath) {
                startPath += `/${pathArr[i]}`
            }
        } else {
            if (pathArr[i] === '..') {
                if (currentPath.path !== '') {
                    currentPath.path = currentPath.path.substring(0, currentPath.path.lastIndexOf('/'))
                } else {
                    console.log('You\'re trying to reach out of your initial directory!');
                    currentPath.path = initialPath
                    break
                }
            } else if (pathArr[i] !== '.' && pathArr[i] !== '') {
                const finalPath = __relative(process.cwd(), `${currentPath.path}/${pathArr[i]}`)
                const folderPath = await getFolder(finalPath)
                if (folderPath) {
                    currentPath.path += `/${pathArr[i]}`
                }
            }
        }
    }

    if (startPath) {
        currentPath.path = startPath
    }
}