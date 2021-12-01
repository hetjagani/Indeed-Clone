/* eslint-disable no-nested-ternary */
import React from 'react';
import './css/Searchsalary.css';

const SearchSalary = ({ salary }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      maxWidth: '1250px',
      justifyContent: 'center',
      margin: '0 auto',
      alignItems: 'flex-start',
    }}
  >
    <h1 className="searchheader">Browse top paying jobs by industry</h1>
    <div style={{
      display: 'flex', justifyContent: 'flex-start', width: '100%', flexWrap: 'wrap',
    }}
    >
      {salary.map((option) => (
        <div className="salary">
          <div className="salarydiv">
            <span className="salaryheader">{option.title}</span>
            <div className="salaryAverage">
              <span className="salarytitle">Average Salary</span>
              <span className="salaryamount">
                $
                {option ? option.salary ? option.salary.toLocaleString() : '' : ''}
                {' '}
                per year
              </span>
            </div>
          </div>
          <div className="salaryskills">
            <span className="salaryjobs">Skills</span>
            <span className="salaryjobs">Job Openings</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SearchSalary;
