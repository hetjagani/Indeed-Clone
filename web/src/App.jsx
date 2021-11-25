// Import packages
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Navbar from './pages/JobSeeker/Navbar';
import Search from './pages/JobSeeker/Search';
import FindCompany from './pages/companyReviews/FindCompany';
import Findsalary from './pages/salaries/Findsalary';
import Jobs from './pages/jobs/Jobs';

// Config / other files
import withAuth from './utils/withAuth';
import CompanyProfile from './pages/reviews/CompanyProfile';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cmp/:id" component={withAuth(CompanyProfile, 'any', true)} />
          <Route path="/" component={withAuth(Jobs, 'any', true)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
