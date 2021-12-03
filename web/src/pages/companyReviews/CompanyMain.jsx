/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { Route } from 'react-router';
import { Container } from 'react-bootstrap';

import Button from '../../components/Button';
import getCompanyData from '../../api/company/getCompanyData';
import getReviewsOfCompany from '../../api/company/getReviewsOfCompany';
import getSalariesOfCompany from '../../api/company/getSalariesOfCompany';
import CompanyNav from '../../components/CompanyNav';
import './css/CompanyProfile.css';
import Snapshot from './snapshot/Snapshot';
import AboutCompany from './about/AboutCompany';
import SalariesMain from './salaries/SalariesMain';
import ReviewsMain from './reviews/ReviewsMain';
import Companyphotos from './photos/Companyphotos';
import CompanyJobsMain from './companyJobs/CompanyJobsMain';

function CompanyMain({ match }) {
  const [companyDetails, setCompanyDetails] = useState({});
  const [salaries, setSalaries] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewFilter, setReviewFilter] = useState(2);
  const [totalNumberOfReviews, setTotalNumberOfReviews] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const getCompanyDetails = async () => {
    const companyData = await getCompanyData(match.params.id);
    if (!companyData) return;
    setCompanyDetails(companyData);
  };

  const getSalaryDetails = async () => {
    const salariesData = await getSalariesOfCompany(match.params.id);
    if (!salariesData) return;
    const industrySalaryMap = {};
    if (salariesData.length > 0) {
      salariesData.forEach((salary) => {
        if (salary.industry && salary.industry.name) {
          if (industrySalaryMap[salary.industry.name]) {
            industrySalaryMap[salary.industry.name].push(salary);
          } else {
            industrySalaryMap[salary.industry.name] = [salary];
          }
        }
      });
    }

    setSalaries(industrySalaryMap);
  };

  const getCompanyReviews = async (sortBy) => {
    const limit = 10;
    const response = await getReviewsOfCompany(match.params.id, sortBy, currentPage, limit, false);
    if (!response) return;
    setReviews(response.data.nodes);
    setTotalNumberOfReviews(response.data.total);
    setTotalPages(Math.ceil(response.data.total / limit));
  };

  useEffect(() => {
    getCompanyDetails();
    getSalaryDetails();
    getCompanyReviews();
  }, []);

  useEffect(() => {
    getCompanyReviews();
  }, [currentPage]);

  return (
    <Container fluid>
      <div
        className="row"
        style={{
          overflowX: 'hidden',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <img
          className="company-image"
          src={companyDetails.media ? companyDetails.media.length ? companyDetails.media[0].url : '' : ''}
          alt="sample"
        />
      </div>
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: '900px',
          justifyContent: 'space-between',
          margin: '0 auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          alignItems: 'flex-end',
          marginTop: '-20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <img
            className="company-logo"
            src={companyDetails.logo ? companyDetails.logo.url : ''}
            alt="Logo"
          />
          <div style={{ marginLeft: '20px', marginTop: '30px' }}>
            <p style={{ fontSize: '1.25rem', color: 'black', fontWeight: 700 }}>
              {companyDetails ? companyDetails.name : ''}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                marginTop: '-20px',
              }}
            >
              <p style={{ fontSize: '1.1rem', color: 'black', fontWeight: 700 }}>
                {companyDetails ? Math.ceil(companyDetails.workLifeBalance * 20) : 'NA'}
              </p>
              {' '}
              <hr
                style={{
                  marginLeft: '10px',
                  marginRight: '10px',
                  borderWidth: '0.5px',
                  height: '40px',
                  color: 'grey',
                  marginBottom: 0,
                  display: 'inline-block',
                }}
              />
              {' '}
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'black',
                  fontWeight: 700,
                  marginRight: '10px',
                }}
              >
                {companyDetails && companyDetails.overallRating
                  ? companyDetails.overallRating.toFixed(2)
                  : null}
              </p>
              <StarRatings
                rating={
                  companyDetails && companyDetails.overallRating
                    ? companyDetails.overallRating
                    : 0
                }
                starRatedColor="#9D2B6B"
                numberOfStars={5}
                name="rating"
                starDimension="17px"
                starSpacing="2px"
              />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '40px' }}>
          <Button label="Follow" style={{ width: '200px' }} />
          <p style={{ fontSize: '10px', color: '#6f6f6f' }}>
            Get weekly updates, new jobs and reviews
          </p>
        </div>
      </div>

      <div className="wrapper" style={{ marginTop: '10px' }}>
        <CompanyNav />
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '900px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            margin: '0 auto',
            paddingLeft: '1rem',
            paddingRight: '1rem',
          }}
        >
          <Route
            exact
            path={`${match.path}/`}
            component={() => (
              <Snapshot data={companyDetails} salaries={salaries} reviews={reviews} />
            )}
          />
          <Route path={`${match.path}/about`} component={() => <AboutCompany data={companyDetails} />} />
          <Route
            path={`${match.path}/reviews`}
            component={() => (
              <ReviewsMain
                totalNumberOfReviews={totalNumberOfReviews}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                reviewFilter={reviewFilter}
                setReviewFilter={setReviewFilter}
                reviews={reviews}
                compId={match && match.params && match.params.id ? match.params.id : null}
                companyName={companyDetails && companyDetails.name ? companyDetails.name : null}
                getCompanyReviews={getCompanyReviews}
                logo={companyDetails && companyDetails.logo && companyDetails.logo.url
                  ? companyDetails.logo.url : null}
              />
            )}
          />
          <Route
            path={`${match.path}/salaries`}
            component={() => (
              <SalariesMain
                salaries={salaries}
                compId={match && match.params && match.params.id ? match.params.id : null}
                companyName={companyDetails.name}
                getSalaryDetails={getSalaryDetails}
              />
            )}
          />
          <Route path={`${match.path}/jobs`} component={CompanyJobsMain} />
          <Route
            path={`${match.path}/photos`}
            component={() => (
              <Companyphotos
                compId={match && match.params && match.params.id ? match.params.id : null}
                companyName={companyDetails.name}
              />
            )}
          />
        </div>
      </div>
    </Container>
  );
}

export default CompanyMain;
