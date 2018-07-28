import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "mobx-react";
import injectTapEventPlugin from "react-tap-event-plugin";

import "./index.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

injectTapEventPlugin();

const Root = () => (
  <Provider>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
registerServiceWorker();
