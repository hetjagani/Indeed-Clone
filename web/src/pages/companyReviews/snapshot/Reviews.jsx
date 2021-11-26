/* eslint-disable max-len */
import React from 'react';
import { Typography } from '@mui/material';
import UserIconSVG from '../../../assets/img/usericon.jpg';
import StarSVG from '../../../components/svg/StarSVG';

function Reviews() {
  return (
    <>
      <Typography style={{
        marginTop: '35px', fontWeight: 'bold', fontSize: '1.75rem', lineHeight: '1.25', marginBottom: '0.5rem',
      }}
      >
        Reviews
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px' }}>
        <img src={UserIconSVG} alt="usericon" width="40px" height="40px" />
        <div style={{
          marginLeft: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
        >
          <span style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#595959' }}>
            Retail Associate in San Jose, CA
          </span>
          <span style={{ display: 'flex', alignItems: 'center', marginTop: '1px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>
              4.0
            </span>
            {' '}
            <StarSVG width="20px" color="#9D2B6B" />
            <span style={{
              fontSize: '0.88rem', lineHeight: '1.5', color: '#595959', marginLeft: '5px', marginTop: '2px',
            }}
            >
              on November 22, 2021
            </span>
          </span>
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'flex-start', marginTop: '3px', flexDirection: 'column',
      }}
      >
        <p style={{ fontWeight: 'bold' }}>Flexible</p>
        <p style={{ marginTop: '-5px' }}>
          Ok to work at, it was a flexible job and the management was nice. I was a seasonal hire and then I stopped working. Store was clean and workers were nice.
        </p>
      </div>

      <p style={{
        marginTop: '20px', color: '#2557a7', fontWeight: 'bold', fontSize: 'large',
      }}
      >
        See all reviews
        {' '}
        {' '}
        {' '}
        &#62;
      </p>
    </>
  );
}

export default Reviews;
