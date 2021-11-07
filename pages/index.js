import React from "react";
import { Container, Fade, Row, Col } from "react-bootstrap";
import Head from "next/head";
import Image from "next/image";
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
                    <div className="app-logo">
                      <Link href="password" passHref={true}>
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
            <a
              href="https://satshree.com.np/#/"
              target="blank"
              rel="noreferrer"
            >
              Made by Satshree Shrestha
            </a>
            <a
              href="https://satshree.com.np/#/ping"
              target="blank"
              rel="noreferrer"
            >
              Suggest me ideas!
            </a>
            <a
              href="https://github.com/satshree/random-apps"
              target="blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </footer>
        </Container>
      </main>
    </div>
  );
}
