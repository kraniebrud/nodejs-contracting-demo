const fs = require('fs');
const path = require('path');

const { stub } = require('sinon');

const locations = require('../opts/locations');

const TEMPDIR = [__dirname, '.temp'];
const OASDIR = [__dirname, '.temp', '.oas'];

stub(locations, 'OAS_DIR').get(() => path.resolve(...OASDIR));
stub(locations, 'OAS_FILE_JSON').get(() => path.resolve(...OASDIR, './spec.json'));
stub(locations, 'OPTIONS_FILE_JS').get(() => path.resolve(...TEMPDIR, '.options.js'));

before(() => {
  fs.mkdirSync(path.resolve(...TEMPDIR));
});

after(async () => {
  fs.rmSync(path.resolve(...TEMPDIR), { recursive: true, force: true });
});
