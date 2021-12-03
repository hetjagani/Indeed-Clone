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
import EmployersMain from './pages/employers/EmployersMain';
import EmployeeDashboard from './pages/employers/EmployeeDashboard';
import FindCompanyMainAdmin from './pages/admin/FindCompanyMainAdmin';

// Config / other files
import withAuth from './utils/withAuth';
import EmployeeChat from './pages/chat/EmployeeChat';
import UserChat from './pages/chat/Userchat';
import CompanyReviewsAdmin from './pages/admin/CompanyReviewsAdmin';
import ReviewsPage from './pages/users/ReviewsPage';
import ApplicationsPage from './pages/users/ApplicationsPage';

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/cmp/:id" component={withAuth(CompanyMain, 'user', true)} />
          <Route path="/reviews" component={withAuth(FindCompany, 'any', true)} />
          <Route path="/salaries" component={withAuth(FindSalary, 'any', true)} />
          <Route path="/employee/messages" component={withAuth(EmployeeChat, 'employer', false)} />
          <Route path="/messages" component={withAuth(UserChat, 'user', true)} />
          <Route path="/profile" component={withAuth(UserProfile, 'user', true)} />
          <Route path="/admin/reviews/:id" component={withAuth(CompanyReviewsAdmin, 'admin', false)} />
          <Route path="/admin/reviews" component={withAuth(FindCompanyMainAdmin, 'admin', false)} />
          <Route path="/employee/company" component={withAuth(Companydetails, 'employer', false)} />
          <Route path="/employee/companyValues" component={withAuth(CompanyValues, 'employer', true)} />
          <Route path="/employee/dashboard" component={withAuth(EmployeeDashboard, 'employer', false)} />
          <Route path="/employee" component={withAuth(Employeedetails, 'employer', false)} />
          <Route path="/hire" component={withAuth(EmployersMain, 'any', false)} />
          <Route path="/users/reviews" component={withAuth(ReviewsPage, 'user', true)} />
          <Route path="/users/applications" component={withAuth(ApplicationsPage, 'user', true)} />
          <Route exact path="/" component={withAuth(JobsMain, 'any', true)} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
