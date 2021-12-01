// Import packages
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Import components
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import JobsMain from './pages/jobs/JobsMain';
import CompanyMain from './pages/companyReviews/CompanyMain';
import FindCompany from './pages/companyReviews/FindCompany';
import FindSalary from './pages/salaries/Findsalary';
import Salary from './pages/salaries/Salary';
import Employeedetails from './pages/employee/Employeedetails';
import Companydetails from './pages/employee/Companydetails';
import CompanyValues from './pages/employee/CompanyValues';
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
          <Route path="/reviews" component={withAuth(FindCompany, 'any', true)} />
          <Route path="/salaries" component={withAuth(FindSalary, 'any', true)} />
          <Route exact path="/" component={withAuth(JobsMain, 'any', true)} />
          {/* <Route path="/cmp/:id" component={withAuth(CompanyProfile, 'any', true)} /> */}
          <Route path="/salary" component={withAuth(Salary, 'any', true)} />
          <Route path="/employee" component={withAuth(Employeedetails, 'any', true)} />
          <Route path="/employee/company" component={withAuth(Companydetails, 'any', true)} />
          <Route path="/employee/companyValues" component={withAuth(CompanyValues, 'any', true)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
