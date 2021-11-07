import React, { Component } from "react";
import { Container, Fade } from "react-bootstrap";
import { Button } from "@blueprintjs/core";
import Link from "next/link";

import Header from "../components/Header";

export default class About extends Component {
  render() {
    return (
      <Fade appear={true} in={true}>
        <div
          className="d-flex align-items-center justify-content-center h-100 w-100"
          style={{ minHeight: "100vh" }}
        >
          <div>
            <Header />
            <Container>
              <div className="d-flex align-items-center justify-content-center h-100 w-100">
                <div className="text-center">
                  <h6>
                    Hello! I am{" "}
                    <a
                      href="https://satshree.com.np"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Satshree Shrestha
                    </a>
                  </h6>
                  <p style={{ padding: "1rem" }} align="justify">
                    I developed this app. It was some random day when I thought
                    what if we had this random app which could do something you
                    really wanted to at the moment! This led me to build this
                    app. I will be adding more apps to Random Apps as time goes.
                    <em>You know</em>, inspiration can hit at any moment.
                  </p>
                  <a
                    href="https://satshree.com.np/#/ping"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Drop me suggestions and ideas
                  </a>{" "}
                  for the apps to add!
                  <br />
                  <br />
                  <Link href="/" passHref={true}>
                    <Button
                      className="bp-3-btn-fill-mobile"
                      intent="primary"
                      icon="home"
                    >
                      Home
                    </Button>
                  </Link>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Fade>
    );
  }
}
