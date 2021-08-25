// Phoenix code starts here
// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss";

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html";
import { Socket } from "phoenix";
import topbar from "topbar";
import { LiveSocket } from "phoenix_live_view";

let csrfToken = document
  .querySelector("meta[name='csrf-token']")
  .getAttribute("content");
let liveSocket = new LiveSocket("/live", Socket, {
  params: { _csrf_token: csrfToken },
});

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
window.addEventListener("phx:page-loading-start", (info) => topbar.show());
window.addEventListener("phx:page-loading-stop", (info) => topbar.hide());

// connect if there are any LiveViews on the page
liveSocket.connect();

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket;

// Phoenix code ends here

// React code starts here

import * as React from "react";
import * as ReactDOM from "react-dom";
import Routes from "./routes/Routes";
import AuthContextProvider from "./contexts/AuthContext";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    type: "light",
    // primary: {
    //   main: "#1562E0",
    //   light: "#4193EA",
    // },
    // secondary: {
    //   main: "#A9DE52",
    // },
    // // error: {},
    // // warning: {},
    // info: {
    //   main: "#A8C1D3",
    // },
    // // success: {},
    // text: {
    //   primary: "#000",
    //   secondary: "#000",
    // },
    // background: {
    //   paper: "#fff",
    //   default: "#E1EEF7",
    // },
  },
});

// if (theme.palette.type === "light") {
//   theme.palette.action.active = "#fff";
// } else {
//   theme.palette.action.active = "#000";
// }

ReactDOM.render(
  <AuthContextProvider csrfToken={csrfToken}>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
