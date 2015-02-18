///<reference path="../../types/types.d.ts"/>

import React = require("react/addons");

// Taken from
// https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/parse-tag.js
// https://github.com/mlmorg/react-hyperscript
var classIdSplit = /([\.#]?[a-zA-Z0-9_:-]+)/;
var notClassId = /^\.|#/;

function parseTag(tag, props) {
  if (!tag) {
    return "DIV";
  }

  var noId = !(props.hasOwnProperty("id"));

  var tagParts = tag.split(classIdSplit);
  var tagName = "";

  if (notClassId.test(tagParts[1])) {
    tagName = "DIV";
  }

  var classes, part, type, i;

  for (i = 0; i < tagParts.length; i++) {
    part = tagParts[i];

    if (!part) {
      continue;
    }

    type = part.charAt(0);

    if (!tagName) {
      tagName = part;
    } else if (type === ".") {
      classes = classes || [];
      classes.push(part.substring(1, part.length));
    } else if (type === "#" && noId) {
      props.id = part.substring(1, part.length);
    }
  }

  if (classes) {
    if (props.className) {
      classes.push(props.className);
    }

    props.className = classes.join(" ");
  }

  return props.namespace ? tagName : tagName; // Remove uppercase as it breaks defaultValue
}

function h(componentOrTag, properties, children): any {
  properties = properties || {};

  // If a child array or text node are passed as the second argument, shift them
  if (!children && isChildren(properties)) {
    children = properties;
    properties = {};
  }

  // When a selector, parse the tag name and fill out the properties object
  if (typeof componentOrTag === "string") {
    componentOrTag = parseTag(componentOrTag, properties);
  }

  // Create the element
  var args = [componentOrTag, properties].concat(children);
  return React.createElement.apply(React, args);
}

function isChildren(x) {
  return typeof x === "string" || Array.isArray(x);
}

export = h;
