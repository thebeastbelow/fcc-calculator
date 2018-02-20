import React from 'react';
import './Screen.css'

class Screen extends React.PureComponent {
  render() {
    return (
      <div id="screen">
        <div
          id="input"
          className="text-right"
          ref={this.props.screenRef} >
            {this.props.screenValue}
          </div>
        <p
          id="history"
          className="text-right"
          ref={this.props.historyRef} >
            {this.props.historyValue}
          </p>
      </div>
    );
  }
}

export default Screen;
