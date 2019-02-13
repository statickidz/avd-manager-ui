// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';

import styles from './Header.css';

type Props = {
  title: string,
}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class Header extends Component<Props> {
  props: Props

  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { title } = this.props

    return (
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            <i className="fab fa-android" /> {title}
          </Typography>
          <div className={styles.grow} />
          <IconButton color="inherit" onClick={this.handleClickOpen}>
            <i className="fas fa-sliders-h" />
          </IconButton>
        </Toolbar>

        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={styles.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose}>
                <i className="fas fa-times" />
              </IconButton>
              <Typography variant="h6" color="inherit" className={styles.flex}>
                Settings
              </Typography>
              <Button color="inherit" onClick={this.handleClose}>
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
