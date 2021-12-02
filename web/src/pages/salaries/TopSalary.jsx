/* eslint-disable no-nested-ternary */
import React from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CompanyDefaultLogo from '../../assets/img/companyLogo.jpg';

const TopSalary = ({ salary, title, location }) => (
  <div
    style={{
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
        marginTop: '20px',
        fontSize: '1.4375rem',
        lineHeight: '1.22',
        fontWeight: '700',
        color: '#2d2d2d',
      }}
    >
      Showing top companies
      {' '}
      {title ? `for ${title}` : ''}
      {' '}
      {location ? `in ${location}` : ''}
    </h1>
    {salary ? salary.length > 0
      ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ECECEC',
            margin: '1%',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          {salary.map((option) => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '20px',
                alignItems: 'center',
              }}
            >
              <img
                width="70px"
                src={
                  option.company.logo
                  && option.company.logo !== ''
                  && option.company.logo !== null
                  && option.company.logo !== undefined
                    ? option.company.logo
                    : CompanyDefaultLogo
                }
                alt="company"
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  marginLeft: '30px',
                }}
              >
                <div>
                  <div>
                    <Link
                      to={{
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
                        {' '}
                        -
                        {' '}
                        {option.title}
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
                    {option.company.overallRating ? (
                      <>
                        <span
                          style={{
                            color: 'black',
                            textDecoration: 'underline',
                            fontWeight: '700',
                            fontSize: '18px',
                            paddingRight: '10px',
                          }}
                        >
                          {option.company.overallRating}
                        </span>
                        <span>
                          <StarRatings
                            rating={option.company.overallRating}
                            starRatedColor="#000000"
                            numberOfStars={5}
                            name="rating"
                            starDimension="17px"
                            starSpacing="2px"
                          />
                        </span>
                      </>
                    ) : null}
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
                  <ArrowForwardIosIcon
                    style={{ paddingTop: '10px', paddingLeft: '5px' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : <p style={{ marginTop: '20px' }}>No such salaries</p> : ''}
  </div>
);

export default TopSalary;
