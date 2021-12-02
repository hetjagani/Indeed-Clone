/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable prefer-destructuring */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import PopularSearches from './PopularSearches';
import Search from './Search';
import Footer from '../../components/Footer';
import JobFeed from './JobFeed';
import getJobs from '../../api/jobs/get';

import checkProperties from '../../utils/checkObjectProperties';

Array.range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function JobsMain() {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();

  const [searchFilter, setSearchFilter] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [totalNumberOfJobs, setTotalNumberOfJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getPaginatedJobs = async () => {
    const queryParams = { page: currentPage, limit: 10 };
    const locFilter = query.getAll('location');
    const qFilter = query.getAll('jobs');
    const sinceFilter = query.getAll('since');
    if (typeof locFilter === 'string') {
      queryParams.city = locFilter;
    } else if (locFilter.length) {
      queryParams.city = locFilter[0].split(',')[0];
    }
    if (qFilter.length) {
      queryParams.q = qFilter[0];
    }
    if (sinceFilter.length) {
      queryParams.since = sinceFilter[0];
    }
    if (queryParams.city === 'Any location') {
      queryParams.city = null;
    }
    checkProperties(queryParams);
    const response = await getJobs(queryParams);
    if (!response) {
      return;
    }
    setJobs(response.data.nodes);
    setTotalNumberOfJobs(response.data.total);
    setTotalPages(Math.ceil(response.data.total / 10));
  };

  useEffect(() => {
    getPaginatedJobs();
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    const jobFilter = query.getAll('jobs');
    const locFilter = query.getAll('location');
    const sinceFilter = query.getAll('since');
    if (!jobFilter.length && !locFilter.length && !sinceFilter.length) {
      setSearchFilter(null);
      return;
    }
    setSearchFilter(true);
    if (location.search && location.search.length > 0) {
      getPaginatedJobs();
    }
  }, [history.location]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '85vh',
        marginTop: '30px',
      }}
    >
      {searchFilter ? (
        <>
          <Search advancedSearch />
          <hr className="separatingLine" />
          <JobFeed
            jobs={jobs}
            totalNumberOfJobs={totalNumberOfJobs}
            currentPage={currentPage}
            totalPages={totalPages}
          />
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
      ) : (
        <>
          <Search />
          <PopularSearches />
        </>
      )}
      <hr
        className="separatingLine"
        style={{ margin: '30px 0 20px 0', bottom: '-30px' }}
      />
      <Footer />
    </div>
  );
}

export default JobsMain;
