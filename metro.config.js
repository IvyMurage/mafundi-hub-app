const { getDefaultConfig } = require('@expo/metro-config');

const path = require('path');
const projectRoot = __dirname; // This ensures you're getting the directory of the current file

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(projectRoot); // Pass the projectRoot as an argument
  // Customize the config or return it directly
  return defaultConfig;
})();
