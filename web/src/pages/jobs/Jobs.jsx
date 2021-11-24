import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import PopularSearches from './PopularSearches';
import Search from './Search';
import Footer from '../../components/Footer';
import JobFeed from './JobFeed';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Jobs() {
  const query = useQuery();
  const [searchFilter, setSearchFilter] = useState(null);

  useEffect(() => {
    const jobFilter = query.getAll('jobs');
    const locFilter = query.getAll('location');
    if (!jobFilter.length && !locFilter.length) {
      setSearchFilter(null);
      return;
    }
    setSearchFilter(...jobFilter, ...locFilter);
  }, [query]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}
    >
      {searchFilter ? (
        <>
          <Search advancedSearch />
          <hr className="separatingLine" />
          <JobFeed />
        </>
      ) : (
        <>
          <Search />
          <PopularSearches />
        </>
      )}
      <Footer />
    </div>
  );
}

export default Jobs;
