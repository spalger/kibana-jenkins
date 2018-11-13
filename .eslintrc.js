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
    },
    require('eslint-config-prettier').rules,
    require('eslint-config-prettier/react').rules
  ),
}

