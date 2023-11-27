import React from "react";
import { Spin } from "antd";

export default function Load() {
  return (
    <div>
      {/* 设置组件上下左右居中 */}
      <div style={{ textAlign: "center", marginTop: "500px" }}>
        <h1>加载中</h1>
        <Spin size="large"  tip="Loading..."/>
      </div>
    </div>
  );
}
