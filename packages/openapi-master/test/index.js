const fs = require ('fs');

const { expect, assert } = require ('chai');
const sinon = require('sinon');
const nock = require('nock')

const { OPTIONS_FILE_JS, OAS_FILE_JSON } = require('../opts/locations');
const defaultOptions = require('../opts/defaults/options');

const defaultURL = new URL(defaultOptions.URL);
const SERVER = `${defaultURL.protocol}//${defaultURL.hostname}`; // server of the hosted openapi specifications

const prepare = require('../scripts/runners/prepare');
const openapiMaster = require('../lib/main');

afterEach(() => {
  sinon.restore();
});

describe('prepare', () => {
  describe('never called', () => {
    it('is not having file ".options.js"', () => {
      expect(() => require(OPTIONS_FILE_JS)).to.throw();
    })
    it('is not having file "spec.json"', () => {
      expect(() => require(OAS_FILE_JSON)).to.throw();
    })
  });

  describe('first time called', () => {
    const pathToSpec = defaultURL.pathname;

    it('runs', async () => {
      nock(SERVER).get(pathToSpec).reply(200, {
        "openapi": "3.0.0",
        "info": {
          "title": "default",
        }
      });

      const getSpec = sinon.spy(require('https'), 'get');
      await prepare();

      expect(getSpec.callCount).to.equal(1);
    });

    it('has created file ".options.js"', () => {
      expect(() => require(OPTIONS_FILE_JS)).not.to.throw();
    });

    it('has created file "spec.json"', () => {
      expect(() => require(OAS_FILE_JSON)).not.to.throw();
    });

    describe('openapi-master', () => {
      it('calling "specJson.file", gets the created "spec.json"-file', () => {
        const getSpec = sinon.spy(require('https'), 'get');
        const { specJson } = openapiMaster;

        expect(() => require(specJson.file)).not.to.throw();
        expect(getSpec.callCount).to.equal(0);
        expect(require(specJson.file))
          .to.have.all.keys(['openapi', 'info'])
          .and.to.deep.include({
            info: {
              title: "default"
            }
          });
      });
    });
  });

  describe('called having ".options.js" (URL) modified', async () => {
    it('runs', async () => {
      require(OPTIONS_FILE_JS).URL = `${SERVER}/other/spec.json`;

      nock(SERVER).get('/other/spec.json').reply(200, {
        "openapi": "3.0.0",
        "info": {
          "title": "modified",
        }
      });

      const getSpec = sinon.spy(require('https'), 'get');
      await prepare();

      expect(getSpec.callCount).to.equal(1);
    });

    describe('openapi-master', () => {
      it('calling "specJson.file", gets the modified "spec.json"-file', () => {
        const getSpec = sinon.spy(require('https'), 'get');
        const { file } = openapiMaster.specJson;

        expect(getSpec.callCount).to.equal(0);
        expect(() => require(file)).not.to.throw();

        const specJsonStr = fs.readFileSync(file).toString();
        const specJson = JSON.parse(specJsonStr);

        expect(specJson)
          .to.have.all.keys(['openapi', 'info'])
          .and.to.deep.include({
            info: {
              title: "modified"
            }
          });
      });
    });
  });
});
