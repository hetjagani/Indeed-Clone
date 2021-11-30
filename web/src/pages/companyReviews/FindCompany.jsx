/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CustomAutocomplete from '../../components/CustomAutocomplete';
import Footer from '../../components/Footer';

import { whereFilter, whatFilter } from '../../utils/staticData';
import './css/FindCompany.css';
import FindCompanyCard from './FindCompanyCard';

const FindCompany = () => {
  const history = useHistory();
  const [companySearchFilter, setCompanySearchFilter] = useState('');
  const [location, setLocation] = useState('');
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxWidth: '1400px',
          justifyContent: 'flex-start',
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
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
                  <CustomAutocomplete
                    className="inputLabel"
                    sx={{
                      width: '330px',
                      marginLeft: '5px',
                      marginTop: '10px',
                    }}
                    variant="outlined"
                    value={companySearchFilter}
                    setValue={setCompanySearchFilter}
                    options={whatFilter}
                    endAdornmentIcon={(
                      <div style={{ marginRight: '15px', marginTop: '5px' }}>
                        <SearchIcon className="iconsinput" />
                      </div>
                  )}
                  />
                </div>
                <div className="label">
                  <p className="nameLabel">City, state, or zip(optional)</p>
                  <CustomAutocomplete
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
                </div>
                <button type="submit" className="findButton">
                  Find Companies
                </button>
              </div>
            </form>
          </div>
          <p className="reviewsSalary" onClick={() => history.push('/salaries')}>
            Do you want to search for salaries?
          </p>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', width: '69%', flexWrap: 'wrap', marginLeft: '30px',
        }}
        >
          <FindCompanyCard />
          <FindCompanyCard />
          <FindCompanyCard />
          <FindCompanyCard />
          <FindCompanyCard />
          <FindCompanyCard />
          <FindCompanyCard />
        </div>
      </div>
      <div style={{ marginTop: '100px' }}>
        <Footer />
      </div>
    </>
  );
};

export default FindCompany;
