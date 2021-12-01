/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import JobDetails from './JobDetails';

import './css/JobDetails.css';

function JobFeed({
  jobs, totalNumberOfJobs, totalPages, currentPage,
}) {
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);

  useEffect(() => {
    if (jobs.length) { setSelectedJobDetails(jobs[0]); }
  }, [jobs]);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1400px',
        justifyContent: 'center',
        margin: '0 auto',
        marginTop: '10px',
        paddingLeft: '1rem',
        paddingRight: '1rem',
      }}
      className="wrapper"
    >
      {jobs ? jobs.length > 0
        ? (
          <>
            <div style={{ width: '75%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginRight: '10px' }}>
                <p style={{ fontSize: '15px', fontWeight: 'lighter' }}>
                  Showing
                  {' '}
                  {jobs.length}
                  {' '}
                  results of
                  {' '}
                  {totalNumberOfJobs}
                </p>
                <p style={{ fontSize: '15px', fontWeight: 'lighter' }}>
                  Page
                  {' '}
                  <span style={{ fontWeight: 'bold' }}>{currentPage}</span>
                  {' '}
                  of
                  {' '}
                  {totalPages}
                </p>
              </div>

              {jobs.map((job, index) => (
                <div id={index} onClick={() => setSelectedJobDetails(job)} style={{ marginTop: '15px' }}>
                  <JobCard job={job} selectedJobFlag={selectedJobDetails === job} />
                </div>
              ))}
            </div>
            <div style={{ marginLeft: '25px', width: '100%', maxWidth: '800px' }}>
              <JobDetails job={selectedJobDetails} />
            </div>
          </>
        ) : <p>The search did not match any jobs</p> : null}
    </div>
  );
}

export default JobFeed;
