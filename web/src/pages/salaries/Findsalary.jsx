import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './css/FindSalary.css';

const Findsalary = () => {
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  // const [searchSalary, setSearchSalary] = useState([]);
  const search = () => {

  };
  return (
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
                  <input className="takesalaryinput" placeholder="job title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  <div className="salaryIcons">
                    <SearchIcon className="salaryiconsinput" />
                  </div>
                </div>
              </div>
              <div className="salarylabel">
                <p className="namesalaryLabel">Where</p>
                <div className="inputsalaryLabel">
                  <input className="takesalaryinput" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                  <div className="salaryIcons">
                    <LocationOnIcon className="salaryiconsinput" />
                  </div>
                </div>
              </div>
              <button type="submit" className="salaryButton" onClick={search}>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Findsalary;
