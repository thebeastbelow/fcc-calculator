import React from 'react';
import './Numpad.css'

function Button(props) {
  const buttonName = props.button;
  let id;
  switch(buttonName) {
    case 'AC':
      id = 'alc';
      break;
    case 'CE':
      id = 'cen';
      break;
    case '÷':
      id = 'div';
      break;
    case '×':
      id = 'mul';
      break;
    case '−':
      id = 'min';
      break;
    case '+':
      id = 'pls';
      break;
    case '=':
      id = 'eql';
      break;
    case '.':
      id = 'dot';
      break;
    default:
      id = 'nm' + buttonName;
  }
  return (
    <button
      type="button"
      id={id}
      onClick={() => props.onClick(buttonName)}
      className={"grid-item" + (
        ["AC", "CE"].includes(buttonName) ?
        " clear" :
        ""
      )}>
        {buttonName}
      </button>
  );
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
