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
        <meta
          name="keywords"
          content="random, quick, useful, apps, netlify, satshree, shrestha, random apps, random useful apps, quick apps, quick useful apps"
        />
      </Head>
      <Fade appear={true} in={true}>
        <React.Fragment>
          <Main />
        </React.Fragment>
      </Fade>
    </div>
  );
}
