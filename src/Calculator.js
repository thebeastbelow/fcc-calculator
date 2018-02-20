import React from 'react';
import './Calculator.css'
import Screen from './Screen'
import Numpad from './Numpad'
import math from 'mathjs'

class Calculator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      screenValue: '',
      historyValue: ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.screenOverlowRef = this.screenOverlowRef.bind(this);
    this.historyOverlowRef = this.historyOverlowRef.bind(this);
    this.checkOverflow = this.checkOverflow.bind(this);
    this.hitLimit = false;
    this.operator = false;
    this.error = false;
    this.calculated = false;
  }

  handleClick(buttonName) {
    if (this.hitLimit || this.error) {
      this.setState({
        historyValue: ""
      });
      this.hitLimit = false;
      this.operator = false;
      this.calculated = false;
      this.error = false;
    }
    if (["+", "−", "÷", "×"].includes(buttonName)) {
      this.setState(prevState => {
        let newHistoryValue;
        if (this.operator) {
          newHistoryValue = prevState.historyValue.slice(0, -1) + buttonName;
        }
        else if (this.calculated) {
          let eqlPosition = prevState.historyValue.indexOf("=");
          newHistoryValue = (prevState.historyValue.slice(eqlPosition + 1)
            + buttonName);
          this.calculated = false;
          this.operator = true;
        }
        else {
          newHistoryValue = prevState.screenValue ?
          (prevState.historyValue + prevState.screenValue + buttonName):
          prevState.historyValue;
        }
        return {screenValue: "", historyValue: newHistoryValue};
      }, this.checkOverflow);
    } else if (buttonName === "=") {
      if (!this.calculated) {
        this.setState((prevState) => {
          if (prevState.screenValue !== "") {
            let result = null;
            try {
              result = math.eval(
                (prevState.historyValue + prevState.screenValue).replace(
                  /[÷×−]/g, (match) => {
                    switch (match) {
                      case "÷":
                        return "/";
                      case "×":
                        return "*";
                      case "−":
                        return "-";
                      default:;
                    }
                  }
                )
              );
              if (result.toString().indexOf(".") > -1) {
                result = result.toFixed(2);
              }
            }
            catch (e) {
              console.log(e);
            }
            this.calculated = !(
              result === null || result === Infinity
                || Number.isNaN(result) || result === undefined
            );
            this.error = !this.calculated;
            return {
              screenValue: this.calculated ? result : "",
              historyValue: (
                this.calculated ?
                (prevState.historyValue + prevState.screenValue
                  + buttonName + result) :
                "error"
              )
            };
          } else {
            return {
              screenValue: prevState.screenValue,
              historyValue: prevState.historyValue
            }
          }
        }, this.checkOverflow);
      }
    } else if (buttonName === "CE") {
      this.setState({
        screenValue: ""
      });
    } else if (buttonName === "AC") {
      this.setState({
        screenValue: "",
        historyValue: ""
      });
      this.operator = false;
      this.calculated = false;
      this.error = false;
      this.hitLimit = false;
    } else {
      this.setState(prevState => {
        let addition = buttonName;
        if (buttonName === "." && !this.calculated) {
          addition = (
            prevState.screenValue.toString().indexOf(".") < 0 ?
            "." :
            ""
          );
        }
        const newScreenValue = (
          this.calculated ?
          addition :
          prevState.screenValue + addition);
        const newHistoryValue = this.calculated ? "" : prevState.historyValue;
        this.calculated = false;
        return {
          screenValue: newScreenValue,
          historyValue: newHistoryValue
        };
      }, this.checkOverflow);
      this.operator = false;
    }
  }

  checkOverflow() {
    if (this.screenRef.offsetWidth < this.screenRef.scrollWidth) {
        this.setState({
          screenValue: "",
          historyValue: "digit limit met"
        });
      this.hitLimit = true;
    }
  }

  screenOverlowRef(screen) {
    this.screenRef = screen;
  }

  historyOverlowRef(history) {
    this.historyRef = history;
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          <div id="calculator">
            <Screen
              screenRef={this.screenOverlowRef}
              historyRef={this.historyOverlowRef}
              screenValue={this.state.screenValue}
              historyValue={this.state.historyValue} />
            <Numpad onClick={this.handleClick} />
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
