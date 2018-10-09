import React, { Component } from 'react';
import UserList from './UserList';
import 'antd/dist/antd.css';
import './css/index.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserList />
      </div>
    );
  }
}

export default App;
