import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import HomePage from "../views/HomePage";
import OrderPage from "../views/OrderPage";
import Center from "../views/Center";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import NotFound from "../views/NotFound";
import Detail from "../views/Detail";
import Login from "../views/Login";
import Load from "../views/Load";
import { Affix } from "antd";

// function isAuth(){
//     return localStorage.getItem("token")
// }

function isAuth() {
  if (
    document.cookie === undefined ||
    document.cookie === null ||
    document.cookie === "" ||
    document.cookie.split(";").length < 2
  ) {
    return false;
  }
  let userName = document.cookie.split(";")[0].split("=")[1];
  let password = document.cookie.split(";")[1].split("=")[1];
  if (userName === "zhangchi" && password === "123456") {
    return true;
  } else {
    return false;
  }
}

export default class IndexRouter extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
    };
  }

  render() {
    return (
      <HashRouter>
        {/* 插槽 */}
        <Affix offsetTop={10}>{this.props.children}</Affix>
        <Switch>
          <Route path="/home" component={HomePage}></Route>
          <Route path="/order" component={OrderPage}></Route>

          {/* <Route path="/center" component={Center}></Route> */}
          <Route path="/login" component={Login}></Route>
          <Route path="/load" component={Load}></Route>
          {/* 路由拦截 */}
          <Route
            path="/center"
            render={() => {
              return isAuth() ? <Center /> : <Redirect to="/login" />;
            }}
          ></Route>

          {/* 1.动态路由 */}
          <Route path="/detail/:myid" component={Detail}></Route>
          {/* 2.query方式 */}
          {/* <Route path="/detail" component={Detail}></Route> */}

          {/* 模糊匹配 */}
          {/* <Redirect from="/" to="/films" /> */}
          {/* 精确匹配 */}
          <Redirect from="/" to="/home" exact />
          <Route component={NotFound}></Route>
        </Switch>
      </HashRouter>
    );
  }
}
