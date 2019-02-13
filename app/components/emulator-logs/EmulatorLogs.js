// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import styles from './EmulatorLogs.css';

type Props = {
  emulators: array,
  anyRunning: boolean,
}

export default class EmulatorLogs extends Component<Props> {
  props: Props

  state = {
    active: 0,
  }

  constructor(props) {
    super(props)
    this.logs = React.createRef()
  }

  handleChange = (event, active) => {
    this.setState({ active })
  }
  
  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom() {
    if(this.logs){
      this.logs.current.scrollTop = this.logs.current.scrollHeight
    }
  }

  render() {
    const { emulators, anyRunning } = this.props
    const { active } = this.state

    if (anyRunning) {
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
                if (emulator.running) {
                  return ( <Tab key={`tab-${emulator.id}`} label={emulator.name} /> )
                }
              })}
            </Tabs>
          </AppBar>
          {emulators.map((emulator, index) => {
            if (active === index && emulator.running) {
              return (
                <div
                  ref={this.logs}
                  key={`tab-container-${emulator.id}`}
                  className={styles.tabContainer}
                >
                  {emulator.logs}
                </div>
              )
            }
          })}
        </div>
      )
    } else {
      return <div />
    }
  }
}