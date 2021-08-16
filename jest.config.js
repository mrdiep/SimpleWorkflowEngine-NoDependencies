module.exports = {
    setupFiles: [],
    testEnvironment: 'node',
    moduleFileExtensions: [
      'ts',
      'tsx',
      'js'
    ],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    testMatch: [
      '**/?(*.)(spec|test).(ts|tsx|js)?(x)'
    ],
    collectCoverageFrom: ['src/**/*.{js,ts}'],
    moduleDirectories: [
      'node_modules',
      'src',
    ],
  };