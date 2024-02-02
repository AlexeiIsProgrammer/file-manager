import path from 'path';

const __relative = (relativePath, pathname) => path.join(relativePath, pathname || '');

export default __relative;