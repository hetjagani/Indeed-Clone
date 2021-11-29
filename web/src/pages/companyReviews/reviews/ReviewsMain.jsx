/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Typography } from '@mui/material';

import Button from '../../../components/Button';
import AddReviewModal from './AddReviewModal';
import '../css/ReviewsMain.css';
import RatingsCard from './RatingsCard';

function ReviewsMain(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [reviewFilter, setReviewFilter] = useState(1);
  // const [reviewFilter, setReviewFilter] = useState(1);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <AddReviewModal handleOpen={handleOpen} handleClose={handleClose} isOpen={isOpen} />
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
          Work happiness
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
          <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>Filter by</span>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <button
              onClick={() => setReviewFilter(1)}
              className={`ceoButtonHover ${reviewFilter === 1 ? 'reviewFilterButtonSelected' : ''}`}
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
              onClick={() => setReviewFilter(2)}
              className={`ceoButtonHover ${reviewFilter === 2 ? 'reviewFilterButtonSelected' : ''}`}
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
              onClick={() => setReviewFilter(3)}
              className={`ceoButtonHover ${reviewFilter === 3 ? 'reviewFilterButtonSelected' : ''}`}
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

      <p style={{
        fontSize: '.875rem', lineHeight: '1.5', color: '#595959', marginLeft: '5px', marginTop: '30px',
      }}
      >
        Found
        {' '}
        <span style={{ fontWeight: 'bold' }}>24,308</span>
        {' '}
        reviews matching the search
      </p>
      {(props && props.reviews && props.reviews.length > 0) ? props.reviews.map((review) => (
        <div>
          <RatingsCard review={review} />
          <hr style={{ marginTop: '30px', borderTop: '2px #faf9f9', width: '100%' }} />
        </div>
      )) : null }
    </>
  );
}

export default ReviewsMain;
