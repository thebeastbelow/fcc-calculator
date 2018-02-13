import React from 'react';
import './Calculator.css'
import Screen from './Screen'
import Numpad from './Numpad'

function Calculator() {
  return (
    <div className="row">
      <div className="col">
        <div id="calculator">
          <Screen value="12345" />
          <Numpad onClick={(value) => { console.log(value); }} />
        </div>
      </div>
    </div>
  );
}

export default Calculator;
