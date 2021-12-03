/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Applicants from './Applicants';
import ApplicantsDetails from './ApplicantsDetails';
import getJobByCompanyID from '../../api/jobs/getJobByCompanyID';

function ApplicantsFeed() {
  const user = useSelector((state) => state.user);
  const [jobs, setJobs] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState([]);
  const getJobs = async () => {
    const companyId = user.company._id;
    const response = await getJobByCompanyID(companyId);
    if (!response) {
      return;
    }
    setJobs(response.data.nodes);
  };
  useEffect(() => {
    getJobs();
  }, []);
  useEffect(() => {
    if (jobs.length) {
      setSelectedApplication(jobs[0].applications);
    }
  }, [jobs]);
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div
        style={{
          width: '40%',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {jobs
          ? jobs.length > 0
            ? jobs.map((job) => (
              <div onClick={() => setSelectedApplication(job.applications)}>
                <Applicants option={job} />
              </div>
            ))
            : null
          : null}
      </div>
      <div style={{ width: '60%', marginRight: '1rem' }}>
        <ApplicantsDetails details={selectedApplication} />
      </div>
    </div>
  );
}

export default ApplicantsFeed;
