import React, { Component } from "react";
import Image from "next/image";

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
          <div ref={this.logo} className="logo-animate">
            <Image
              src={logo.src}
              alt="header logo"
              width="50px"
              height="50px"
              // style={{ width: "50px" }}
            />
          </div>
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
