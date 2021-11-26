import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import PopularSearches from './PopularSearches';
import Search from './Search';
import Footer from '../../components/Footer';
import JobFeed from './JobFeed';
import getJobs from '../../api/jobs/get';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function JobsMain() {
  const query = useQuery();
  const history = useHistory();
  const location = useLocation();

  const [searchFilter, setSearchFilter] = useState(null);
  const [jobs, setJobs] = useState([]);

  const getPaginatedJobs = async () => {
    const queryParams = { page: 1, limit: 10 };
    const locFilter = query.getAll('location');
    if (locFilter.length) {
      // eslint-disable-next-line prefer-destructuring
      queryParams.city = locFilter[0];
    }
    const response = await getJobs(queryParams);
    if (!response) {
      return;
    }
    setJobs(response.data.nodes);
  };

  useEffect(() => {
    const jobFilter = query.getAll('jobs');
    const locFilter = query.getAll('location');
    if (!jobFilter.length && !locFilter.length) {
      setSearchFilter(null);
      return;
    }
    setSearchFilter(true);
    if (location.search && location.search.length > 0) { getPaginatedJobs(); }
  }, [history.location]);

  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', minHeight: '85vh', marginTop: '30px',
      }}
    >
      {searchFilter ? (
        <>
          <Search advancedSearch />
          <hr className="separatingLine" />
          <JobFeed jobs={jobs} />
        </>
      ) : (
        <>
          <Search />
          <PopularSearches />
        </>
      )}
      <hr className="separatingLine" style={{ margin: '30px 0 20px 0', bottom: '-30px' }} />
      <Footer />
    </div>
  );
}

export default JobsMain;
