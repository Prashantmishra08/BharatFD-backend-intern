module.exports = {
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    transformIgnorePatterns: [
      "/node_modules/(?!axios).+\\.js$"  // Include axios in the transformations
    ],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node'],
  };
  