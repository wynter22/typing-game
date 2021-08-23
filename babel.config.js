module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        'targets': {
          'browsers': ['ie >= 11', '> 0.25%, not dead'],
        },
        'useBuiltIns': 'usage',
        'corejs': {version: 3, proposals: true},
      }
    ],
  ],
};
