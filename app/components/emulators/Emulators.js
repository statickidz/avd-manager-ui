// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as child from 'child_process';
import { promisify } from 'util';
import * as shell from '../../shell/windows'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import styles from './Emulators.css';

const exec = (command) => {
  return promisify(child.exec)(command)
    .then(result => {
      return result.stdout.trim()
    })
    .catch(err => console.error(err))
}

type Props = {}

export default class Emulators extends Component<Props> {
  props: Props
  
  state = {
    sdkPath: null,
    emulatorPath: null,
    emulators: [],
    dialogVisible: false,
  }

  async checkSDK() {
    const sdkPath = await exec(shell.SDK_PATH_CMD)
    await this.setState({
      sdkPath,
      emulatorPath: sdkPath + shell.EMULATOR_PATH
    })
  }

  async getEmulators() {
    const { emulatorPath } = this.state
    const emulators = await exec(emulatorPath + shell.EMULATORS_CMD)
    const emulatorsArray = []
    await emulators.split('\n').forEach(emulator => {
      const emulatorId = emulator.replace(new RegExp(' ', 'g'), '_')
      emulatorsArray.push({
        id: emulatorId,
        name: emulator.replace(new RegExp('_', 'g'), ' '),
        cmd: emulator,
        running: false,
        logs: '',
        error: '',
        process: null,
      })
    })
    await this.setState({ emulators: emulatorsArray })
  }

  async componentWillMount() {
    await this.checkSDK()
    await this.getEmulators()
    console.log(this.state)
  }

  async log(emulator, message) {
    await this.setState({
      emulators: this.state.emulators.map(em => (em.id === emulator.id ? {
        ...em,
        logs: em.logs + message,
      } : em))
    })
  }

  async updateEmulator(emulator, prop, value) {
    await this.setState({
      emulators: this.state.emulators.map(em => (em.id === emulator.id ? {
        ...em,
        [prop]: value,
      } : em))
    })
  }

  handleRunEmulator = async (emulator) => {
    const { emulatorPath } = this.state
    const runEmulatorCMD = `${emulatorPath}${shell.RUN_EMULATOR_CMD}${emulator.cmd}`
    let instance = child.spawn(runEmulatorCMD, ['-logcat *:*', '-show-kernel'], { shell: true, detached: true })
    await this.updateEmulator(emulator, 'process', instance)
    await this.updateEmulator(emulator, 'running', true)
    console.log(this.state.emulators)
    instance.stdout.on('data', async data => {
      await this.log(emulator, data.toString())
      console.log('stdout data', data.toString(), emulator.id)
    })
    instance.stderr.on('data', async data => {
      await this.log(emulator, data.toString())
      console.log('stderr data', data.toString(), emulator.id)
    })
    instance.on('close', async code => {
      await this.updateEmulator(emulator, 'running', false)
      console.log('close', code, emulator.id)
    })
    instance.on('exit', async code => {
      await this.updateEmulator(emulator, 'running', false)
      console.log('exit', code, emulator.id)
    })
    instance.on('disconnect', async () => {
      await this.updateEmulator(emulator, 'running', false)
      console.log('disconnect', emulator.id)
    })
    instance.on('error', async err => {
      await this.updateEmulator(emulator, 'running', false)
      await this.updateEmulator(emulator, 'error', err)
      console.log('error', err, emulator.id)
    })
  }

  handleStopEmulator = async (emulator) => {
    console.log(emulator)
    await emulator.process.kill('SIGHUP')
  }

  handleToggleAlert = () => {
    this.setState({ dialogVisible: !this.state.dialogVisible })
  }

  render() {
    const { dialogVisible, emulators } = this.state

    return (
      <div className={styles.root}>
        <Paper className={styles.emulators}>
          {emulators.length > 0 ?
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell>AVD Devices</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emulators.map(emulator => (
                  <TableRow key={emulator.id} className={styles.row}>
                    <TableCell component="th" scope="row">
                      <Typography component="p" className={styles.text}>
                        {emulator.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {emulator.running ?
                        <Fab
                          size="small"
                          color="secondary"
                          className={styles.fab}
                          onClick={() => this.handleStopEmulator(emulator)}
                        >
                          <i className="fa fa-stop" />
                        </Fab>
                      :
                        <Fab
                          size="small"
                          color="primary"
                          className={styles.fab}
                          onClick={() => this.handleRunEmulator(emulator)}
                        >
                          <i className="fa fa-play" />
                        </Fab>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          :
            <Typography component="p" align="center" className={styles.text}>
              No emulators found.
            </Typography>
          }
        </Paper>

        <Dialog open={dialogVisible} onClose={this.handleToggleAlert}>
          <DialogTitle>Alert</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggleAlert} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
