import Form from './Form.js';
import React, {Component} from 'react';
import "./App.css";

class App extends Component{
  render() {
    return (
        <div className="wrapper">
        <h1 className="text-center">Case form</h1>
        <Form/>
    </div>

    );
  }

}

export default App;
