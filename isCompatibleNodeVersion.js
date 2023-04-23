const { engines } = require('./package.json');

const enginesMajor = Number(engines.node.substring(0, 2));
const currMajor = Number(process.versions.node.substring(0, 2));
const isCompatible = currMajor >= enginesMajor;

if (!isCompatible) {
  console.log(`Detected node version ${currMajor}`);
  console.log(`This version is incompatible with this project, you must use ${enginesMajor} or later`);
  console.log('');
  process.exit(1);
}
