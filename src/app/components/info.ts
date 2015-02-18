///<reference path="../../types/types.d.ts"/>

import React = require("react/addons");
import h = require("./../utils/hyperscript");
import _ = require("lodash");

class InfoForm extends React.Component<IInfoForm.Props, IInfoForm.State, any> {
  static defaultProps = {
    activityLevels: [
      {key: 1, value: 1.2, name: "Sedentary"},
      {key: 2, value: 1.375, name: "Lightly active"},
      {key: 3, value: 1.55, name: "Moderately active"},
      {key: 4, value: 1.725, name: "Very active"},
      {key: 5, value: 1.9, name: "Extra active"},
    ],
    imperialHeightRegex: /^[3-7]'([0-9]|(1[0-1]))?$/
  };

  state = {
    info: {
      activityLevel: 1.375,
      age: 26,
      sex: "male",
      weight: 78,
      height: "180",
      units: "metrics"
    }
  };

  _onChange(name: string, event) {
    // Ugly hack while I figure why the .d.ts refers to the first param
    // as of type State while i can be a simple object really
    var cloned = _.clone(this.state);
    var value = event.target.value;
    cloned.info[name] = value;
    var numberAttributes = ["activityLevel", "age", "weight"];
    if (cloned.info.units === "metrics") {
      numberAttributes.push("height");
    }
    // Some of the attributes are numbers
    if (numberAttributes.indexOf(name) > -1) {
      cloned.info[name] = parseFloat(value);
    }
    this.setState(cloned);
  }

  render() {
    var activityChoices = this.props.activityLevels.map((choice) => {
      return h("option", {key: choice.key, value: choice.value}, choice.name);
    });
    console.log(this.state.info);
    // onchange binds the key of the object so simulate a two way binding
    return (
      h("div.info-form", {}, [
        h("form", {}, [
          h("div.first-line", {}, [
            "I am a ",
            h("select", {
              value: this.state.info.activityLevel,
              onChange: this._onChange.bind(this, "activityLevel")
            }, activityChoices),
            h("input", {
              type: "number",
              defaultValue: this.state.info.age,
              onChange: this._onChange.bind(this, "age")
            }, []),
            " years old ",
            h("select", {value: this.state.info.sex, onChange: this._onChange.bind(this, "sex")}, [
              h("option", {value: "male"}, "man"),
              h("option", {value: "female"}, "woman")
            ]),
            " using ",
            h("select", {defaultValue: this.state.info.units, onChange: this._onChange.bind(this, "units")}, [
              h("option", {value: "metrics"}, "metrics"),
              h("option", {value: "imperial"}, "imperial")
            ]),
            " units"
          ]),
          h("div.second-line", {}, [
            "I weight ",
            h("input", {
              type: "number",
              defaultValue: this.state.info.weight,
              onChange: this._onChange.bind(this, "weight")
            }, []),
            this.state.info.units === "metrics" ? "kg" : "lbs",
            " and I am ",
            h("input", {
              type: this.state.info.units === "metrics" ? "number" : "text",
              defaultValue: this.state.info.height,
              onChange: this._onChange.bind(this, "height")
            }, []),
            this.state.info.units === "metrics" ? "cm" : "",
            " tall"
          ]),
          h("div.third-line", {}, [
            "My goal is "
          ])
        ])
      ])
    );
  }
}

module IInfoForm {
  interface ActivityLevel {
    key: number;
    value: number;
    name: string;
  }

  interface InfoData {
    activityLevel?: number;
    age?: number;
    sex?: string;
    weight?: number;
    height?: string;
    units?: string;
  }

  export interface Props {
    activityLevels: Array<ActivityLevel>;
    imperialHeightRegex: RegExp;
  }

  export interface State {
    info: InfoData;
  }
}

class InfoBox extends React.Component<any, any, any> {
  render() {
    return (
      h("div.info-box", {}, [
        h(InfoForm, {}, []),
      ])
    );
  }
}

export = InfoBox;
