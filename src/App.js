import React, { Fragment } from "react"
import { Router, Route, Switch } from 'react-router-dom';

import Gallery from "./components/Gallery"

import history from "./history"

class App extends React.Component {
  render() {
    return(
        <Fragment>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={Gallery} />
            </Switch>
          </Router>
        </Fragment>
    )
  }
}

export default App