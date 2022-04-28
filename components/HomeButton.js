import React, { Component } from "react";
import { Button } from "@blueprintjs/core";
import Link from "next/link";

export default class HomeButton extends Component {
  render() {
    return (
      <div
        className="position-absolute w-100"
        style={{ bottom: "1rem", left: 0 }}
      >
        <div className="text-center">
          <Link href="/" passHref={true}>
            <Button icon="home">Home</Button>
          </Link>
        </div>
      </div>
    );
  }
}
