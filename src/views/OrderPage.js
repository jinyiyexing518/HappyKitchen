import React from "react";
import { Route } from "react-router-dom";
import Nowplaying from "./Nowplaying";
import Comingsoon from "./Comingsoon";
import Title from "./Title";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Affix } from "antd";

export default function OrderPage() {
  return (
    <div>
      <Affix offsetTop={10}>
        <Title text="菜单" />
      </Affix>

      <Switch>
        <Route path="/order/nowplaying" component={Nowplaying}></Route>
        <Route path="/order/comingsoon" component={Comingsoon}></Route>
        <Redirect from="/order" to="/order/nowplaying"></Redirect>
      </Switch>
    </div>
  );
}
