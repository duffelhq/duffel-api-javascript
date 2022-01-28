export default {
  clearMocks: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js)$': 'babel-jest',
  },
  transformIgnorePatterns: [],
}
