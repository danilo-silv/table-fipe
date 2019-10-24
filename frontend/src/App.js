import React, { Component } from 'react';
import Routes from "./routes";
import Header from "./components/Header";

import "./style-global.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes />
      </div>
    )
  }
}
export default App;
