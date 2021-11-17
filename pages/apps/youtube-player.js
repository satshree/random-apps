import React, { Component } from "react";
import { Container, Fade, Row, Col, Form, Spinner } from "react-bootstrap";
import {
  Button,
  Dialog,
  Position,
  Toaster,
  FormGroup,
  InputGroup,
  Icon,
} from "@blueprintjs/core";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import $ from "jquery";
import YouTube from "@u-wave/react-youtube";

import logo from "../../styles/img/youtube.png";

const mobile = require("is-mobile");

export default class YoutubePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPlayer: {
        videoID: "",
        link: "",
        repeat: false,
        shuffle: false,
      },
      list: [],
      add: {
        show: false,
        link: "",
        progress: false,
      },
      dequeueConfirm: {
        show: false,
        progress: false,
        video: {
          id: "",
          info: {
            title: "",
            author_name: "",
            thumbnail_url: "",
          },
        },
      },
    };

    this.refHandlers = {
      toaster: (ref) => (this.toaster = ref),
    };
  }

  handleClose = () => {
    let { add } = this.state;
    add.show = false;
    this.setState({ ...this.state, add });
  };

  handleShow = () => {
    let { add } = this.state;
    add.show = true;
    this.setState({ ...this.state, add });
  };

  queueVideo = (e) => {
    e.preventDefault();

    let { add } = this.state;
    add.progress = true;
    this.setState({ ...this.state, add });

    let { list } = this.state;

    let { link } = add;
    let videoID =
      link.indexOf("watch?v=") !== -1
        ? link.split("watch?v=")[1]
        : link.split("/")[link.split("/").length - 1];

    if (this.videoExists(videoID)) {
      this.toaster.show({
        timeout: 5000,
        message: "Video already queued.",
        intent: "warning",
      });
    } else {
      let info = {};

      this.fetchVideoInfo(link, (data) => {
        info = data;

        list.push({
          id: videoID,
          info,
        });

        this.setState({ ...this.state, list }, () => {
          this.handleClose();

          if (this.state.list.length === 1) {
            this.setCurrentVideo(this.state.list[0]);
          }
        });
      });
    }

    add.progress = false;
    this.setState({ ...this.state, add });
  };

  onReadyEvent = (e) => {
    // e.target.setVolume(70);
    e.target.playVideo();
  };

  confirmDequeue = (video) => {
    let { dequeueConfirm } = this.state;
    dequeueConfirm.show = true;
    dequeueConfirm.video = video;
    this.setState({ ...this.state, dequeueConfirm });
  };

  dequeueVideo = () => {
    let { list, currentPlayer, dequeueConfirm } = this.state;
    const video = dequeueConfirm.video;

    const videoIndex = list.indexOf(video);

    if (currentPlayer.videoID === video.id) {
      if (list.length > 0) {
        let nextIndex =
          videoIndex + 1 > list.length
            ? list[videoIndex + 1]
            : list.indexOf(list[videoIndex - 1]) === -1
            ? null
            : list[videoIndex - 1];

        this.setCurrentVideo(nextIndex);
      } else {
        this.setCurrentVideo(null);
      }
    }

    list.splice(videoIndex, 1);

    dequeueConfirm.show = false;
    dequeueConfirm.progress = false;
    this.setState({ ...this.state, list, dequeueConfirm });
  };

  videoExists = (videoID) => {
    for (let video of this.state.list) {
      if (video.id === videoID) return true;
    }
    return false;
  };

  getVideoFromList = (videoID) => {
    for (let video of this.state.list) {
      if (video.id === videoID) return video;
    }
    return null;
  };

  fetchVideoInfo = (link, info) => {
    const API = `https://www.youtube.com/oembed?url=${link}&format=json`;

    $.ajax({
      method: "GET",
      url: API,
      success: (resp) => {
        info(resp);
      },
      error: (err) => {
        console.log(err);

        this.toaster.show({
          timeout: 5000,
          message: "Unable to add video.",
          intent: "danger",
        });
      },
    });
  };

  setCurrentVideo = (video) => {
    let { currentPlayer } = this.state;

    currentPlayer.videoID = video ? video.id : "";
    currentPlayer.link = video ? video.info.html : "";

    this.setState({ ...this.state, currentPlayer });
  };

  playNextVideo = () => {
    const { repeat, shuffle, videoID } = this.state.currentPlayer;
    let video = this.getVideoFromList(videoID);

    if (repeat) {
      this.setCurrentVideo(null);
      this.setCurrentVideo(video);
    } else if (shuffle) {
      if (this.state.list.length > 1) {
        const max = this.state.list.length;
        let video = { id: videoID };

        while (true) {
          let nextIndex = Math.floor(Math.random() * max);
          video = this.state.list[nextIndex];

          if (video.id !== videoID) {
            this.setCurrentVideo(video);
            break;
          }
        }
      }
    } else {
      let nextIndex =
        this.state.list.indexOf(this.getVideoFromList(videoID)) + 1;

      video = this.state.list[nextIndex] || this.state.list[0];
      this.setCurrentVideo(video);
    }
  };

  getVideoList = () => (
    <React.Fragment>
      {this.state.list.length === 0 ? (
        <div className="text-center p-3">
          <h6>Add video to the queue</h6>
        </div>
      ) : (
        this.state.list.map((video, index) => (
          <div key={index} className="queued-video mt-1 mb-1">
            <div
              className="video-info w-100 d-flex align-items-center justify-content-between h-100"
              onClick={() => this.setCurrentVideo(video)}
            >
              <div>
                <Image
                  className="video-thumbnail"
                  src={video.info.thumbnail_url}
                  width="100"
                  height="100"
                />
              </div>
              <div>
                <small>
                  <strong>
                    {this.state.currentPlayer.videoID === video.id ? (
                      <React.Fragment>
                        <Icon icon="play" intent="success" />{" "}
                      </React.Fragment>
                    ) : null}
                    {video.info.title}
                  </strong>
                  <br />
                  <span className="text-muted">{video.info.author_name}</span>
                </small>
              </div>
            </div>
            <div
              className="dequeue-video w-100 d-flex align-items-center justify-content-center h-100"
              onClick={() => this.confirmDequeue(video)}
            >
              Dequeue
            </div>
          </div>
        ))
      )}
    </React.Fragment>
  );

  getPlayer = () => {
    const { currentPlayer } = this.state;
    return (
      <React.Fragment>
        {currentPlayer.videoID ? (
          <div className="w-100 h-100">
            <div className="text-center">
              <Button
                intent={this.state.currentPlayer.repeat ? "success" : "primary"}
                className="m-1"
                icon="redo"
                onClick={() => {
                  let { currentPlayer } = this.state;
                  currentPlayer.repeat = !currentPlayer.repeat;
                  this.setState({ ...this.state, currentPlayer });
                }}
                disabled={this.state.currentPlayer.shuffle}
              >
                Repeat
              </Button>
              <Button
                intent={
                  this.state.currentPlayer.shuffle ? "success" : "primary"
                }
                className="m-1"
                icon="random"
                onClick={() => {
                  let { currentPlayer } = this.state;
                  currentPlayer.shuffle = !currentPlayer.shuffle;
                  this.setState({ ...this.state, currentPlayer });
                }}
                disabled={
                  this.state.list.length < 3 || this.state.currentPlayer.repeat
                }
              >
                Shuffle
              </Button>
              {this.state.list.length > 1 ? (
                <Button
                  intent="primary"
                  className="m-1"
                  rightIcon="arrow-right"
                  onClick={this.playNextVideo}
                  disabled={this.state.currentPlayer.repeat}
                >
                  Play Next
                </Button>
              ) : null}
            </div>
            <br />
            <YouTube
              id="youtube-iframe-player"
              className="youtube-iframe-player"
              video={currentPlayer.videoID}
              autoplay={true}
              // playsInline={true}
              onEnd={this.playNextVideo}
              onReady={this.onReadyEvent}
              onPlaying={(e) => {
                // console.log("on playing", e);
                e.target.playVideo();
              }}
            />
          </div>
        ) : (
          <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <h6>Add videos to queue and play</h6>
          </div>
        )}
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>YouTube Player | Random Apps</title>
          <meta
            name="description"
            content="Play youtube videos as a music player with instant playlist"
          />
          <meta
            name="keywords"
            content="random, quick, useful, apps, youtube, player, playlist, youtube player, youtube player playlist"
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
                    <span>YouTube Player</span>
                  </h4>
                </div>
                <small>
                  Instantly play YouTube videos as music player with playlist.
                </small>
                <br />
                <br />
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
              <div className="d-flex align-items-center justify-content-center">
                {/* EXPANDED HEIGHT AND WEIGHT CONTAINER */}
                <div className="h-100 w-100 text-center">
                  {mobile() ? (
                    <small className="text-center p-2 text-danger">
                      Autoplay is not enabled due to restriction of iOS and
                      Android web browsers.
                      <br />
                      <br />
                    </small>
                  ) : null}
                  <Row className="remove-row-gutter">
                    <Col className="video-player">{this.getPlayer()}</Col>
                    <Col sm={4} className="video-list">
                      <div className="text-center">
                        <Button
                          className="m-1"
                          intent="primary"
                          icon="add"
                          onClick={this.handleShow}
                        >
                          Add
                        </Button>
                        <Button
                          className="m-1"
                          intent="warning"
                          icon="reset"
                          onClick={() => {
                            this.setCurrentVideo(null);
                            this.setState({ ...this.state, list: [] });
                          }}
                          disabled={this.state.list.length === 0}
                        >
                          Clear
                        </Button>
                      </div>
                      <br />
                      {this.getVideoList()}
                    </Col>
                  </Row>
                  <br />
                  <small>
                    <small>
                      Using{" "}
                      <a
                        href="https://github.com/u-wave/react-youtube"
                        rel="noreferrer"
                        target="_blank"
                      >
                        react-youtube
                      </a>
                    </small>
                  </small>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </Fade>
          <Dialog
            isOpen={this.state.add.show}
            onClose={this.handleClose}
            onClosed={() => {
              let { add } = this.state;
              add.link = "";
              this.setState({ ...this.state, add });
            }}
          >
            <Form onSubmit={this.queueVideo}>
              <Container className="p-3">
                <div className="text-center">
                  <div className="w-100">
                    <h5>Queue Video</h5>
                  </div>
                  <br />
                  <FormGroup label="YouTube Link" labelFor="youtube-input-link">
                    <InputGroup
                      id="youtube-input-link"
                      type="url"
                      placeholder="Enter/Paste YouTube Link"
                      value={this.state.add.link}
                      onChange={(e) => {
                        let { add } = this.state;
                        add.link = e.target.value;
                        this.setState({ ...this.state, add });
                      }}
                      required
                    />
                  </FormGroup>
                </div>
              </Container>
              <div className="text-center" style={{ margin: "0 20px" }}>
                <Button
                  className="bp-3-btn-fill-mobile"
                  intent="success"
                  type="submit"
                  disabled={this.state.add.progress}
                >
                  {this.state.add.progress ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Queue"
                  )}
                </Button>
              </div>
            </Form>
          </Dialog>
          <Dialog
            isOpen={this.state.dequeueConfirm.show}
            onClose={() => {
              let { dequeueConfirm } = this.state;
              dequeueConfirm.show = false;
              this.setState({ ...this.state, dequeueConfirm });
            }}
          >
            <Container className="p-3">
              <div className="text-center">
                <h5>Dequeue This Video?</h5>
                <div className="w-100 d-flex align-items-center justify-content-between h-100 p-3">
                  <div>
                    <Image
                      className="video-thumbnail"
                      src={this.state.dequeueConfirm.video.info.thumbnail_url}
                      width="200"
                      height="150"
                    />
                  </div>
                  <div>
                    <h6>{this.state.dequeueConfirm.video.info.title}</h6>
                    <span className="text-muted">
                      {this.state.dequeueConfirm.video.info.author_name}
                    </span>
                  </div>
                </div>
              </div>
            </Container>
            <div className="text-center" style={{ margin: "0 20px" }}>
              <Button
                className="m-1"
                intent="danger"
                onClick={() => {
                  let { dequeueConfirm } = this.state;
                  dequeueConfirm.progress = true;
                  this.setState(
                    { ...this.state, dequeueConfirm },
                    this.dequeueVideo
                  );
                }}
                disabled={this.state.dequeueConfirm.progress}
              >
                {this.state.dequeueConfirm.progress ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Dequeue"
                )}
              </Button>
              <Button
                className="m-1"
                onClick={() => {
                  let { dequeueConfirm } = this.state;
                  dequeueConfirm.show = false;
                  this.setState({ ...this.state, dequeueConfirm });
                }}
                disabled={this.state.dequeueConfirm.progress}
              >
                No
              </Button>
            </div>
          </Dialog>
        </Container>
      </React.Fragment>
    );
  }
}
