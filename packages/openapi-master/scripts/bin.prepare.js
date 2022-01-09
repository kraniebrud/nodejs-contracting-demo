const prepare = require('./runners/prepare');

;(async () => {
  try {
    await prepare();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
