import React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const TopSalary = ({ salary }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '1250px',
    margin: '0 auto',
  }}
  >
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
        margin: '1%',
        borderRadius: '8px',
        padding: '18px',
      }}
    >
      {salary.map((option) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '10%' }}>
            <img src={option.company.media[0]} alt="company" />
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
                <Link to={{
                  pathname: `/cmp/${option.companyId}/salaries`,
                }}
                >
                  <span
                    style={{
                      color: 'black',
                      textDecoration: 'underline',
                      fontWeight: '700',
                      fontSize: '18px',
                    }}
                  >
                    {option.company.name}
                  </span>
                </Link>
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
                    rating={option.company.overallReview}
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
                  {option.company.totalReviews}
                  {' '}
                  reviews
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
                  {option.company.totalSalaries}
                  {' '}
                  salaries reported
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
                  $
                  {' '}
                  {option.company.salary}
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
      ))}
    </div>
  </div>
);

export default TopSalary;
