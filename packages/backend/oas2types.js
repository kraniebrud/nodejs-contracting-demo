const path = require('path');
const fs = require('fs');

const { specJson } = require('@ncd/openapi-master');
const oas2types = require("openapi-typescript").default;

const OUTDIR_RELATIVE = ['src', '.oas'];
const OUTDIR = path.resolve(__dirname, ...OUTDIR_RELATIVE);
const OUTFILE_TYPES = path.resolve(__dirname, ...OUTDIR_RELATIVE, 'types.ts');

;(async () => {
  try {
    console.log('🤞 attempting to generate types from:\n    →', specJson.file);
    const output = await oas2types(specJson.file);
    fs.rmSync(OUTDIR, { recursive: true, force: true });
    fs.mkdirSync(OUTDIR);
    fs.writeFileSync(OUTFILE_TYPES, output);
    console.log(`💪 types succesfully generated at:\n    →`, OUTFILE_TYPES)
  }
  catch (err) {
    fs.rmSync(OUTDIR, { recursive: true, force: true });
    console.error(err)
    process.exit(1)
  }
})();
