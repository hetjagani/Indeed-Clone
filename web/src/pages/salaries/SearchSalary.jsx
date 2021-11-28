/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './css/Searchsalary.css';

const SearchSalary = () => {
  const [salaries, setSalaries] = useState([]);

  return (
    <div>
      <h1 className="searchheader">Browse top paying jobs by industry</h1>
      <div className="salary">
        <div className="salarydiv">
          <span className="salaryheader">Front Desk Agent</span>
          <div className="salaryAverage">
            <span className="salarytitle">Average Salary</span>
            <span className="salaryamount">$37,516 per year</span>
          </div>
        </div>
        <div className="salaryskills">
          <span className="salaryjobs">Skills</span>
          <span className="salaryjobs">Job Openings</span>
        </div>
      </div>
    </div>
  );
};

export default SearchSalary;
