import React, { Component } from "react";
import "../components/Title.css";
import "../components/home.css";
import { Image, Watermark } from "antd";
import HomeCarousel from "../components/homeCarousel";
import logo from "../img/background.jpg";
import "../components/img.css";
import Title from "./Title";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <div>
          <Title text="开心厨房" />
        </div>

        <div>
          <HomeCarousel></HomeCarousel>
        </div>

        <Watermark content={["开心厨房", "Happy Kitchen"]}>
          <div style={{ height: 950, zIndex: -1 }} />
        </Watermark>

        <div
          style={{
            height: "650px",
            width: "800px",
            position: "absolute",
            margin: "auto",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <Image
            alt="logo"
            width={200}
            src={logo}
            style={{
              height: "650px",
              width: "800px",
            }}
          />
        </div>
      </div>
    );
  }
}
