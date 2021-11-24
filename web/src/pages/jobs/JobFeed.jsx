import React from 'react';

function JobFeed() {
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
    >
      <div style={{ width: '100%' }}>Jobs</div>
      <div style={{ width: '100%' }}>JobDetails</div>
    </div>
  );
}

export default JobFeed;
