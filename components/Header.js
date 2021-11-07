import React, { Component } from "react";

import logo from "../styles/img/dices.png";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.logo = React.createRef();
    // this.main = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      try {
        this.logo.current.className = "logo";
      } catch (e) {
        console.log(e);
      }
      // this.main.current.className += " move-up";
    }, 1000);
  }

  render() {
    return (
      <div
        // ref={this.main}
        className="text-center w-100 main-header"
      >
        <div className="d-flex align-items-center justify-content-center w-100">
          <img
            ref={this.logo}
            src={logo.src}
            className="logo-animate"
            alt="header logo"
            style={{ width: "50px" }}
          />
          <h4 style={{ marginLeft: "5px" }}>
            <span>Random Apps</span>
          </h4>
        </div>
        <br />
        <small>Quick and random useful apps</small>
        <hr style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }} />
      </div>
    );
  }
}
