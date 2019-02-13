// @flow
import React, { Component } from 'react';
import Emulators from '../components/emulators/Emulators';

type Props = {}

export default class HomePage extends Component<Props> {
  props: Props

  render() {
    const { classes } = this.props
    return ( <Emulators /> )
  }
}