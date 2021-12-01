/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import FlagIcon from '@mui/icons-material/Flag';
import IosShareIcon from '@mui/icons-material/IosShare';
import Button from '../../../components/Button';

function RatingsCard(props) {
  const [helpfulReview, setHelpfulReview] = useState(-1);

  return (
    <>
      <div style={{ display: 'flex', marginTop: '20px' }}>
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
            {props && props.review ? props.review.overallRating : null}
          </span>
          <StarRatings
            rating={4.5}
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
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            {props && props.review ? props.review.review : null}
          </span>
          <span style={{ fontSize: '0.8rem', color: '#767676' }}>
            Customer service representative (Former Employee) - San Jose, CA - November 21, 2021
          </span>
          <span style={{ marginTop: '20px' }}>
            {props && props.review ? props.review.summary : null}
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
            Was this review helpful?
          </span>

          <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
            <div>
              <Button
                onClick={() => setHelpfulReview(1)}
                label={`Yes ${helpfulReview === 1 ? '1' : ''}`}
                style={{
                  width: '50px',
                  fontSize: '13px',
                  backgroundColor: '#F3F2F1',
                  color: 'black',
                }}
              />
              <Button
                onClick={() => setHelpfulReview(0)}
                label={`No ${helpfulReview === 0 ? '1' : ''}`}
                style={{
                  marginLeft: '20px',
                  width: '50px',
                  fontSize: '13px',
                  backgroundColor: '#F3F2F1',
                  color: 'black',
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FlagIcon sx={{ color: '#767676', fontSize: '1.1rem' }} />
              <span
                style={{
                  fontSize: '0.75rem',
                  lineHeight: '1.5',
                  color: '#595959',
                  marginLeft: '5px',
                }}
              >
                Flag
              </span>
              <IosShareIcon sx={{ color: '#767676', fontSize: '1.1rem', marginLeft: '20px' }} />
              <span
                style={{
                  fontSize: '.75rem',
                  lineHeight: '1.5',
                  color: '#595959',
                  marginLeft: '5px',
                }}
              >
                Share
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RatingsCard;
