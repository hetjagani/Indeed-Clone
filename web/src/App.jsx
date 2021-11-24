// Import packages
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import files
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Navbar from './pages/JobSeeker/Navbar';
import Search from './pages/JobSeeker/Search';
import FindCompany from './pages/companyReviews/FindCompany';
import Findsalary from './pages/salaries/Findsalary';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/nav">
            <Navbar />
            <Search />
          </Route>
          <Route path="/reviews">
            <Navbar />
            <FindCompany />
          </Route>
          <Route path="/salaries">
            <Navbar />
            <Findsalary />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
