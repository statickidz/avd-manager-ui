import mac from './mac'
import windows from './windows'

let shell = mac
if (process.platform === 'win32') {
  shell = windows
}

export default shell