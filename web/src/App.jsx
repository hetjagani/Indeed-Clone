// Import packages
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import files
import Login from './auth/Login';
import Register from './auth/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
