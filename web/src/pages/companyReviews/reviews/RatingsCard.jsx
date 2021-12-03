/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import FlagIcon from '@mui/icons-material/Flag';
import { Switch } from '@mui/material';
import IosShareIcon from '@mui/icons-material/IosShare';
import toast from 'react-hot-toast';
import Button from '../../../components/Button';
import updateReview from '../../../api/review/updateReview';

function RatingsCard(props) {
  const [helpfulReview, setHelpfulReview] = useState(-1);
  const [checkValue, setCheckValue] = useState(!!(props && props.review.isFeatured === true));
  const updateUserReview = async (reviewObj, flag, makeFeatured = false) => {
    if (makeFeatured === true) {
      await updateReview(reviewObj, 'nothing', makeFeatured);
    } else {
      await updateReview(reviewObj, flag);
      await props.getCompanyReviews();
    }
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
          {props.showButtons ? (
            <span
              style={{
                fontSize: '.875rem',
                lineHeight: '1.5',
                color: '#595959',
                marginLeft: '5px',
                marginTop: '30px',
              }}
            >
              {!props.flag ? 'Featured review?' : 'Is this review helpful?'}
            </span>
          ) : null}
          {props.showButtons ? (
            <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-between' }}>
              {props && props.flag === false ? (
                <Switch
                  checked={checkValue}
                  onClick={async () => {
                    await updateUserReview(props.review, 'nothing', true);
                    setCheckValue(!checkValue);
                    toast.success('Feature status updated!');
                  }}
                />
              ) : (
                <div>
                  <Button
                    onClick={async () => {
                      await updateUserReview(props.review, 'up');
                      setHelpfulReview(1);
                    }}
                    label={`Yes ${helpfulReview === 1 ? '1' : ''}`}
                    style={{
                      width: '50px',
                      fontSize: '13px',
                      backgroundColor: '#F3F2F1',
                      color: 'black',
                    }}
                  />
                  <Button
                    onClick={async () => {
                      await updateUserReview(props.review, 'down');
                      setHelpfulReview(0);
                    }}
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
              )}

              <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
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
          ) : null}
        </div>
      </div>
    </>
  );
}

export default RatingsCard;
