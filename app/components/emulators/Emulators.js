// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as child from 'child_process';
import { promisify } from 'util';
import shell from '../../shell'
import EmulatorLogs from '../emulator-logs/EmulatorLogs'
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
import AppBar from '@material-ui/core/AppBar';
import styles from './Emulators.css';

const exec = (command) => {
  return promisify(child.exec)(command)
    .then(result => {
      return result.stdout.trim()
    })
    .catch(err => console.error(err))
}

export default class Emulators extends Component {
  
  state = {
    sdkPath: null,
    emulatorPath: null,
    emulators: [],
    dialogVisible: false,
    dialogTitle: '',
    dialogMessage: '',
  }

  timerID = null

  async componentWillMount() {
    await this.checkSDK()
    await this.getEmulators()
    /*this.timerID = setInterval(
      () => this.getEmulators(),
      5000
    )*/
    console.log(this.state)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
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
    const emulatorsArray = this.state.emulators
    emulatorsArray.push({
      id: 'Pixel_2_API_25',
      name: 'Pixel 2 API 25',
      cmd: 'Pixel_2_API_25',
      running: false,
      logs: '',
      error: '',
      process: null,
    })
    await emulators.split('\n').forEach(emulator => {
      const emulatorId = emulator.replace(new RegExp(' ', 'g'), '_')
      const exist = emulatorsArray.filter(em => em.id === emulatorId).length > 0 ? true : false
      if (emulatorId && !exist) {
        emulatorsArray.push({
          id: emulatorId,
          name: emulator.replace(new RegExp('_', 'g'), ' '),
          cmd: emulator,
          running: false,
          logs: '',
          error: '',
          process: null,
        })
      }
    })
    emulatorsArray.push({
      id: 'Pixel_API_28',
      name: 'Pixel API 28',
      cmd: 'Pixel_API_28',
      running: false,
      logs: '',
      error: '',
      process: null,
    })
    await this.setState({ emulators: emulatorsArray })
  }

  async logEmulator(emulator, message) {
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
    process.stdout
    let instance = child.spawn(
      runEmulatorCMD,
      ['-logcat *:*', '-show-kernel'],
      { shell: true, detached: false }
    )
    await this.updateEmulator(emulator, 'process', instance)
    await this.updateEmulator(emulator, 'running', true)
    console.log(this.state.emulators)
    instance.stdout.on('data', async data => {
      await this.logEmulator(emulator, data.toString())
      //console.log('stdout data', data.toString(), emulator.id)
    })
    instance.stderr.on('data', async data => {
      await this.logEmulator(emulator, data.toString())
      this.handleToggleDialog('Error', data.toString())
      console.error('stderr data', data.toString(), emulator.id)
    })
    instance.on('event', async code => {
      await this.updateEmulator(emulator, 'running', false)
      console.log('close', code, emulator.id)
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
    alert('Stopping emulators is not implemented yet. Please close emulator window to proceeed.')
  }

  handleToggleDialog = (title = '', message = '') => {
    this.setState({
      dialogVisible: !this.state.dialogVisible,
      dialogTitle: title,
      dialogMessage: message,
    })
  }

  render() {
    const {
      dialogVisible,
      dialogTitle,
      dialogMessage, 
      emulators
    } = this.state
    const anyRunning = emulators.filter(em => em.running).length > 0 ? true : false

    return (
      <div className={styles.root}>
        <div className={styles.emulatorsContainer}>
          <Paper>
            {emulators.length > 0 ?
              <Table className={styles.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>AVD Devices</TableCell>
                    <TableCell align="right">Actions</TableCell>
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
                      <TableCell align="right">
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
        </div>

        <AppBar position="fixed" className={styles.logsContainer}>
          <EmulatorLogs
            emulators={emulators}
            anyRunning={anyRunning}
            className={styles.logs}
          />
        </AppBar>

        <Dialog open={dialogVisible} onClose={() => this.handleToggleDialog()}>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>{dialogMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleToggleDialog()} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
