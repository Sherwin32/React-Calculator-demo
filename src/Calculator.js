import React, { Component } from 'react';
import Row from './components/Row/Row'
import NumberDisplay from './components/NumberDisplay/NumberDisplay'
import './Calculator.css';

class Calculator extends Component {
  state = {
    currentString: "",
    operator: "",
    hasDecPoint: false,
    lastString: "",
    shouldDisplayNewStringOnNextClick: false,
    justShowedResult: false
  }

  onClickHandler = (val, type) => {
    if(type==='value'){
      if(this.state.shouldDisplayNewStringOnNextClick){
        this.displayNewString(val);
      }else if(this.state.justShowedResult){
        this.resetDisplay(()=>{this.valueHandler(val)})
      }else{
        this.valueHandler(val);
      }
    }else if(type==='operator'){
      // if(this.isContinuousCalc()){
      //   let opTemp = val;
      //   this.calculateResult();
      //   this.setState({operator:opTemp})
      // }else{
        this.operatorHandler(val)
      // }
    }else{
      this.specialHandler(val);
    }
  }
  
// UNDER CONSTRUCTION
  isContinuousCalc = () => {
    let a = this.state.currentString !== "";
    let b = this.state.operator !== "";
    let c = this.state.lastString !== "";
    // console.log(a,b,c)
    return a && b && c;
  }

  displayNewString = (val) => {
    let currentStringTemp = this.state.currentString;
    this.setState({
      currentString: "",
      lastString: currentStringTemp,
      hasDecPoint: false,
      shouldDisplayNewStringOnNextClick: false,
      justShowedResult: false
    }, () => this.valueHandler(val))
  }

  valueHandler = val => {
    if(val==='.'){
      if(this.state.hasDecPoint)return;
      if(this.state.currentString===""){
        this.setState({currentString: "0.", hasDecPoint: true});
      }else{
        let newString = this.state.currentString + "."
        this.setState({currentString: newString ,hasDecPoint: true})
      }
    }else{
      if(this.state.currentString==="" && val===0)return;
      let newString = this.state.currentString + val.toString();
      this.setState({currentString: newString});
    }
  }

  specialHandler = val => {
    if(val==='C'){
      this.resetDisplay();
    }else if(val==='='){
      if(this.state.operator==="")return;
      this.calculateResult();
    }else if(val==='+/-'){
      this.toggleAddition();
    }
  }

  operatorHandler = val => {
    this.setState({
      operator: val,
      shouldDisplayNewStringOnNextClick: true,
      justShowedResult: false
    })
  }

  resetDisplay = (callback) => {
    this.setState({
        currentString: "",
        operator: "",
        hasDecPoint: false,
        lastString: "",
        shouldDisplayNewStringOnNextClick: false,
        justShowedResult: false
      }, callback)
  }

  toggleAddition = () => {
    if(this.state.operator==="+"){
      this.setState({operator: "-"});
    }else if(this.state.operator==="-"){
      this.setState({operator: "+"});
    }
  }

  calculateResult = () => {
    let a = Number(this.state.lastString);
    let b = Number(this.state.currentString);
    switch(this.state.operator){
      case "+":
        this.renderResult(a+b);
        break;
      case "-":
        this.renderResult(a-b);
        break;
      case "X":
        this.renderResult(a*b);
        break;
      case "/":
        this.renderResult(a/b);
        break;
      case "%":
        this.renderResult(a%b);
        break;
    }
  }

  renderResult = result => {
    this.setState({
        currentString: result.toString(),
        operator: "",
        // lastString: "",
        lastString: result.toString(),
        shouldDisplayNewStringOnNextClick: false,
        justShowedResult: true
      })
  }

  render() {
    let btnArray = [
      [{val:'C' ,type: 'special' },{val:'+/-' ,type: 'special' },{val:'%' ,type: 'operator' },{val:'/' ,type: 'operator' }],
      [{val:7 ,type: 'value' },{val:8 ,type: 'value' },{val:9 ,type: 'value' },{val:'X' ,type: 'operator' }],
      [{val:4 ,type: 'value' },{val:5 ,type: 'value' },{val:6 ,type: 'value' },{val:'-' ,type: 'operator' }],
      [{val:1 ,type: 'value' },{val:2 ,type: 'value' },{val:3 ,type: 'value' },{val:'+' ,type: 'operator' }],
      [{val:0 ,type: 'value' },{val:'.' ,type: 'value' },{val:'=' ,type: 'special' }],
    ]
    /*
    |  C  | +/- |  %  |  /  |
    |  7  |  8  |  9  |  X  |
    |  4  |  5  |  6  |  -  |
    |  1  |  2  |  3  |  +  |
    |     0     |  .  |  =  |
    */
    let rows = btnArray.map((btns, i) => <Row btns={btns} key={i} click={this.onClickHandler} />)
    let display = this.state.currentString;
    if(display === "") display="0";
    return (
      <div className="Calculator">
        <h1>React Calculator Demo</h1>
        <NumberDisplay display={display}/>
        {rows}
      </div>
    );
  }
}

export default Calculator;
