import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { Container, Fade } from "react-bootstrap";
import { Toaster, Position } from "@blueprintjs/core";

import HomeButton from "../../components/HomeButton";

import logo from "../../styles/img/note.png";

export default class QuickNote extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.refHandlers = {
      toaster: (ref) => (this.toaster = ref),
    };
  }
  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Password Generator | Random Apps</title>
          <meta name="description" content="Quick note... that's it" />
          <meta
            name="keywords"
            content="random, quick, useful, apps, note, note, note"
          />
        </Head>
        <Container className="main-body">
          <Toaster
            position={Position.BOTTOM_RIGHT}
            ref={this.refHandlers.toaster}
          />
          <Fade appear={true} in={true}>
            <div className="h-100">
              {/* HEADER */}
              <div className="text-center w-100">
                <div className="d-flex align-items-center justify-content-center w-100 p-5 pb-3">
                  <Image
                    src={logo.src}
                    alt="header logo"
                    width="50px"
                    height="50px"
                    // style={{ width: "50px" }}
                  />
                  <h4 style={{ marginLeft: "5px" }}>
                    <span>Quick Note</span>
                  </h4>
                </div>
                <small>Jot down your thoughts</small>
              </div>
              {/* HEADER */}
              <hr
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              />
              {/* MAIN FLEX CONTAINER */}
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  minHeight: "300px",
                }}
              ></div>
            </div>
          </Fade>
          <HomeButton />
        </Container>
      </React.Fragment>
    );
  }
}
