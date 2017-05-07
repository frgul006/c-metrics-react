const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'srv', shell: true };
require('child_process').spawn('npm', args, opts);
