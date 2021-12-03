/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import { Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import getJobByCompanyID from '../../../api/jobs/getJobByCompanyID';
import getEmployerByID from '../../../api/employer/get';
import { compamny } from '../../../app/actions';
import Button from '../../../components/Button';
import AddJobModal from './AddJobModal';

Array.range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

function EmployeeJobs() {
  const [jobs, setJobs] = useState([]);
  const [totalNumberOfJobs, setTotalNumberOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const getCompanyJobs = async (id = user.company._id) => {
    const params = { page: currentPage, limit: 10 };
    const response = await getJobByCompanyID(id, params);
    if (!response) return;
    setJobs(response.data.nodes);
    setTotalNumberOfJobs(response.data.total);
    setTotalPages(Math.ceil(response.data.total / 10));
  };

  const getEmployerDetails = async () => {
    const response = await getEmployerByID(user.user.id);
    if (!response) {
      toast.error('Employer not found. Please login as employer!');
      return;
    }
    dispatch(compamny(response.data.company[0]));
    getCompanyJobs(response.data.company[0]._id);
  };

  console.log(jobs);

  useEffect(() => {
    if (!user.company._id) {
      getEmployerDetails();
    } else {
      getCompanyJobs();
    }
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <>
      <AddJobModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        getCompanyJobs={getCompanyJobs}
        isOpen={isOpen}
      />
      <div
        style={{
          backgroundColor: '#F3F2F1',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
        }}
      >
        <Button
          onClick={handleOpen}
          style={{
            height: '50px',
            width: '200px',
            marginTop: '5px',
            marginBottom: '10px',
          }}
          label="Post a job"
        />
        {jobs ? (
          jobs.length > 0 ? (
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
          ) : null
        ) : null}
        {jobs
          ? jobs.length > 0
            ? jobs.map((job) => (
              <Card
                variant="outlined"
                className="jobCardHover"
                sx={{ borderRadius: '12px', marginTop: '10px' }}
              >
                <CardContent>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <p
                        style={{
                          fontWeight: 'bold',
                          fontSize: '16px',
                          color: '#2557a7',
                        }}
                      >
                        {job.title}
                      </p>
                      <p style={{ fontSize: '14px', marginTop: '-10px' }}>
                        {job.type === 'internship'
                          ? 'Internship'
                          : job.type === 'full_time'
                            ? 'Full Time'
                            : 'Contract'}
                        {' '}
                        -
                        {' '}
                        {job.jobLocation === 'remote' ? 'Remote' : 'In Person'}
                      </p>
                    </div>
                    <div
                      style={{ display: 'flex', flexDirection: 'column', marginRight: '10px' }}
                    >
                      <span style={{ fontWeight: 'bold' }}>
                        Total applicants:
                        {' '}
                        {job.applications && job.applications.length ? job.applications.length : 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
            : null
          : null}
      </div>
      {jobs ? (
        jobs.length > 0 ? (
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
          >
            {Array.range(1, totalPages + 1).map((pageNo) => (
              <p
                onClick={() => setCurrentPage(pageNo)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: `${currentPage === pageNo ? '#595959' : '#E4E2E0'}`,
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
        ) : (
          <p style={{ marginLeft: '25px', marginTop: '20px' }}>No jobs posted yet...</p>
        )
      ) : null}
    </>
  );
}

export default EmployeeJobs;
