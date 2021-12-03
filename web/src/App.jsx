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
import Employeedetails from './pages/employee/Employeedetails';
import UserProfile from './pages/profile/UserProfile';
import Companydetails from './pages/employee/Companydetails';
import CompanyValues from './pages/employee/CompanyValues';
import Jobpost from './pages/employee/Jobpost';
import Jobdescription from './pages/employee/Jobdescription';
import EmployersMain from './pages/employers/EmployersMain';
import EmployeeDashboard from './pages/employers/EmployeeDashboard';
import FindCompanyMainAdmin from './pages/admin/FindCompanyMainAdmin';

// Config / other files
import withAuth from './utils/withAuth';
import CompanyReviewsAdmin from './pages/admin/CompanyReviewsAdmin';

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
          <Route path="/profile" component={withAuth(UserProfile, 'any', true)} />
          <Route path="/admin/reviews/:id" component={withAuth(CompanyReviewsAdmin, 'any', false)} />
          <Route path="/admin/reviews" component={withAuth(FindCompanyMainAdmin, 'any', false)} />
          <Route path="/employee/company" component={withAuth(Companydetails, 'any', false)} />
          <Route path="/employee/companyValues" component={withAuth(CompanyValues, 'any', true)} />
          <Route path="/employee/dashboard" component={withAuth(EmployeeDashboard, 'any', false)} />
          <Route path="/employee" component={withAuth(Employeedetails, 'any', false)} />
          <Route path="/jobpost" component={withAuth(Jobpost, 'any', true)} />
          <Route path="/jobDescription" component={withAuth(Jobdescription, 'any', true)} />
          <Route path="/hire" component={withAuth(EmployersMain, 'any', false)} />
          <Route exact path="/" component={withAuth(JobsMain, 'any', true)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
