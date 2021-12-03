/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Typography } from '@mui/material';

import Button from '../../../components/Button';
import AddReviewModal from './AddReviewModal';
import '../css/ReviewsMain.css';
import RatingsCard from './RatingsCard';

Array.range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

function ReviewsMain(props) {
  const [isOpen, setIsOpen] = useState(false);
  // const [reviewFilter, setReviewFilter] = useState(1);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    props.getCompanyReviews();
    setIsOpen(false);
  };
  return (
    <>
      <AddReviewModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        isOpen={isOpen}
        compId={props && props.compId ? props.compId : null}
        companyName={props && props.companyName ? props.companyName : null}
        logo={props && props.logo ? props.logo : null}
      />
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
        <Button
          onClick={handleOpen}
          label="Review this company"
          style={{
            width: '200px',
            backgroundColor: 'white',
            color: '#2557a7',
            border: '1px solid #d4d2d0',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: '#F3F2F1',
          height: '150px',
          borderRadius: '20px',
          marginTop: '30px',
        }}
      >
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Sort by</span>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <button
              onClick={async () => { await props.getCompanyReviews('helpful'); props.setReviewFilter(1); }}
              className={`ceoButtonHover ${props.reviewFilter === 1 ? 'reviewFilterButtonSelected' : ''}`}
              type="button"
              style={{
                borderRadius: '10px',
                width: '220px',
                height: '40px',
                fontSize: 'medium',
                color: '#2453d3',
              }}
            >
              Helpfulness
            </button>
            <button
              onClick={() => { props.setReviewFilter(2); props.getCompanyReviews('overallRating'); }}
              className={`ceoButtonHover ${props.reviewFilter === 2 ? 'reviewFilterButtonSelected' : ''}`}
              type="button"
              style={{
                width: '220px',
                height: '40px',
                fontSize: 'medium',
                marginLeft: '-15px',
                color: '#2453d3',
              }}
            >
              Rating
            </button>
            <button
              onClick={async () => { await props.getCompanyReviews('reviewDate'); props.setReviewFilter(3); }}
              className={`ceoButtonHover ${props.reviewFilter === 3 ? 'reviewFilterButtonSelected' : ''}`}
              type="button"
              style={{
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
                width: '195px',
                height: '40px',
                marginLeft: '-15px',
                fontSize: 'medium',
                color: '#2453d3',
              }}
            >
              Date
            </button>
          </div>
        </div>
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
            <RatingsCard review={review} getCompanyReviews={props.getCompanyReviews} />
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

export default ReviewsMain;
