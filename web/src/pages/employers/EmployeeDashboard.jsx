import React, { useState } from 'react';
import EmployerDashboardNav from './components/EmployerDashboardNav';
import EmployerNav from './components/EmployerNav';
import EmployeeJobs from './components/EmployeeJobs';
import EmployersReview from './components/EmployersReview';
import ApplicantsFeed from './ApplicantsFeed';

function EmployeeDashboard() {
  const [showComponent, setShowComponent] = useState(0);
  return (
    <div>
      <EmployerNav />
      <EmployerDashboardNav setShowComponent={setShowComponent} />
      {showComponent === 3 ? <ApplicantsFeed /> : null}
      {showComponent === 2 ? <EmployeeJobs /> : null}
      {showComponent === 1 ? <EmployersReview /> : null}
    </div>
  );
}

export default EmployeeDashboard;
