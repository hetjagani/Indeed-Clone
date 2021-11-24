import React, { useEffect, useState } from 'react';
import getCompanyDetails from '../../api/reviews/getCompanyDetails';
import './css/CompanyProfile.css';

function CompanyProfile({ match }) {
  const [companyDetails, setCompanyDetails] = useState({});
  const updateDetails = async () => {
    const companyData = await getCompanyDetails(match.params.id);
    if (!companyData) return;
    setCompanyDetails(companyData);
  };

  console.log(companyDetails);

  useEffect(() => {
    updateDetails();
  }, []);

  return (
    <div>
      <div style={{ marginTop: '0px' }}>
        <img
          className="company-image"
          src="https://ubereats-media.s3.amazonaws.com/1619644672652.jpeg"
          alt="sample"
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '900px',
          justifyContent: 'space-between',
          margin: '0 auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <img
            className="company-logo"
            src="https://ubereats-media.s3.amazonaws.com/amazon-logo-square.jpg"
            alt="Logo"
          />
          <div style={{ marginLeft: '20px', marginTop: '5px' }}>
            <p style={{ fontSize: '1.25rem', color: 'black', fontWeight: 700 }}>{companyDetails ? companyDetails.name : ''}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <p style={{ fontSize: '1.1rem', color: 'black', fontWeight: 700 }}>
                61
              </p>
              <hr style={{
                borderWidth: '0.5px', height: '40px', color: 'grey', marginBottom: 0, display: 'inline-block',
              }}
              />
              <p style={{ fontSize: '1.1rem', color: 'black', fontWeight: 700 }}>3.5</p>
            </div>
          </div>
        </div>
        <p>Two</p>
      </div>
    </div>
  );
}

export default CompanyProfile;
