import React, { Component } from "react";
import { Container, Fade, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/Home.module.css";

import passwordLogo from "./styles/img/password.png";

import Header from "./components/Header";

export default class Main extends Component {
  render() {
    return (
      <Fade appear={true} in={true}>
        <div>
          <main className={styles.main}>
            <Container>
              <Header />
              <Row className="text-center w-100">
                <Col className="col-margin" sm={6} md={4}>
                  <div className="w-100 h-100 app-container">
                    <div className="app-logo">
                      <Link href="/apps/password" passHref={true}>
                        <Image
                          src={passwordLogo.src}
                          alt="password logo"
                          width="100px"
                          height="100px"
                        />
                      </Link>
                    </div>
                    <br />
                    <span className="app-label">Password Generator</span>
                  </div>
                </Col>
                <Col className="col-margin" sm={6} md={4}>
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <span>
                      Other apps coming soon...
                      <br />
                      <small>
                        <a
                          href="https://satshree.com.np/#/ping"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Suggest apps
                        </a>
                      </small>
                    </span>
                  </div>
                </Col>
              </Row>
            </Container>
          </main>
          <footer className={styles.footer}>
            <a
              href="https://github.com/satshree/random-apps"
              target="blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <Link href="about" passHref={true}>
              About
            </Link>
          </footer>
        </div>
      </Fade>
    );
  }
}
