module.exports = {
    preset: 'ts-jest',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
        '^.+\\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        "\\.(css|less)$": "identity-obj-proxy"
      },
    moduleFileExtensions: [
        "js",
        "jsx",
        "json",
        "node",
        "css"
      ]
};