/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import "@babel/polyfill";

// Import all the third party stuff
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import FontFaceObserver from "fontfaceobserver";
import history from "utils/history";

// Import root app
import App from "containers/App";

// Import Language Provider
import LanguageProvider from "containers/LanguageProvider";

// Load the favicon and the .htaccess file
import "!file-loader?name=[name].[ext]!../static/favicon.ico";
import "file-loader?name=.htaccess!./.htaccess"; // eslint-disable-line import/extensions
import { SWRConfig } from "swr";
import { Route, Switch } from "react-router-dom";
import { IconContext } from "react-icons";
import { isSafari } from "./utils/util";
import configureStore from "./configureStore";

// Import i18n messages
import { translationMessages } from "./i18n";
import { SURVEY_ROOT_PATH } from "./containers/survey/constants";
import SurveyPage from "./containers/survey/Loadable";
import NotFound from "./containers/NotFoundPage";

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver("Open Sans", {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add("fontLoaded");
});

// Create redux store with history
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById("app");

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              refreshInterval: 0,
              shouldRetryOnError: false,
              revalidateOnMount: false,
              errorRetryCount: 3,
              errorRetryInterval: 15000,
              focusThrottleInterval: 5000,
            }}
          >
            <IconContext.Provider value={{ size: "16px" }}>
              <Switch>
                <Route path={`${SURVEY_ROOT_PATH}`} component={SurveyPage} />
                <Route path="/not-found" component={NotFound} />
                <Route path="/" component={App} />
              </Switch>
            </IconContext.Provider>
          </SWRConfig>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["./i18n", "containers/App"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import("intl"));
  })
    .then(() =>
      Promise.all([
        import("intl/locale-data/jsonp/en.js"),
        import("intl/locale-data/jsonp/de.js"),
        import("intl/locale-data/jsonp/ja.js"),
      ]),
    ) // eslint-disable-line prettier/prettier
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if ("serviceWorker" in navigator && !isSafari) {
  /*
  navigator.serviceWorker
    .register('/static/socket.js')
    .then(function done(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function error(err) {
      console.log('Service worker registration failed, error:', err);
    });
  navigator.serviceWorker.addEventListener('message', event => {
    console.log(event.data);
  }); */
}

if (process.env.NODE_ENV === "production") {
  // require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
