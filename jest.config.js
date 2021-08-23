module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
