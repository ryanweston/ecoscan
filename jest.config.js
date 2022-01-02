module.exports = {
  preset: 'react-native',
  setupFiles: [
    './__mocks__/react-native-modules.ts',
    './__mocks__/setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
