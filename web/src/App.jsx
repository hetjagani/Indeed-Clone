// Import packages
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import files
import Login from './auth/Login';
import Register from './auth/Register';
import Navbar from './JobSeeker/Navbar';
import Search from './JobSeeker/Search';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/nav">
          <Navbar />
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
