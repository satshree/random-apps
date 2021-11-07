import React from "react";
import { Container, Fade, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import passwordLogo from "../styles/img/password.png";

import Header from "../components/Header.js";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Apps</title>
        <meta name="description" content="Quick and random useful apps" />
        <meta name="author" content="Satshree Shrestha" />
        <meta name="keywords" content="random, quick, useful, apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Container>
          <Header />
          <Fade appear={true} in={true}>
            <React.Fragment>
              <Row className="text-center w-100">
                <Col className="col-margin" sm={6} md={4}>
                  <div className="w-100 h-100 app-container">
                    <Link href="password">
                      <img
                        src={passwordLogo.src}
                        className="app-logo"
                        alt="password logo"
                      />
                    </Link>
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
                          rel="noopener"
                        >
                          Suggest apps
                        </a>
                      </small>
                    </span>
                  </div>
                </Col>
              </Row>
            </React.Fragment>
          </Fade>
          <footer className={styles.footer}>
            <a href="https://satshree.com.np/#/" target="_blank" rel="noopener">
              Made by Satshree Shrestha
            </a>
            <a
              href="https://satshree.com.np/#/ping"
              target="_blank"
              rel="noopener"
            >
              Suggest me ideas!
            </a>
          </footer>
        </Container>
      </main>
    </div>
  );
}
