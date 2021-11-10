import React, { Component } from "react";
import { Container, Fade, Spinner } from "react-bootstrap";
import {
  Button,
  Toaster,
  Position,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import CopyToClipboard from "react-copy-to-clipboard";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import logo from "../../styles/img/www.png";

const TinyURL = require("tinyurl");

export default class LinkShortener extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      shortened: "",
      progress: false,
      copyStatus: false,
    };

    this.refHandlers = {
      toaster: (ref) => (this.toaster = ref),
    };
  }

  updateURL = (url) => this.setState({ ...this.state, url, copyStatus: false });

  updateShortenedURL = (shortened) =>
    this.setState({
      ...this.state,
      shortened,
      progress: false,
      copyStatus: false,
    });

  shortenURL = () => {
    let { url } = this.state;

    if (url.indexOf("://") === -1 && url.indexOf(".") === -1) {
      this.toaster.show({
        timeout: 5000,
        message: "Enter a valid URL!",
        intent: "warning",
      });
    } else {
      this.setState({ ...this.state, progress: true });

      TinyURL.shorten(url, (result, error) => {
        if (error || result === "Error") {
          console.log(error);
          this.toaster.show({
            timeout: 5000,
            message: error || result || "Something went wrong. Try again.",
            intent: "danger",
          });

          this.setState({ ...this.state, progress: false });
        } else {
          this.updateShortenedURL(result);
        }
      });

      this.updateShortenedURL();
    }
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Link Shortener | Random Apps</title>
          <meta name="description" content="URL Link Shortener" />
          <meta
            name="keywords"
            content="random, quick, useful, apps, link, url, shortener, url link, link shortener, url link shortener"
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
                    <span>URL Link Shortener</span>
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
                <div className="h-100 w-100 app-container">
                  <div className="text-center">
                    <small>URL Shortened with TinyURL</small>
                  </div>
                  <br />
                  <FormGroup
                    helperText="Paste any URL link here."
                    label="URL to Shorten"
                    labelFor="input-url-here"
                    className="w-100"
                  >
                    <InputGroup
                      id="input-url-here"
                      type="url"
                      placeholder="Enter/Paste URL Here"
                      value={this.state.url}
                      onChange={(e) => this.updateURL(e.target.value)}
                    />
                  </FormGroup>
                  <div className="text-center">
                    <Button
                      intent="primary"
                      onClick={this.shortenURL}
                      disabled={
                        this.state.url || this.state.progress ? false : true
                      }
                    >
                      {this.state.progress ? (
                        <Spinner animation="border" role="status" size="sm" />
                      ) : (
                        "Shorten URL"
                      )}
                    </Button>
                  </div>
                  <br />
                  <FormGroup
                    helperText="This is the shortened URL."
                    label="Shortened URL"
                    labelFor="shortened-url-here"
                  >
                    <InputGroup
                      id="shortened-url-here"
                      type="url"
                      placeholder="This will be auto generated"
                      value={this.state.shortened}
                      readOnly
                    />
                  </FormGroup>
                  <div className="text-center">
                    <CopyToClipboard
                      text={this.state.shortened}
                      onCopy={() =>
                        this.setState(
                          {
                            ...this.state,
                            copyStatus: this.state.shortened ? true : false,
                          },
                          () =>
                            this.toaster.show({
                              timeout: 5000,
                              message: this.state.shortened
                                ? "Shortened Link Copied!"
                                : "Empty Link!",
                              intent: this.state.shortened
                                ? "success"
                                : "danger",
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
                        disabled={
                          this.state.shortened || this.state.progress
                            ? false
                            : true
                        }
                      >
                        {this.state.copyStatus ? "Copied" : "Copy"}
                      </button>
                    </CopyToClipboard>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </Container>
      </React.Fragment>
    );
  }
}
