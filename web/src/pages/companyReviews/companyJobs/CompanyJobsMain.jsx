/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Card, CardContent, Paper,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Markup } from 'interweave';
import Button from '../../../components/Button';
import CompanyJobCard from './CompanyJobCard';
import getJobByCompanyID from '../../../api/jobs/getJobByCompanyID';

const edjsHTML = require('editorjs-html');

const edjsParser = edjsHTML();

Array.range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

function CompanyJobsMain({ match }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [totalNumberOfJobs, setTotalNumberOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getCompanyJobs = async () => {
    const params = { page: currentPage, limit: 10 };
    const response = await getJobByCompanyID(match.params.id, params);
    if (!response) return;
    setJobs(response.data.nodes);
    setTotalNumberOfJobs(response.data.total);
    setTotalPages(Math.ceil(response.data.total / 10));
  };

  useEffect(() => {
    if (jobs.length) { setSelectedJobDetails(jobs[0]); }
  }, [jobs]);

  useEffect(() => {
    getCompanyJobs();
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, [currentPage]);

  let html = '';
  if (selectedJobDetails && selectedJobDetails.description) {
    try {
      html = edjsParser.parse(selectedJobDetails.description);
    } catch (err) {
      // console.log('');
      html = null;
    }
  }

  return (
    <>
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
          {jobs ? jobs.length > 0 ? jobs.map((job, index) => (
            <div id={index} onClick={() => setSelectedJobDetails(job)} style={{ marginTop: '15px' }}>
              <CompanyJobCard job={job} selectedJobFlag={selectedJobDetails === job} />
            </div>
          ))
            : null : null}
        </div>

        <div style={{ marginLeft: '25px', width: '100%' }}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: '12px', position: 'sticky', top: '100px', margin: 0, marginTop: '15px',
            }}
          >
            <Paper elevation={3}>
              <CardContent>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <p
                    id="jobTitle"
                    style={{
                      fontSize: 'large',
                      fontWeight: 'bold',
                    }}
                  >
                    {selectedJobDetails ? selectedJobDetails.title : ''}
                  </p>
                  <CloseIcon fontSize="10px" />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginLeft: '-2px',
                    marginTop: '-25px',
                    fontSize: '14px',
                  }}
                >
                  <p>
                    {selectedJobDetails ? selectedJobDetails.company.name : ''}
                    {' '}
                    -
                    {' '}
                    {selectedJobDetails ? selectedJobDetails.city : ''}
                    {' '}
                    {selectedJobDetails ? selectedJobDetails.state : ''}
                  </p>
                </div>
                <Button label="Apply now" style={{ width: '140px', borderRadius: '20px' }} />
              </CardContent>
            </Paper>
            <div style={{ maxHeight: '75vh', overflow: 'auto' }}>

              <hr style={{
                borderTop: '1px solid #faf9f9', display: 'flex', justifyContent: 'center',
              }}
              />
              <div style={{ marginLeft: '20px', marginRight: '20px' }}>
                {html ? html.length > 0 ? html.map((ele) => <Markup content={ele} />) : null : null}
              </div>
            </div>
          </Card>
        </div>
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
        ) : null
      ) : null}

    </>
  );
}

export default CompanyJobsMain;
