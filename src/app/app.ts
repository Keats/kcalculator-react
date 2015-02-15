///<reference path="../types/types.d.ts"/>

import React = require("react");

var message = "Hello world!";

React.render(React.jsx(`
    <div>
        <span>{message}</span>
    </div>
`), document.body);

