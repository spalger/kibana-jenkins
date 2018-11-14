process.argv.splice(2, 0, '--project', require.resolve('../tsconfig.json'));
require('tslint/bin/tslint');
