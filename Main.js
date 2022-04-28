import React, { Component } from "react";
import { Container, Fade, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/Home.module.css";

import passwordLogo from "./styles/img/password.png";
import linkShortenerLogo from "./styles/img/www.png";
import youtubeLogo from "./styles/img/youtube.png";

import Header from "./components/Header";

const mobile = require("is-mobile");

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      apps: [
        {
          id: 1,
          name: "Password Generator",
          icon: passwordLogo.src,
          link: "/apps/password",
        },
        {
          id: 2,
          name: "Link Shortener",
          icon: linkShortenerLogo.src,
          link: "/apps/link-shortener",
        },
        {
          id: 3,
          name: "YouTube Player",
          icon: youtubeLogo.src,
          link: "/apps/youtube-player",
        },
      ],
    };
  }

  render() {
    return (
      <Fade appear={true} in={true}>
        <div>
          <main className={styles.main}>
            <Container>
              <Header />
              <Row className="text-center w-100 remove-row-gutter">
                {this.state.apps.map((app, index) => (
                  <Col
                    key={index}
                    className="col-margin d-flex align-items-center justify-content-center"
                    sm={6}
                    md={4}
                  >
                    <div className="w-100 h-100 app-container">
                      <div className="app-logo">
                        <Link href={app.link} passHref={true}>
                          <Image
                            src={app.icon}
                            alt={`${app.name}-${app.id}`}
                            width="100px"
                            height="100px"
                          />
                        </Link>
                      </div>
                      <br />
                      <Link href={app.link} passHref={true}>
                        <span className="app-label clickable">{app.name}</span>
                      </Link>
                    </div>
                  </Col>
                ))}
                <Col className="col-margin mt-5" sm={12}>
                  <div className="d-flex align-items-center justify-content-center w-100 h-100">
                    <span>
                      More apps coming soon...
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
          <footer
            className={styles.footer}
            style={{ bottom: mobile() ? "1rem" : "0" }}
          >
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
