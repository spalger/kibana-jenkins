process.argv.splice(2, 0, '--noEmit');
require('typescript/bin/tsc');
