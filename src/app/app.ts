///<reference path="../types/types.d.ts"/>

import React = require("react/addons");
import h = require("./utils/hyperscript");

import InfoBox = require("./components/info");

class App extends React.Component<any, any, any> {
  render() {
    return (
      h(InfoBox, {}, [])
    );
  }
}

React.render(
  h(App, {}, []),
  document.getElementById("content")
);
