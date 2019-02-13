// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import styles from './EmulatorLogs.css';

export default class EmulatorLogs extends Component {
  props = {
    emulators: PropTypes.array.isRequired,
  }

  static defaultProps = {
    emulators: {},
  }

  state = {
    active: 0,
  }

  constructor(props) {
    super(props)
    this.logs = React.createRef()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  handleChange = (event, active) => {
    this.setState({ active })
  }

  scrollToBottom() {
    if(this.logs.current){
      this.logs.current.scrollTop = this.logs.current.scrollHeight
    }
  }

  render() {
    const { emulators } = this.props
    const { active } = this.state

    return (
      <div className={styles.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={active}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollButtons="auto"
          >
            {emulators.map((emulator, index) => {
              return ( <Tab key={`tab-${emulator.id}`} label={(emulator.running ? ' ⬤ ' : ' ◯ ') + emulator.name} /> )
            })}
          </Tabs>
        </AppBar>
        {emulators.map((emulator, index) => {
          if (active === index) {
            return (
              <div
                ref={this.logs}
                key={`tab-container-${emulator.id}`}
                className={styles.tabContainer}
              >
                {emulator.running ? emulator.logs : 'Stopped.'}
              </div>
            )
          }
        })}
      </div>
    )
  }
}