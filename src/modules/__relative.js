import path from 'path';

const __relative = (...args) => path.resolve(...args);

export default __relative;