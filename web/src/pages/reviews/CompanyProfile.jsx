import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import getCompanyDetails from '../../api/reviews/getCompanyDetails';
import './css/CompanyProfile.css';

function CompanyProfile({ match }) {
  const [companyDetails, setCompanyDetails] = useState({});
  const updateDetails = async () => {
    const companyData = await getCompanyDetails(match.params.id);
    if (!companyData) return;
    setCompanyDetails(companyData);
  };

  useEffect(() => {
    updateDetails();
  }, []);

  return (
    <div>
      <div style={{ marginTop: '-50px' }}>
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
          marginTop: '-20px',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <p>
          <div>
            <Row>
              <Col>
                <img
                  className="company-logo"
                  src="https://ubereats-media.s3.amazonaws.com/amazon-logo-square.jpg"
                  alt=""
                />
              </Col>
              <Col>{companyDetails.name}</Col>
            </Row>
          </div>
        </p>
        <p>Two</p>
      </div>
    </div>
  );
}

export default CompanyProfile;
