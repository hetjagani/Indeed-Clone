/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
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
  const [selectedJob, setSelectedJob] = useState(null);
  const [totalNumberOfJobs, setTotalNumberOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getJobs = async () => {
    const params = { page: currentPage, limit: 10 };
    const companyId = user.company._id;
    const response = await getJobByCompanyID(companyId, params);
    if (!response) {
      return;
    }
    setJobs(response.data.nodes);
    setTotalNumberOfJobs(response.data.total);
    setTotalPages(Math.ceil(response.data.total / 10));
  };
  useEffect(() => {
    getJobs();
  }, []);
  useEffect(() => {
    if (jobs.length) {
      setSelectedJob(jobs[0]);
      setSelectedApplication(jobs[0].applications);
    }
  }, [jobs]);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div
          style={{
            width: '40%',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {jobs ? jobs.length > 0
            ? (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            ) : null : null}

          {jobs
            ? jobs.length > 0
              ? jobs.map((job) => (
                <div
                  onClick={() => {
                    setSelectedApplication(job.applications);
                    setSelectedJob(job);
                  }}
                >
                  <Applicants
                    option={job}
                    selectedJobFlag={selectedJob === job}
                  />
                </div>
              ))
              : null
            : null}
        </div>
        <div style={{ width: '60%', marginRight: '1rem' }}>
          <ApplicantsDetails
            details={selectedApplication}
            companyId={user.company._id}
            getJobs={getJobs}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {Array.range(1, totalPages + 1).map((pageNo) => (
          <p
            onClick={() => setCurrentPage(pageNo)}
            style={{
              cursor: 'pointer',
              backgroundColor: `${
                currentPage === pageNo ? '#595959' : '#E4E2E0'
              }`,
              padding: '17px',
              paddingLeft: '20px',
              paddingRight: '20px',
              color: `${currentPage === pageNo ? '#fff' : '#000'}`,
              fontWeight: 'bolder',
              fontSize: '18px',
              marginLeft: '20px',
            }}
          >
            {pageNo}
          </p>
        ))}
      </div>
    </>
  );
}

export default ApplicantsFeed;
