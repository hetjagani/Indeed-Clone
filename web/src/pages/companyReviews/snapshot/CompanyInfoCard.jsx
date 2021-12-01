import React from 'react';

function CompanyInfoCard({ title, subtitle }) {
  return (
    <div
      style={{
        // height: '100px',
        width: '125px',
        backgroundColor: 'white',
        border: '1px solid rgb(212, 210, 208)',
        fontSize: '0.875rem',
        borderRadius: '0.5rem',
        maxHeight: '300px',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: '12px',
      }}
      >
        <p style={{ fontWeight: 'bold', fontSize: 'small' }}>{title}</p>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}

export default CompanyInfoCard;
