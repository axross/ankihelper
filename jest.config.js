module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest/preprocessor.js',
  },
  testRegex: 'test\\.(tsx?)$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/out/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
};
