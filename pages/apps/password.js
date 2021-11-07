import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { Component } from "react";
import { Container, Fade } from "react-bootstrap";
import { Button, Toaster, Position } from "@blueprintjs/core";
import CopyToClipboard from "react-copy-to-clipboard";

import logo from "../../styles/img/password.png";

export default class PasswordGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      length: 25,
      value: "",
      copyStatus: false,
    };

    this.refHandlers = {
      toaster: (ref) => (this.toaster = ref),
    };
  }

  componentDidMount() {
    this.generator();
  }

  generator = () => {
    let { length } = this.state;
    let value = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:;.,/'[]\\";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      value += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    this.setState({ ...this.state, value });
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Password Generator | Random Apps</title>
          <meta
            name="description"
            content="Random string generator for passwords"
          />
          <meta
            name="keywords"
            content="random, quick, useful, apps, password, string, generator"
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
                    <span>Password Generator</span>
                  </h4>
                </div>
                <Link href="/" passHref={true}>
                  <Button icon="home">Home</Button>
                </Link>
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
              >
                {/* EXPANDED HEIGHT AND WEIGHT CONTAINER */}
                <div
                  className="h-100 w-100 text-center"
                  style={{
                    maxWidth: "800px",
                  }}
                >
                  <br />
                  <br />
                  Use randomly generated passwords to keep yourself safe.
                  <br />
                  <br />
                  <h6>Do not forget to save this password if you use it!</h6>
                  <br />
                  <div className="bp3-input-group">
                    <input
                      type="text"
                      className="bp3-input text-center"
                      placeholder="This should be auto generated..."
                      value={this.state.value}
                      onChange={(e) =>
                        this.setState({
                          ...this.state,
                          value: e.target.value,
                          copyStatus: false,
                        })
                      }
                    />
                    <button
                      className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-reset"
                      type="button"
                      onClick={() =>
                        this.setState(
                          { ...this.state, copyStatus: false },
                          this.generator
                        )
                      }
                    ></button>
                  </div>
                  <br />
                  <CopyToClipboard
                    text={this.state.value}
                    onCopy={() =>
                      this.setState(
                        {
                          ...this.state,
                          copyStatus: this.state.value ? true : false,
                        },
                        () =>
                          this.toaster.show({
                            timeout: 5000,
                            message: this.state.value
                              ? "Random String Copied!"
                              : "Empty String!",
                            intent: this.state.value ? "success" : "danger",
                          })
                      )
                    }
                  >
                    <button
                      className={
                        this.state.copyStatus
                          ? "bp3-button bp-3-btn-fill-mobile bp3-intent-success"
                          : "bp3-button bp-3-btn-fill-mobile bp3-intent-primary"
                      }
                      disabled={this.state.value ? false : true}
                    >
                      {this.state.copyStatus ? "Copied" : "Copy"}
                    </button>
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </Fade>
        </Container>
      </React.Fragment>
    );
  }
}
