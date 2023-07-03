const child = require('child_process')

child.spawn('npx', ['@dcloudio/uvm@latest'], {
  detached: true,
  shell: true
})