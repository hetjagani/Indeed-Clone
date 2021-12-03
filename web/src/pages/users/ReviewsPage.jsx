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

  return (
    <>
      <div
        style={{
          width: '98%',
          display: 'flex',
          justifyContent: 'center',
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
        />
        {reviews && reviews.length > 0
          ? reviews.map((review) => (
            <div>
              <RatingsCard review={review} flag={false} />
              <hr style={{ marginTop: '30px', borderTop: '2px #faf9f9', width: '95%' }} />
            </div>
          ))
          : null}
      </div>
    </>
  );
};

export default ReviewsPage;
