/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getUserReviews from '../../api/review/getUserReviews';
import RatingsCard from '../companyReviews/reviews/RatingsCard';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const user = useSelector((state) => state.user.user.id);

  const fetchReviews = async () => {
    const response = await getUserReviews(user);

    setReviews(response.data.nodes);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  console.log(reviews);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '900px',
        maxWidth: '900px',
        margin: '0 auto',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        alignItems: 'flex-end',
        marginTop: '-20px',
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
      />
      {reviews && reviews.length > 0
        ? reviews.map((review) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {review.company ? review.company.name : ''}
            <RatingsCard review={review} flag={false} />
          </div>
        ))
        : null}
      <hr style={{ marginTop: '30px', borderTop: '2px #faf9f9', width: '100%' }} />
    </div>
  );
};

export default ReviewsPage;
