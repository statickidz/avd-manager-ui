// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { shell } from 'electron'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';
import styles from './Header.css';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  static defaultProps = {
    title: '',
  }

  state = {
    aboutDialog: false,
    settingsDialog: false,
  }

  toggleSettingsDialog = () => {
    this.setState({ settingsDialog: !this.state.settingsDialog });
  }

  toggleAboutDialog = () => {
    this.setState({ aboutDialog: !this.state.aboutDialog });
  }

/*
  Settings icon
  <IconButton color="inherit" onClick={this.handleClickOpen}>
    <i className="fas fa-sliders-h" />
  </IconButton>
*/

  render() {
    const { title } = this.props

    return (
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <i className="fab fa-android" /> {title}
          </Typography>
          <div className={styles.grow} />
          <IconButton color="inherit" onClick={this.toggleAboutDialog}>
            <i className="far fa-question-circle" />
          </IconButton>
        </Toolbar>

        <Dialog
          open={this.state.aboutDialog}
          onClose={this.toggleAboutDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>About</DialogTitle>
          <DialogContent>
            <DialogContentText>
              AVD Manager UI allows you to run Android Studio emulators outside of it.
              <br /><br />Feel free to contribute on Github:
              <br /><Link onClick={() => shell.openExternal('https://github.com/statickidz/avd-manager-ui')}>https://github.com/statickidz/avd-manager-ui</Link>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleAboutDialog} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          fullScreen
          open={this.state.settingsDialog}
          onClose={this.toggleSettingsDialog}
          TransitionComponent={Transition}
        >
          <AppBar className={styles.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.toggleSettingsDialog}>
                <i className="fas fa-times" />
              </IconButton>
              <Typography variant="h6" color="inherit" className={styles.flex}>
                Settings
              </Typography>
              <Button color="inherit" onClick={this.toggleSettingsDialog}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List>
        </Dialog>
      </AppBar>
    )
  }
}
