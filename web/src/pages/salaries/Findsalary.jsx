import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './css/Findsalary.css';

const Findsalary = () => (
  <div className="findsalary">
    <div>
      <div className="findsalary_header">
        <h1 className="headersalary1">Find career you&apos;ll love</h1>
        <h2 className="headersalary2">
          Explore which careers have the highest job satisfaction, best
          salaries, and more
        </h2>
      </div>
      <div className="salaryBox" />
      <div>
        <form>
          <div className="findsalary_form">
            <div className="salarylabel">
              <p className="namesalaryLabel">What</p>
              <div className="inputsalaryLabel">
                <input className="takesalaryinput" placeholder="job title" />
                <div className="salaryIcons">
                  <SearchIcon className="salaryiconsinput" />
                </div>
              </div>
            </div>
            <div className="salarylabel">
              <p className="namesalaryLabel">Where</p>
              <div className="inputsalaryLabel">
                <input className="takesalaryinput" placeholder="location" />
                <div className="salaryIcons">
                  <LocationOnIcon className="salaryiconsinput" />
                </div>
              </div>
            </div>
            <button type="submit" className="salaryButton">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default Findsalary;
