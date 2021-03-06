const Babel = require('@babel/core');
const Fs = require('fs');

/**
 *
 * @param {string} fileContents  the content of the file to be transpiled
 * @param {object} settings      the settings for the transpiler
 * @param {string} output        the full pat + filename + extension of the trnspiled file
 */
module.exports.run = (fileContents, settings, output) => {
  Babel.transform(fileContents, settings, (error, result) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(`${error}`);
      process.exit(1);
    }

    Fs.writeFile(
      output,
      result.code,
      (fsError) => {
        if (fsError) {
          // eslint-disable-next-line no-console
          console.error(`${fsError}`);
          process.exit(1);
        }
      },
    );
  });
};
