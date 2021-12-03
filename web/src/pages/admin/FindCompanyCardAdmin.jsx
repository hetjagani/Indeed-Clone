/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { useHistory } from 'react-router';
import StarRatings from 'react-star-ratings';
import companyLogo from '../../assets/img/companyLogo.jpg';

function FindCompanyCard({ company }) {
  const history = useHistory();
  return (
    <div style={{
      flex: '0 1 calc(33% - 1em)', display: 'flex', flexDirection: 'column', width: '100%', marginBottom: '-20px',
    }}
    >
      <div style={{ display: 'flex', marginTop: '50px' }}>
        <img
          className="findcompany-logo"
          src={company ? company.logo ? company.logo.url : companyLogo : companyLogo}
          alt="Logo"
        />
        <div style={{ marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
          <span
            onClick={() => history.push(`/admin/reviews/${company._id}`)}
            style={{
              fontWeight: 'bold', fontSize: '15px', marginBottom: '2px', cursor: 'pointer',
            }}
          >
            {company ? company.name : ''}
          </span>
          {company ? company.overallRating
            ? (
              <StarRatings
                rating={company.overallRating}
                starRatedColor="#9D2B6B"
                numberOfStars={5}
                name="rating"
                starDimension="17px"
                starSpacing="1px"
              />
            ) : <span style={{ fontSize: '13px' }}>No ratings yet</span> : <span style={{ fontSize: '10px' }}>No ratings yet</span>}
        </div>
      </div>
      {/* <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '12px' }}>
        <span
          className="companyReviewLinks"
          onClick={() => history.push(`/cmp/${company._id}/salaries`)}
        >
          Salaries

        </span>
        <span
          className="companyReviewLinks"
          style={{ marginLeft: '40px' }}
          onClick={() => history.push(`/cmp/${company._id}/jobs`)}
        >
          Open jobs

        </span>
      </div> */}
    </div>
  );
}

export default FindCompanyCard;
