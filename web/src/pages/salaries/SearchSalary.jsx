import React from 'react';
import './css/Searchsalary.css';

const SearchSalary = ({ salary }) => (
  <div>
    <h1 className="searchheader">Browse top paying jobs by industry</h1>
    <div className="filtersalary">
      {salary.map((option) => (
        <div className="salary">
          <div className="salarydiv">
            <span className="salaryheader">{option.title}</span>
            <div className="salaryAverage">
              <span className="salarytitle">Average Salary</span>
              <span className="salaryamount">
                $
                {option.salary}
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
