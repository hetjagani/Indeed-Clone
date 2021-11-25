// Import packages
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import JobsMain from './pages/jobs/JobsMain';
import CompanyMain from './pages/companyReviews/CompanyMain';

// Config / other files
import withAuth from './utils/withAuth';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cmp/:id" component={withAuth(CompanyMain, 'any', true)} />
          <Route exact path="/" component={withAuth(JobsMain, 'any', true)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
