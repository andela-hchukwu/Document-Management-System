import React, { PropTypes, Component } from 'react';
import Navbar from './Common/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};

export default App;
