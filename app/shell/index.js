import mac from './mac'
import windows from './windows'
import linux from './linux'

let shell = mac
if (process.platform === 'win32') {
  shell = windows
} else if (process.platform === 'linux') {
  shell = linux
}

export default shell
