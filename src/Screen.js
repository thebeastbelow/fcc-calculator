import React from 'react';
import './Screen.css'

class Screen extends React.Component {
  componentDidMount() {
    this.input.focus();
  }

  render() {
    return (
      <div id="screen">
        <input
          id="input"
          value={this.props.value}
          type="text"
          ref={input => {this.input = input}}
          className="text-right" />
        <p id="history" className="text-right">hist</p>
      </div>
    );
  }
}

export default Screen;
