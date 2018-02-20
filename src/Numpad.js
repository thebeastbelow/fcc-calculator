import React from 'react';
import './Numpad.css'

class Button extends React.PureComponent {
  constructor(props) {
    super(props);
    this.generateId.bind(this)();
  }

  generateId() {
    switch(this.props.button) {
      case 'AC':
        this.id = 'alc';
        break;
      case 'CE':
        this.id = 'cen';
        break;
      case '÷':
        this.id = 'div';
        break;
      case '×':
        this.id = 'mul';
        break;
      case '−':
        this.id = 'min';
        break;
      case '+':
        this.id = 'pls';
        break;
      case '=':
        this.id = 'eql';
        break;
      case '.':
        this.id = 'dot';
        break;
      default:
        this.id = 'nm' + this.props.button;
    }
  }

  render() {
    return (
      <button
        type="button"
        id={this.id}
        onClick={() => this.props.onClick(this.props.button)}
        className={"grid-item" + (
          ["alc", "cen"].includes(this.id) ?
          " clear" :
          ""
        )}>
          {this.props.button}
        </button>
    );
  }
}

function Grid(props) {
  return (
    <div className="grid-container">
      {props.buttons.map(button =>
        <Button key={button} button={button} onClick={props.onClick} />
      )}
    </div>
  );
}

function Numpad(props) {
  const buttons = [
    'AC', 'CE', '÷', '×',
    '7' , '8' , '9', '−',
    '4' , '5' , '6', '+',
    '1' , '2' , '3',
    '0'       , '.', '='
  ];
  return (
    <div id="pad">
      <Grid buttons={buttons} onClick={props.onClick} />
    </div>
  );
}

export default Numpad;
