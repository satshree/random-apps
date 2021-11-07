import React from "react";
import { Fade } from "react-bootstrap";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import Main from "../Main.js";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Random Apps</title>
        <meta name="description" content="Quick and random useful apps" />
        <meta name="author" content="Satshree Shrestha" />
        <meta name="keywords" content="random, quick, useful, apps" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Fade appear={true} in={true}>
        <React.Fragment>
          <Main />
        </React.Fragment>
      </Fade>
    </div>
  );
}
