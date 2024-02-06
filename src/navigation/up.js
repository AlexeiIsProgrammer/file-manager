import { currentPath, initialPath } from "../index.js";

export default function up() {
    if (currentPath.path === initialPath) {
        console.log('You already in the most upper directory you can be');
    } else {
        currentPath.path = currentPath.path.substring(0, currentPath.path.lastIndexOf('/'))
    }
}