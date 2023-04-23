const path = require('node:path');
const fs = require('node:fs');

const { specJson } = require('@ncd/openapi-master');

const OUTDIR_RELATIVE = ['src', '.oas'];
const OUTDIR = path.resolve(__dirname, ...OUTDIR_RELATIVE);
const OUTFILE_TYPES = path.resolve(__dirname, ...OUTDIR_RELATIVE, 'types.ts');

;(async () => {
  const { default: oas2types } = await import('openapi-typescript');

  fs.rmSync(OUTDIR, { recursive: true, force: true });
  fs.mkdirSync(OUTDIR);

  try {
    console.log('🤞 attempting to generate types from:\n    →', specJson.file);
    const output = await oas2types(specJson.file);
    fs.writeFileSync(OUTFILE_TYPES, output);
    console.log(`💪 types succesfully generated at:\n    →`, OUTFILE_TYPES)
  }
  catch (err) {
    console.error(err)
    process.exit(1)
  }
})();
