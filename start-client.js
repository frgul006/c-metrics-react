const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'cli', shell: true };
require('child_process').spawn('npm', args, opts);
