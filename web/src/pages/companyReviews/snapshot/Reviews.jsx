/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
import React from 'react';
import { Typography } from '@mui/material';
import UserIconSVG from '../../../assets/img/usericon.jpg';
import StarSVG from '../../../components/svg/StarSVG';

function Reviews(props) {
  return (
    <>
      <Typography
        style={{
          marginTop: '35px',
          fontWeight: 'bold',
          fontSize: '1.75rem',
          lineHeight: '1.25',
          marginBottom: '0.5rem',
        }}
      >
        Reviews
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
        <img src={UserIconSVG} alt="usericon" width="40px" height="40px" />
        <div
          style={{
            marginLeft: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#595959' }}>
            {props.reviews && props.reviews.length > 0 && props.reviews[0].user
              ? props.reviews[0].user.name
              : null}
            {' '}
            in
            {' '}
            {props.reviews && props.reviews.length > 0 && props.reviews[0].user
              ? props.reviews[0].user.city
              : null}
            ,
            {' '}
            {props.reviews && props.reviews.length > 0 && props.reviews[0].user
              ? props.reviews[0].user.state
              : null}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', marginTop: '1px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
              {props.reviews && props.reviews.length > 0 ? props.reviews[0].overallRating : null}
            </span>
            {' '}
            <StarSVG width="20px" color="#9D2B6B" />
            <span
              style={{
                fontSize: '0.88rem',
                lineHeight: '1.5',
                color: '#595959',
                marginLeft: '5px',
                marginTop: '2px',
              }}
            >
              on
              {' '}
              {props.reviews && props.reviews.length > 0 ? (
                <>
                  {new Date(props.reviews[0].reviewDate).toLocaleString('default', {
                    month: 'long',
                  })}
                  {' '}
                  {new Date(props.reviews[0].reviewDate).getDate()}
                  {', '}
                  {new Date(props.reviews[0].reviewDate).getFullYear()}
                </>
              ) : null}
            </span>
          </span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          marginTop: '3px',
          flexDirection: 'column',
        }}
      >
        <p style={{ fontWeight: 'bold' }}>
          {props.reviews && props.reviews.length > 0 ? props.reviews[0].review : null}
        </p>
        <p style={{ marginTop: '-5px' }}>
          {props.reviews && props.reviews.length > 0 ? props.reviews[0].summary : null}
        </p>
      </div>

      <p
        style={{
          marginTop: '20px',
          color: '#2557a7',
          fontWeight: 'bold',
          fontSize: 'large',
        }}
      >
        See all reviews &#62;
      </p>
    </>
  );
}

export default Reviews;
