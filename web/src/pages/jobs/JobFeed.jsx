/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import JobDetails from './JobDetails';

import './css/JobDetails.css';

function JobFeed({ jobs }) {
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
      <div style={{ width: '75%' }}>
        {jobs.map((job, index) => (
          <div id={index} onClick={() => setSelectedJobDetails(job)} style={{ marginTop: '15px' }}>
            <JobCard job={job} selectedJobFlag={selectedJobDetails === job} />
          </div>
        ))}
      </div>
      <div style={{ marginLeft: '25px', width: '100%' }}>
        <JobDetails job={selectedJobDetails} />
      </div>
    </div>
  );
}

export default JobFeed;
