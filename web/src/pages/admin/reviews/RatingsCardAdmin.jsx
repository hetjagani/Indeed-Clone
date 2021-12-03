/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import { FormControl, InputLabel, NativeSelect } from '@mui/material';
import updateReviewStatus from '../../../api/review/updateReviewStatus';

function RatingsCard(props) {
  const [status, setStatus] = useState('');
  const updateUserReviewStatus = async (reviewObj, approval) => {
    await updateReviewStatus(reviewObj, approval);
    await props.getCompanyReviews();
  };

  return (
    <>
      <div style={{ display: 'flex', marginTop: '20px', width: '900px' }}>
        <div
          aria-label="ratingsColumn"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '120px',
            marginTop: '25px',
          }}
        >
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.5rem',
              backgroundImage:
                'linear-gradient(90deg,#949494,#949494 2px,transparent 0,transparent 4px)',
              backgroundSize: '4px 2px',
              backgroundPosition: '0 100%',
              backgroundRepeat: 'repeat-x',
            }}
          >
            {props && props.review ? props.review.overallRating.toFixed(1) : null}
          </span>
          <StarRatings
            rating={props && props.review ? props.review.overallRating : 0}
            starRatedColor="#9D2B6B"
            numberOfStars={5}
            name="rating"
            starDimension="10px"
            starSpacing="1px"
          />
        </div>

        <div
          aria-label="ratingInfo"
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '25px',
            width: '100%',
          }}
        >
          <span style={{ fontSize: '1.1rem' }}>
            {props && props.review ? props.review.summary : null}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#767676' }}>
            {props && props.review && props.review.user ? props.review.user.name : null}
            {' '}
            -
            {' '}
            {props && props.review && props.review.user ? props.review.user.city : null}
            ,
            {' '}
            {props && props.review && props.review.user ? props.review.user.state : null}
            -
            {' '}
            {props && props.review
              ? new Date(props.review.reviewDate).toUTCString().slice(0, 16)
              : null}
          </span>
          <span style={{ marginTop: '20px' }}>
            {props && props.review ? props.review.review : null}
          </span>
          <span
            style={{
              fontSize: '.875rem',
              lineHeight: '1.5',
              color: '#595959',
              marginLeft: '5px',
              marginTop: '30px',
            }}
          >
            {props.review.helpful ? `${props.review.helpful} people found it helpful` : ''}
          </span>

          <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
            <FormControl>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Approval
              </InputLabel>
              <NativeSelect
                defaultValue={props && props.review && props.review.status ? props.review.status : 'PENDING'}
                inputProps={{
                  name: 'Approval',
                  id: 'uncontrolled-native',
                }}
                onChange={async (e) => {
                  setStatus(e.target.value);
                  await updateUserReviewStatus(props.review, e.target.value);
                }}
              >
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED"> REJECTED</option>
                <option value="PENDING">PENDING</option>
              </NativeSelect>
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingsCard;
