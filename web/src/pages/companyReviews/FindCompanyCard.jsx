import React from 'react';
import StarRatings from 'react-star-ratings';

function FindCompanyCard() {
  return (
    <div style={{
      flex: '0 1 calc(33% - 1em)', display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '5px',
    }}
    >
      <div style={{ display: 'flex', marginTop: '50px' }}>
        <img
          className="findcompany-logo"
          src="https://ubereats-media.s3.amazonaws.com/amazon-logo-square.jpg"
          alt="Logo"
        />
        <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '2px' }}>Company name</span>
          <StarRatings
            rating={4.3}
            starRatedColor="#9D2B6B"
            numberOfStars={5}
            name="rating"
            starDimension="17px"
            starSpacing="1px"
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '12px' }}>
        <span className="companyReviewLinks">Salaries</span>
        <span className="companyReviewLinks" style={{ marginLeft: '40px' }}>Open jobs</span>
      </div>
    </div>
  );
}

export default FindCompanyCard;
