/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Typography } from '@mui/material';

import '../../companyReviews/css/ReviewsMain.css';
import RatingsCardAdmin from './RatingsCardAdmin';

Array.range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

function ReviewsMainAdmin(props) {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          style={{
            marginTop: '15px',
            fontWeight: 'bold',
            fontSize: '1.75rem',
            lineHeight: '1.25',
            marginBottom: '0.5rem',
          }}
        >
          Reviews
        </Typography>
      </div>

      <p
        style={{
          fontSize: '.875rem',
          lineHeight: '1.5',
          color: '#595959',
          marginLeft: '5px',
          marginTop: '30px',
        }}
      >
        Found
        {' '}
        <span style={{ fontWeight: 'bold' }}>{props && props.totalNumberOfReviews ? props.totalNumberOfReviews : null}</span>
        {' '}
        reviews matching the search
      </p>
      {props && props.reviews && props.reviews.length > 0
        ? props.reviews.map((review) => (
          <div>
            <RatingsCardAdmin review={review} getCompanyReviews={props.getCompanyReviews} />
            <hr style={{ marginTop: '30px', borderTop: '2px #faf9f9', width: '100%' }} />
          </div>
        ))
        : null}
      {props && props.reviews && props.reviews.length > 0
        ? (
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '15px', fontWeight: 'lighter' }}>
              Showing
              {' '}
              {props.reviews.length}
              {' '}
              results of
              {' '}
              {props.totalNumberOfReviews}
            </p>
            <p style={{ fontSize: '15px', fontWeight: 'lighter' }}>
              Page
              {' '}
              <span style={{ fontWeight: 'bold' }}>{props.currentPage}</span>
              {' '}
              of
              {' '}
              {props.totalPages}
            </p>
          </div>
        ) : null }

      {props && props.reviews ? (
        props.reviews.length > 0 ? (
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
            {Array.range(1, props.totalPages + 1).map((pageNo) => (
              <p
                onClick={() => props.setCurrentPage(pageNo)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: `${
                    props.currentPage === pageNo ? '#595959' : '#E4E2E0'
                  }`,
                  padding: '17px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  color: `${props.currentPage === pageNo ? '#fff' : '#000'}`,
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
  );
}

export default ReviewsMainAdmin;
