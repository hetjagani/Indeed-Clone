/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './FindCompany.css';

const FindCompany = () => (
  <div className="findCompany">
    <div>
      <div className="findCompany_header">
        <h1 className="header1">Find great places to work</h1>
        <h2 className="header2">Get access to millions of company reviews</h2>
      </div>
      <div>
        <form>
          <div className="findCompany_form">
            <div className="label">
              <p className="nameLabel">Company name or job title</p>
              <div className="inputLabel">
                <input className="takeinput" />
                <div className="reviewIcons">
                  <SearchIcon className="iconsinput" />
                </div>
              </div>
            </div>
            <div className="label">
              <p className="nameLabel">City, state, or zip(optional)</p>
              <div className="inputLabel">
                <input className="takeinput" />
                <div className="reviewIcons">
                  <LocationOnIcon className="iconsinput" />
                </div>
              </div>
            </div>
            <button type="submit" className="findButton">
              Find Companies
            </button>
          </div>
        </form>
      </div>
      <p className="reviewsSalary">Do you want to search for salaries?</p>
    </div>
  </div>
);

export default FindCompany;
