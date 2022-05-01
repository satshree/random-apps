import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { Container, Fade } from "react-bootstrap";
import { Toaster, Position, Button, NumericInput } from "@blueprintjs/core";

import HomeButton from "../../components/HomeButton";

import logo from "../../styles/img/note.png";
import css from "./styles/quick-notes.module.css";

// function randomID() {
//   let result = "";
//   let characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let charactersLength = characters.length;
//   for (let i = 0; i < 10; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// }

export default class QuickNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // lines: [
      //   {
      //     id: randomID(),
      //     number: 1,
      //     data: "",
      //   },
      // ],
      text: "",
      fontSize: 16,
    };

    this.refHandlers = {
      toaster: (ref) => (this.toaster = ref),
    };
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      let text = localStorage.getItem("random-app-quick-note-text");

      if (text) {
        this.setState({ ...this.state, text });
      }
    }
  }
  // THIS WAS A VERY NICE LOGIC I CAME UP WITH FOUND ANOTHER SOLUTION... SAD
  // nextLine = (line, index) => {
  //   let { lines } = this.state;
  //   let id = randomID();
  //   let lineNumber = line.number;
  //   if (lines.length === lineNumber) {
  //     lines.push({
  //       id,
  //       number: lineNumber + 1,
  //       data: "",
  //     });
  //   }
  //   this.setState({ ...this.state, lines }, () => {
  //     if (index !== -1) {
  //       let newLine = lines[index + 1];
  //       document.getElementById(newLine.id).focus();
  //     }
  //   });
  // };

  // prevLine = (line, index) => {
  //   let { lines } = this.state;
  //   if (index !== -1 && lines.length > 1 && line.data === "") {
  //     let newLine = lines[index - 1];
  //     lines.splice(index, 1);
  //     document.getElementById(newLine.id).focus();

  //     this.setState({ ...this.state, lines });
  //   }
  // };

  countWord = () => {
    let { text } = this.state;
    return text ? text.trim().split(/\s+/).length : 0;
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      fontSize: e,
    });
  };

  download = () => {
    let blob = new Blob([this.state.text], { type: "txt" });

    let a = document.createElement("a");
    a.download = "thought.txt";
    a.href = URL.createObjectURL(blob);
    a.dataset.downloadurl = ["txt", a.download, a.href].join(":");
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
    }, 1500);
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>Password Generator | Random Apps</title>
          <meta name="description" content="Quick note... that's it" />
          <meta
            name="keywords"
            content="random, quick, useful, apps, note, note, note"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Container className="main-body">
          <Toaster
            position={Position.BOTTOM_RIGHT}
            ref={this.refHandlers.toaster}
          />
          <Fade appear={true} in={true}>
            <div style={{ height: "60vh" }}>
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
                    <span>Quick Note</span>
                  </h4>
                </div>
                <small>Jot down your thoughts</small>
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
              <div className="w-100 h-100">
                <div className="w-100 d-flex align-items-center justify-content-between">
                  <Button
                    icon="cross"
                    intent="danger"
                    onClick={() =>
                      this.setState({ ...this.state, text: "" }, () =>
                        typeof window !== "undefined"
                          ? localStorage.setItem(
                              "random-app-quick-note-text",
                              ""
                            )
                          : null
                      )
                    }
                  >
                    Clear
                  </Button>
                  <div className="d-flex align-items-center justify-content-center">
                    <span className="mx-2">Font:</span>
                    <NumericInput
                      // type="number"
                      // className="bp3-input text-center"
                      placeholder="Font Size"
                      defaultValue={16}
                      value={this.state.fontSize}
                      onValueChange={this.handleChange}
                      style={{ width: "2.5rem", textAlign: "center" }}
                      min={1}
                    />
                    <Button
                      icon="download"
                      intent="primary"
                      className="ms-2"
                      onClick={this.download}
                    >
                      Download
                    </Button>
                  </div>
                </div>
                <textarea
                  className={css.text}
                  value={this.state.text}
                  onChange={(e) => {
                    let { text } = this.state;
                    text = e.target.value;
                    this.setState({ ...this.state, text });
                    if (typeof window !== "undefined")
                      localStorage.setItem("random-app-quick-note-text", text);
                  }}
                  placeholder="What's on your mind?"
                  style={{ fontSize: this.state.fontSize }}
                />
                <br />
                <br />
                <span>Words: {this.countWord()}</span>
                {/* THIS WAS A VERY NICE LOGIC I CAME UP WITH BUT THE ABOVE SOLUTION WORKED BETTER LOL */}
                {/* {this.state.lines.map((line, index) => (
                  <React.Fragment>
                    <div
                      className="d-flex align-items-center w-100"
                      style={{ flexDirection: "row" }}
                    >
                      <div className={css.line}>{line.number}</div>
                      <div className="w-100">
                        <input
                          id={line.id}
                          className={css.input}
                          value={this.state.lines[index].data}
                          onChange={(e) => {
                            let { lines } = this.state;
                            lines[index].data = e.target.value;
                            this.setState({ ...this.state, lines });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              this.nextLine(line, index);
                            } else if (e.key === "Backspace") {
                              this.prevLine(line, index);
                            }
                          }}
                          placeholder={
                            this.state.lines.length === 1
                              ? "What's on your mind?"
                              : null
                          }
                        />
                      </div>
                    </div>
                  </React.Fragment>
                ))} */}
              </div>
            </div>
          </Fade>
          <HomeButton />
        </Container>
      </React.Fragment>
    );
  }
}
