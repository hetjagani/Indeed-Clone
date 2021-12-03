/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getReviewsOfCompany from '../../../api/company/getReviewsOfCompany';
// import { Typography } from '@mui/material';
// import Button from '../../../components/Button';
import RatingsCard from '../../companyReviews/reviews/RatingsCard';

Array.range = (start, end) => Array.from({ length: end - start }, (v, k) => k + start);

function EmployersReview() {
  const [reviews, setReviews] = useState([]);
  const company = useSelector((state) => state.user.company);
  const [totalNumberOfReviews, setTotalNumberOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReviews = async () => {
    const limit = 10;
    const response = await getReviewsOfCompany(company._id, 'overallRating', currentPage, limit, true);
    if (!response) return;
    setReviews(response.data.nodes);
    setTotalNumberOfReviews(response.data.total);
    setTotalPages(Math.ceil(response.data.total / limit));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [currentPage]);

  return (
    <>
      <div
        style={{
          width: '900',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          overflowX: 'hidden',
        }}
      >
        <p
          style={{
            fontSize: '.875rem',
            lineHeight: '1.5',
            color: '#595959',
            marginLeft: '5px',
            marginTop: '30px',
          }}
        >
          Found total
          {' '}
          <span style={{ fontWeight: 'bold' }}>{totalNumberOfReviews || 0}</span>
          {' '}
          reviews by users
        </p>

        {reviews && reviews.length > 0
          ? (
            <div style={{ display: 'flex', width: '900px', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '15px', fontWeight: 'lighter' }}>
                Showing
                {' '}
                {reviews.length}
                {' '}
                results of
                {' '}
                {totalNumberOfReviews}
              </p>
              <p style={{ fontSize: '15px', fontWeight: 'lighter' }}>
                Page
                {' '}
                <span style={{ fontWeight: 'bold' }}>{currentPage}</span>
                {' '}
                of
                {' '}
                {totalPages}
              </p>
            </div>
          ) : null }

        <p
          style={{
            fontSize: '.875rem',
            lineHeight: '1.5',
            color: '#595959',
            marginTop: '30px',
          }}
        />
        {reviews && reviews.length > 0
          ? reviews.map((review) => (
            <div>
              <RatingsCard review={review} flag={false} showButtons />
              <hr style={{ marginTop: '30px', borderTop: '2px #faf9f9', width: '95%' }} />
            </div>
          ))
          : null}
      </div>

      {reviews ? (
        reviews.length > 0 ? (
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
            {Array.range(1, totalPages + 1).map((pageNo) => (
              <p
                onClick={() => setCurrentPage(pageNo)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: `${
                    currentPage === pageNo ? '#595959' : '#E4E2E0'
                  }`,
                  padding: '17px',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  color: `${currentPage === pageNo ? '#fff' : '#000'}`,
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

export default EmployersReview;
