import React, { Component } from 'react';
import '../style/components/app.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import TransactionIndex from '../scenes/TransactionIndex';
import Detail from '../components/Detail';
import PaginatedIndex from '../scenes/PaginatedIndex';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <React.Fragment>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/transactions" />}
            />
            <Switch>
              <Route path="/transactions" component={TransactionIndex} />
              <Route path="/transaction/:blockNumber" component={Detail} />
              <Route path="/paginated" component={PaginatedIndex} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
