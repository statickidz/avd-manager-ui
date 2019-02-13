// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';

const testEmu = `HAX is working and emulator runs in fast virt mode.
[ 1484.039256] binder: 1498:1543 transaction failed 29189/-22, size 52-0 line 3001
Warning: restoring GLES1 context from snapshot. App may need reloading.
[ 1486.390993] init: processing action (qemu.adbd=start) from (/init.ranchu.rc:85)
[ 1486.986070] init: Service 'zygote' (pid 8410) killed by signal 1
[ 1486.999285] init: Sending signal 9 to service 'zygote' (pid 8410) process group...
[ 1487.012127] init: Successfully killed process cgroup uid 0 pid 8410 in 0ms
[ 1487.024751] init: Unable to open '/sys/android_power/request_state': No such file or directory
[ 1487.053372] init: Unable to write to '/sys/power/state': Invalid argument
[ 1487.065546] init: Sending signal 9 to service 'audioserver' (pid 8411) process group...
[ 1487.091314] init: Successfully killed process cgroup uid 1041 pid 8411 in 7ms
[ 1487.096556] init: Sending signal 9 to service 'cameraserver' (pid 8414) process group...
[ 1487.121572] init: Successfully killed process cgroup uid 1047 pid 8414 in 9ms
[ 1487.133846] init: Sending signal 9 to service 'media' (pid 8392) process group...
[ 1487.172126] init: Successfully killed process cgroup uid 1013 pid 8392 in 14ms
[ 1487.178126] init: Sending signal 9 to service 'netd' (pid 8393) process group...
[ 1487.200970] init: Successfully killed process cgroup uid 0 pid 8393 in 9ms
[ 1487.221864] init: Sending signal 9 to service 'wificond' (pid 8408) process group...
[ 1487.237844] init: Successfully killed process cgroup uid 1010 pid 8408 in 8ms
[ 1487.255097] init: Service 'media' (pid 8392) killed by signal 9
[ 1487.269053] init: Service 'netd' (pid 8393) killed by signal 9
[ 1487.278021] init: Service 'wificond' (pid 8408) killed by signal 9
[ 1487.291559] init: Service 'audioserver' (pid 8411) killed by signal 9
[ 1487.305144] init: Sending signal 9 to service 'audio-hal-2-0' (pid 8409) process group...
[ 1487.340222] init: Successfully killed process cgroup uid 1041 pid 8409 in 10ms
[ 1487.344593] init: Service 'audio-hal-2-0' (pid 8409) killed by signal 9
[ 1487.356627] init: Service 'cameraserver' (pid 8414) killed by signal 9
[ 1487.368937] init: Untracked pid 8394 killed by signal 9
[ 1487.388048] init: Untracked pid 8395 killed by signal 9
[ 1487.396096] init: starting service 'zygote'...
[ 1487.407192] init: property_set("ro.boottime.zygote", "1487407352800") failed: property already set
[ 1487.407192] init: Created socket '/dev/socket/zygote', mode 660, user 0, group 1000
[ 1487.451214] init: starting service 'audioserver'...
[ 1487.460217] init: property_set("ro.boottime.audioserver", "1487458237800") failed: property already set
[ 1487.482159] init: starting service 'cameraserver'...
[ 1487.485397] init: property_set("ro.boottime.cameraserver", "1487486378100") failed: property already set
[ 1487.500342] init: starting service 'media'...
[ 1487.502292] init: property_set("ro.boottime.media", "1487510640900") failed: property already set
[ 1487.531201] init: starting service 'netd'...
[ 1487.535553] init: property_set("ro.boottime.netd", "1487536571600") failed: property already set
[ 1487.551197] init: couldn't write 8443 to /dev/cpuset/camera-daemon/tasks: No such file or directory
[ 1487.601127] init: starting service 'wificond'...
[ 1487.610185] init: property_set("ro.boottime.wificond", "1487602144200") failed: property already set
[ 1487.616070] init: starting service 'audio-hal-2-0'...
[ 1487.624367] init: Created socket '/dev/socket/netd', mode 660, user 0, group 1000
[ 1487.636958] init: property_set("ro.boottime.audio-hal-2-0", "1487637643600") failed: property already set
[ 1487.670331] init: Created socket '/dev/socket/dnsproxyd', mode 660, user 0, group 3003
[ 1487.752150] init: Created socket '/dev/socket/mdns', mode 660, user 0, group 1000
[ 1487.821143] init: Created socket '/dev/socket/fwmarkd', mode 660, user 0, group 3003
[ 1488.881350] init: Service 'zygote' (pid 8441) killed by signal 1
[ 1488.887239] init: Sending signal 9 to service 'zygote' (pid 8441) process group...
[ 1488.901441] init: Successfully killed process cgroup uid 0 pid 8441 in 0ms
[ 1488.914765] init: Unable to open '/sys/android_power/request_state': No such file or directory
[ 1488.935600] init: Unable to write to '/sys/power/state': Invalid argument
[ 1488.954382] init: Sending signal 9 to service 'audioserver' (pid 8442) process group...
[ 1488.981536] init: Successfully killed process cgroup uid 1041 pid 8442 in 12ms
[ 1488.995576] init: Sending signal 9 to service 'cameraserver' (pid 8443) process group...
[ 1489.031449] init: Successfully killed process cgroup uid 1047 pid 8443 in 11ms
[ 1489.034920] init: Sending signal 9 to service 'media' (pid 8444) process group...
[ 1489.055459] init: Successfully killed process cgroup uid 1013 pid 8444 in 6ms
[ 1489.077608] init: Sending signal 9 to service 'netd' (pid 8445) process group...
[ 1489.088966] init: Successfully killed process cgroup uid 0 pid 8445 in 7ms
[ 1489.100274] init: Sending signal 9 to service 'wificond' (pid 8446) process group...
[ 1489.121566] init: Successfully killed process cgroup uid 1010 pid 8446 in 7ms
[ 1489.137510] init: Service 'audioserver' (pid 8442) killed by signal 9
[ 1489.160721] init: Sending signal 9 to service 'audio-hal-2-0' (pid 8447) process group...
[ 1489.181675] init: Successfully killed process cgroup uid 1041 pid 8447 in 7ms
[ 1489.186390] init: Service 'cameraserver' (pid 8443) killed by signal 9
[ 1489.201595] init: Service 'media' (pid 8444) killed by signal 9
[ 1489.213583] init: Service 'netd' (pid 8445) killed by signal 9
[ 1489.225811] init: Service 'wificond' (pid 8446) killed by signal 9
[ 1489.236288] init: Service 'audio-hal-2-0' (pid 8447) killed by signal 9
[ 1489.248612] init: Untracked pid 8448 killed by signal 9
[ 1489.259049] init: Untracked pid 8449 killed by signal 9
[ 1492.406059] init: starting service 'zygote'...
[ 1492.416646] init: property_set("ro.boottime.zygote", "1492416957300") failed: property already set
[ 1492.416646] init: Created socket '/dev/socket/zygote', mode 660, user 0, group 1000
[ 1492.452160] init: starting service 'audioserver'...
[ 1492.479190] init: property_set("ro.boottime.audioserver", "1492471775400") failed: property already set
[ 1492.495203] init: starting service 'cameraserver'...
[ 1492.502354] init: property_set("ro.boottime.cameraserver", "1492504180800") failed: property already set
[ 1492.530341] init: starting service 'media'...
[ 1492.531418] init: property_set("ro.boottime.media", "1492538718800") failed: property already set
[ 1492.550157] init: starting service 'netd'...
[ 1492.552247] init: property_set("ro.boottime.netd", "1492560824700") failed: property already set
[ 1492.582079] init: Created socket '/dev/socket/netd', mode 660, user 0, group 1000
[ 1492.599676] init: couldn't write 8484 to /dev/cpuset/camera-daemon/tasks: No such file or directory
[ 1492.651188] init: starting service 'wificond'...
[ 1492.662082] init: property_set("ro.boottime.wificond", "1492664646100") failed: property already set
[ 1492.682039] init: starting service 'audio-hal-2-0'...
[ 1492.701228] init: property_set("ro.boottime.audio-hal-2-0", "1492702125900") failed: property already set
[ 1492.742142] init: Created socket '/dev/socket/dnsproxyd', mode 660, user 0, group 3003
[ 1492.745838] init: Created socket '/dev/socket/mdns', mode 660, user 0, group 1000
[ 1492.821780] init: Created socket '/dev/socket/fwmarkd', mode 660, user 0, group 3003
[ 1493.881209] init: Service 'zygote' (pid 8482) killed by signal 1
[ 1493.884904] init: Sending signal 9 to service 'zygote' (pid 8482) process group...
[ 1493.901323] init: Successfully killed process cgroup uid 0 pid 8482 in 0ms
[ 1493.911213] init: Unable to open '/sys/android_power/request_state': No such file or directory
[ 1493.926194] init: Unable to write to '/sys/power/state': Invalid argument
[ 1493.939438] init: Sending signal 9 to service 'audioserver' (pid 8483) process group...
[ 1493.961409] init: Successfully killed process cgroup uid 1041 pid 8483 in 8ms
[ 1493.981362] init: Sending signal 9 to service 'cameraserver' (pid 8484) process group...
[ 1494.007071] init: Successfully killed process cgroup uid 1047 pid 8484 in 15ms
[ 1494.020539] init: Sending signal 9 to service 'media' (pid 8485) process group...
[ 1494.051232] init: Successfully killed process cgroup uid 1013 pid 8485 in 13ms
[ 1494.061299] init: Sending signal 9 to service 'netd' (pid 8486) process group...
[ 1494.079878] init: Successfully killed process cgroup uid 0 pid 8486 in 6ms
[ 1494.090354] init: Sending signal 9 to service 'wificond' (pid 8487) process group...
[ 1494.121474] init: Successfully killed process cgroup uid 1010 pid 8487 in 10ms
[ 1494.123958] init: Service 'audioserver' (pid 8483) killed by signal 9
[ 1494.133341] init: Sending signal 9 to service 'audio-hal-2-0' (pid 8488) process group...
[ 1494.160586] init: Successfully killed process cgroup uid 1041 pid 8488 in 9ms
[ 1494.167069] init: Service 'cameraserver' (pid 8484) killed by signal 9
[ 1494.176977] init: Service 'media' (pid 8485) killed by signal 9
[ 1494.186000] init: Service 'netd' (pid 8486) killed by signal 9
[ 1494.195972] init: Service 'wificond' (pid 8487) killed by signal 9
[ 1494.206219] init: Service 'audio-hal-2-0' (pid 8488) killed by signal 9
[ 1494.216859] init: Untracked pid 8489 killed by signal 9
[ 1494.225838] init: Untracked pid 8490 killed by signal 9
emulator: Saving state on exit with session uptime 13612 m

`

class EmulatorLogs extends React.Component {
  props = {
    emulators: PropTypes.array.isRequired,
  }

  state = {
    active: 0,
  }

  handleChange = (event, active) => {
    this.setState({ active })
  }

  render() {
    const { classes, emulators } = this.props
    const { active } = this.state

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={active}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
          >
            {emulators.map((emulator, index) => {
              if (emulator.running) {
                return ( <Tab key={`tab-${emulator.id}`} label={emulator.name} /> )
              }
            })}
            <Tab label="Test" />
          </Tabs>
        </AppBar>
        {emulators.map((emulator, index) => {
          if (active === index && emulator.running) {
            return (
              <Typography
                key={`tab-container-${emulator.id}`}
                component="div"
                style={{ padding: 8 * 3 }}
                className={classes.tabContainer}
              >
                <InputBase
                  className={classes.log}
                  multiline={true}
                  value={emulator.logs}
                />
              </Typography>
            )
          }
        })}
        <Typography
          component="div"
          className={classes.tabContainer}
        >
          <textarea className={classes.logs} defaultValue={testEmu} />
        </Typography>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logs: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  tabContainer: {
    flex: 1,
    padding: 24,
    backgroundColor: '#1d1d1d',
    fontFamily: 'Consolas, monaco, monospace',
    color: '#cbcbcb',
  }
})

export default withStyles(styles)(EmulatorLogs)