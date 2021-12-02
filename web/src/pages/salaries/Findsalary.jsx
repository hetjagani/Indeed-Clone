/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Container } from 'react-bootstrap';

import './css/Findsalary.css';
import searchSalary from '../../api/salary/searchSalary';
import SearchSalary from './SearchSalary';
import TopSalary from './TopSalary';
import CustomAutocomplete from '../../components/CustomAutocomplete';
import { whatFilter, whereFilter } from '../../utils/staticData';

const Findsalary = () => {
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [salaryData, setSalaryData] = useState([]);
  const [searchFlag, setSearchFlag] = useState(true);
  const [topSalaries, setTopSalaries] = useState([]);
  const payload = {
    title,
    location,
  };
  useEffect(() => {
    searchSalary(payload).then((response) => {
      if (!response) {
        return;
      }
      setTopSalaries(response.data.nodes);
    });
  }, []);
  const search = (event) => {
    event.preventDefault();
    if (title === '' && location === '') {
      setSearchFlag(true);
      return;
    }
    searchSalary(payload).then((response) => {
      if (!response) {
        return;
      }
      setSearchFlag(false);
      setSalaryData(response.data.nodes);
    });
  };
  return (
    <Container fluid>
      <div
        style={{
          display: 'flex',
          width: '97vw',
          justifyContent: 'flex-start',
          margin: '0 auto',
          paddingLeft: '1rem',
          backgroundColor: '#E8F3FC',
          paddingRight: '1rem',
          paddingBottom: '20px',
          alignItems: 'flex-end',
        }}
      >
        <div
          style={{
            position: 'absolute',
            marginLeft: '220px',
            marginBottom: '30px',
          }}
        >
          <div className="findsalary_header">
            <h1 className="headersalary1">Find a career you&apos;ll love</h1>
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
                  <CustomAutocomplete
                    placeholder="Enter job title"
                    className="inputLabel"
                    sx={{
                      width: '330px',
                      marginLeft: '5px',
                      marginTop: '10px',
                    }}
                    variant="outlined"
                    value={title}
                    setValue={setTitle}
                    options={whatFilter}
                    endAdornmentIcon={(
                      <div style={{ marginRight: '15px', marginTop: '5px' }}>
                        <SearchIcon className="iconsinput" />
                      </div>
                    )}
                  />
                  {/* <div className="inputsalaryLabel">
                    <input
                      className="takesalaryinput"
                      placeholder="job title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="salaryIcons">
                      <SearchIcon className="salaryiconsinput" />
                    </div>
                  </div> */}
                </div>
                <div className="salarylabel">
                  <p className="namesalaryLabel">Where</p>
                  <CustomAutocomplete
                    placeholder="Enter location"
                    className="inputLabel"
                    sx={{
                      width: '330px',
                      marginLeft: '5px',
                      marginTop: '10px',
                    }}
                    variant="outlined"
                    value={location}
                    setValue={setLocation}
                    options={whereFilter}
                    endAdornmentIcon={(
                      <div style={{ marginRight: '15px', marginTop: '5px' }}>
                        <LocationOnIcon className="iconsinput" />
                      </div>
                    )}
                  />
                  {/* <div className="inputsalaryLabel">
                    <input className="takesalaryinput" placeholder="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <div className="salaryIcons">
                      <LocationOnIcon className="salaryiconsinput" />
                    </div>
                  </div> */}
                </div>
                <button type="submit" className="salaryButton" onClick={search}>
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <img
          src="https://d3hbwax96mbv6t.cloudfront.net/title-webapp/_next/static/images/salaries-8d20dc14bdeae8889387e0fb40e0d546.png"
          alt="salary"
          style={{
            marginRight: 0,
            marginLeft: 'auto',
            height: '100%',
            maxHeight: '326px',
            width: '712px',
          }}
        />
      </div>
      {searchFlag ? (
        <SearchSalary salary={topSalaries} />
      ) : (
        <TopSalary salary={salaryData} title={title} location={location} />
      )}
    </Container>
  );
};

export default Findsalary;
