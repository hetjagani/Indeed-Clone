import React from 'react';

import PopularSearches from './PopularSearches';
import Search from './Search';
import Footer from '../../components/Footer';

function Jobs() {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '85vh' }}
    >
      <Search />
      <PopularSearches />
      <Footer />
    </div>
  );
}

export default Jobs;
