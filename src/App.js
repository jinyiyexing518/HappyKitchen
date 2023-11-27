import React, { Component } from "react";
import IndexRouter from "./router/IndexRouter";
import Tabbar from "./components/Tabbar";

export default class App extends Component {
  render() {
    return (
      <div>
        <IndexRouter>
          <React.StrictMode>
            <Tabbar></Tabbar>
          </React.StrictMode>
        </IndexRouter>
      </div>
    );
  }
}

// films ===> Films
// cinemas ===> Cinemas
// center ===> Center
