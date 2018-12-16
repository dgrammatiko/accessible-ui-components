/**
 * Method to get the root path
 *
 * @returns {string} The root path
 */
const rootPath = () => __dirname.replace('/src/build', '').replace('\\src\\build', '');

module.exports._ = rootPath;
