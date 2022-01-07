const path = require('path');
const fs = require('fs');

const { specJson } = require('@ncd/openapi-master');
const { generateApi } = require('swagger-typescript-api');

const OUTDIR = path.resolve(__dirname, 'src', '.oas');

;(async () => {
  fs.rmSync(OUTDIR, { recursive: true, force: true })
  fs.mkdirSync(OUTDIR);
  try {
    await generateApi({
      name: 'api.ts',
      input: specJson.file,
      output: OUTDIR,
      httpClientType: 'fetch', // or axios
      generateClient: true,
      generateResponses: true,
      generateRouteTypes: true,
    })
  }
  catch (err) {
    console.error(err)
    process.exit(1)
  }
})();
