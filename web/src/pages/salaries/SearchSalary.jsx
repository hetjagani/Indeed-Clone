/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const SearchSalary = () => {
  const [salaries, setSalaries] = useState([]);

  return (
    <div>
      <h1 className="searchheader">Browse top paying jobs by industry</h1>
      <div className="salary">
        <div className="salarydiv">
          <h4 className="salaryheader">Front Desk Agent</h4>
          <div className="salaryAverage">
            <span className="salarytitle">Average Salary</span>
            <h5 className="salaryamount">$37,516 per year</h5>
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
