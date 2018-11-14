module.exports = {
  extends: "@elastic/kibana",
  
  settings: {
    'import/resolver':{
    '@elastic/eslint-import-resolver-kibana':{
      rootPackageName: 'jenkins'}}
  },

  plugins: ['prettier'],
  
  rules: Object.assign(
    {
      'prettier/prettier': ['error'],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: false,
          peerDependencies: false,
        },
      ],
    },
    require('eslint-config-prettier').rules,
    require('eslint-config-prettier/react').rules
  ),

  overrides: [
    /**
     * Files that ARE NOT allowed to use devDependencies
     */
    {
      files: [
        'public/**/*',
        'server/**/*'
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: false,
            peerDependencies: true,
          },
        ],
      },
    },

    /**
     * Files that ARE allowed to use devDependencies
     */
    {
      files: [
        '**/*.test.js',
        'scripts/*',
      ],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            peerDependencies: true,
          },
        ],
      },
    },
  ]
}

