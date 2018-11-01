import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  img = null;
  obj = {};
  state = {
    show: true
  };

  componentDidMount() {
    this.img.addEventListener("touchstart", this.swipeStart, false);
    this.img.addEventListener("touchmove", this.swipeMove, false);
    this.img.addEventListener("touchend", this.swipeEnd, false);
  }
  
  handleClick = () => {
    if (!this.state.show) {
      setTimeout(() => {
        this.setState(state => ({ show: !state.show }));
      }, 1000);
    } else {
      this.setState(state => ({ show: !state.show }));
    }
  };

  getChange = (pageX, pageY) => {
    this.img.style.transform = `translate(${pageX - this.obj.pageXInitial}px, ${pageY - this.obj.pageYInitial}px)`;
    this.img.style.opacity = `${1 - (Math.abs(this.obj.pageXInitial - pageX) / 100)}`;
  };
  swipeStart = e => {
    this.obj.pageXInitial = Math.round(e.touches[0].pageX);
    this.obj.pageYInitial = Math.round(e.touches[0].pageY);
    console.log(e.touches, "start");
  };

  swipeMove = e => {
    e.preventDefault();
    let pageX = Math.round(e.changedTouches[0].pageX);
    let pageY = Math.round(e.changedTouches[0].pageY);
    console.log(pageX, "pageX");
    console.log(this.obj.pageXInitial, "pageXInitial");
    if (pageX - this.obj.pageXInitial > 100) {
      this.removeImg();
      this.img.removeEventListener("touchstart", this.swipeStart, false);
      this.img.removeEventListener("touchmove", this.swipeMove, false);
    }
    this.getChange(pageX, pageY);
    console.log(e.touches, "move");
  };


  swipeEnd = e => {
    this.img.style.left = `${this.obj.pageXInitial - (this.img.offsetWidth / 2)}px`;
    this.img.style.top = `${this.obj.pageYInitial - (this.img.offsetHeight / 2)}px)`;
    this.img.style.transform = "none";
    this.img.style.opacity = 1;
    console.log(e.touches, "end");
  };

  removeImg = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <button onClick={this.handleClick}>Click me</button>
        <img
          ref={e => (this.img = e)}
          className={`${this.state.show ? "" : "drop"}`}
          src={"https://js.cx/browsers/chrome.svg"}
          alt="hi"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
