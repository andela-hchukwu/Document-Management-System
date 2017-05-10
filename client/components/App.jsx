// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from './Common/Header';
import FlashMessageList from './FlashMessageList/index';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar location={this.props.location} />
        <FlashMessageList />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

export default App;
