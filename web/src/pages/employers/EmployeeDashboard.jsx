import React, { useState } from 'react';
import EmployerDashboardNav from './components/EmployerDashboardNav';
import EmployerNav from './components/EmployerNav';

import EmployeeJobs from './components/EmployeeJobs';

function EmployeeDashboard() {
  const [showComponent, setShowComponent] = useState(0);
  return (
    <div>
      <EmployerNav />
      <EmployerDashboardNav setShowComponent={setShowComponent} />
      {showComponent === 2 ? <EmployeeJobs /> : null}
    </div>
  );
}

export default EmployeeDashboard;
