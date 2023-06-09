import React from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter as Router } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
// import Loadable from "react-loadable";
// import Loading from "./src/orbital-templates/Material/_shared/Loading/Loading";
import store from './Store/reduxStore'
import { Provider } from 'react-redux'
import App from "./App";
// const App = Loadable({
//   loader: () => import(/* webpackChunkName: "App" */ "./src/App"),
//   loading: err => <Loading err={err} />
// });
const FireApp = props => {
  const MyApp = props => (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <Route
          path="/"
          render={routeProps => {
            return <Provider store={store}>
              <App {...props} {...routeProps} />
            </Provider>;
          }}
        />
      </Router>
    </MuiPickersUtilsProvider>
  );
  ReactDOM.render(<MyApp />, document.getElementById("root"));
};

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener(
      "deviceready",
      this.onDeviceReady.bind(this),
      false
    );
  },
  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    FireApp();
  }
};

app.onDeviceReady();
