import React from 'react';
import StarRatings from 'react-star-ratings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TopSalary = () => (
  <div>
    <h1
      style={{
        fontFamily:
          'Helvetica Neue,Helvetica,Arial,Liberation Sans,Roboto,Noto,sans-serif',
        marginTop: '1.5rem',
        fontSize: '1.4375rem',
        lineHeight: '1.22',
        fontWeight: '700',
        color: '#2d2d2d',
      }}
    >
      Top companies for Software Engineering in United States
    </h1>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #ECECEC',
        margin: '3%',
        borderRadius: '8px',
        padding: '18px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div style={{ width: '10%' }}>
          <img alt="company" />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
          }}
        >
          <div>
            <div>
              <span
                style={{
                  color: 'black',
                  textDecoration: 'underline',
                  fontWeight: '700',
                  fontSize: '18px',
                }}
              >
                Google
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingTop: '5px',
              }}
            >
              <span
                style={{
                  color: 'black',
                  textDecoration: 'underline',
                  fontWeight: '700',
                  fontSize: '18px',
                  paddingRight: '10px',
                }}
              >
                4.2
              </span>
              <span>
                <StarRatings
                  rating={4.2}
                  starRatedColor="#000000"
                  numberOfStars={5}
                  name="rating"
                  starDimension="17px"
                  starSpacing="2px"
                />
              </span>
              <span
                style={{
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  color: '#6f6f6f',
                  textDecoration: 'underline',
                  fontSize: '14px',
                  paddingTop: '3px',
                }}
              >
                1500 reviews
              </span>
              <span
                style={{
                  paddingRight: '20px',
                  color: '#6f6f6f',
                  textDecoration: 'underline',
                  fontSize: '14px',
                  paddingTop: '3px',
                }}
              >
                345 salaries reported
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  color: 'black',
                  textDecoration: 'underline',
                  fontWeight: '700',
                  fontSize: '18px',
                }}
              >
                $172,872
              </span>
              <span
                style={{
                  paddingRight: '20px',
                  color: '#6f6f6f',
                  textDecoration: 'underline',
                  fontSize: '14px',
                }}
              >
                per year
              </span>
            </div>
            <ArrowForwardIosIcon style={{ paddingTop: '10px', paddingLeft: '5px' }} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TopSalary;
