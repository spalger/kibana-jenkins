process.argv.splice(2, 0, '--cache', '.');
require('eslint/bin/eslint');
