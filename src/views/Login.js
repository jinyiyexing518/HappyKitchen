import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Input, Space, Alert } from "antd";
import { useState } from "react";
import Title from './Title'

export default function Login(props) {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [flag, setFlag] = useState(0);

  const verifyUser = () => {
    if (userName === "" && password === "") {
      setFlag(0);
    } else if (userName === "zhangchi" && password === "123456") {
      setFlag(1);
      //wait 1 second
      props.history.push("/Load");
      setTimeout(() => {
        props.history.push("/center");
      }, 500);
    } else {
      setFlag(2);
    }
  };

  return (
    <div>
      <Title text="登录页面" />

      <div>
        {/* 居中 */}
        {flag === 0 ? (
          <Alert
            message="请输入登录信息"
            type="warning"
            style={{ textAlign: "center", fontSize: "25px" }}
          />
        ) : (
          <span></span>
        )}
        {flag === 1 ? (
          <Alert message="登陆成功" type="success" />
        ) : (
          <span></span>
        )}
        {flag === 2 ? <Alert message="登陆失败" type="error" /> : <span></span>}
        <br />
      </div>

      <div>
        <div style={{marginLeft: "450px"}}>
          <span>账号 </span>
          <Input
            placeholder="User Name"
            style={{
              width: "200px",
            }}
            prefix={<UserOutlined />}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </div>
        <br />
        <div style={{marginLeft: "450px"}}>
          <span>密码 </span>
          <Space direction="horizontal">
            <Input.Password
              style={{
                width: "200px",
              }}
              placeholder="Password"
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {/* <Button style={{ width: 60 }} onClick={() => setPasswordVisible((prevState) => !prevState)}>
          {passwordVisible ? 'Hide' : 'Show'}
        </Button> */}
          </Space>
        </div>
        <br />
        <Button
          type="primary"
          size={"large"}
          onClick={() => {
            verifyUser();
            // props.event(userName, password);
            // set userName and password to cookie
            const expires = new Date();
            expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14);
            document.cookie = `userName=${userName};expires=${expires.toUTCString()}`;
            document.cookie = `password=${password};expires=${expires.toUTCString()}`;
            console.log(document.cookie);
          }}
          style={{
            background: "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            left: 0,
            right: 0
          }}
        >
          登录
        </Button>
      </div>
    </div>
  );
}
