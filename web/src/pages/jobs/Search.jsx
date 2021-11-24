/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// import './css/SearchInput.css';
import Button from '../../components/Button';
import CustomAutocomplete from '../../components/CustomAutocomplete';
import getCompanies from '../../api/company/get';

const whatFilter = [
  { title: 'work from home' },
  { title: 'part time' },
  { title: 'hiring immediately' },
  { title: 'remote' },
  { title: 'full time' },
  { title: 'remote work from home' },
  { title: 'warehouse' },
  { title: 'amazon' },
  { title: 'receptionist' },
  { title: 'walmart' },
];

const whereFilter = [
  { title: 'San Jose' },
  { title: 'San Francisco' },
  { title: 'Sunnyvale' },
  { title: 'Santa Clara' },
  { title: 'Sacramento' },
  { title: 'California' },
  { title: 'Fremont' },
  { title: 'Los Angeles' },
  { title: 'Oakland' },
  { title: 'Las Vegas' },
];

const datePostedFilter = [
  { title: 'Last 24 hours' },
  { title: 'Last 3 days' },
  { title: 'Last 7 days' },
  { title: 'Last 14 days' },
];

const jobTypeFilter = [
  { title: 'Full Time' },
  { title: 'Internship' },
  { title: 'Contract' },
];

const industryFilter = [
  { title: 'Business Operations & Management' },
  { title: 'Construction' },
  { title: 'Education' },
  { title: 'Finance & Accounting' },
  { title: 'Food & Beverage' },
  { title: 'Healthcare' },
  { title: 'Manufacturing & Utilities' },
  { title: 'Marketing, Advertising & Public Relations' },
  { title: 'Sales & Retail' },
  { title: 'Technology' },
  { title: 'Transportation' },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search({ advancedSearch }) {
  const history = useHistory();
  const query = useQuery();

  // For getting options for select
  const [companyNameOptions, setCompanyNameOptions] = useState([]);

  // Query - Search input for two main inputs
  const [jobFilter, setJobFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Query - Other Search inputs
  const [datePosted, setDatePosted] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobType, setJobType] = useState('');
  const [industry, setIndustry] = useState('');

  const handleSearchSubmit = () => {
    if (!jobFilter && !locationFilter) {
      history.push('/');
      return;
    }
    const params = new URLSearchParams({
      jobs: jobFilter || null,
      location: locationFilter || null,
    });
    history.push({ pathname: '/', search: `${params.toString()}` });
  };

  const getCompanyNames = async () => {
    const queryParams = { page: 1, limit: 10 };
    const response = await getCompanies(queryParams);
    if (!response) {
      return;
    }
    const companyNames = [];
    response.data.nodes.forEach((company) => {
      companyNames.push({ title: company.name });
    });
    setCompanyNameOptions(companyNames);
  };

  useEffect(() => {
    const jobF = query.get('jobs');
    const locF = query.get('location');
    if (jobF !== 'null' && jobF !== null && jobF !== undefined && jobF !== '') {
      setJobFilter(jobF);
    }
    if (locF !== 'null' && locF !== null && locF !== undefined && locF !== '') {
      setLocationFilter(locF);
    }
    getCompanyNames();
  }, []);

  return (
    <div
      style={{
        height: '130px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          maxWidth: advancedSearch ? '1400px' : '900px',
          justifyContent: 'center',
          margin: '0 auto',
          marginTop: advancedSearch ? '-20px' : '20px',
          paddingLeft: '1rem',
          paddingRight: '1rem',
        }}
      >
        <Autocomplete
          value={jobFilter}
          onChange={(_, newValue) => {
            setJobFilter(newValue);
          }}
          freeSolo
          options={whatFilter.map((option) => option.title)}
          sx={{ width: '100%', padding: '5px' }}
          ListboxProps={{
            style: {
              maxHeight: '550px',
              borderColor: '#2557a7',
              borderWidth: '10px',
            },
          }}
          renderInput={(params) => (
            <TextField
              onChange={(e) => setJobFilter(e.target.value)}
              sx={{ boxShadow: 3 }}
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: (
                  <InputAdornment position="start">
                    <p
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '14px',
                        padding: '6px',
                      }}
                    >
                      {' '}
                      What
                    </p>
                  </InputAdornment>
                ),
                endAdornment: (
                  <div style={{ marginRight: '15px', marginTop: '5px' }}>
                    <SearchIcon fontSize="10px" />
                  </div>
                ),
              }}
              size="small"
              variant="outlined"
              placeholder="Job title, keywords, or company"
            />
          )}
        />
        <Autocomplete
          value={locationFilter}
          onChange={(_, newValue) => {
            setLocationFilter(newValue);
          }}
          freeSolo
          options={whereFilter.map((option) => option.title)}
          sx={{ width: '100%', padding: '5px', marginLeft: '5px' }}
          ListboxProps={{ style: { maxHeight: '550px' } }}
          renderInput={(params) => (
            <TextField
              onChange={(e) => setLocationFilter(e.target.value)}
              value={locationFilter}
              sx={{ boxShadow: 3 }}
              {...params}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                startAdornment: (
                  <InputAdornment position="start">
                    <p
                      style={{
                        fontWeight: 'bold',
                        color: 'black',
                        fontSize: '14px',
                        padding: '6px',
                      }}
                    >
                      {' '}
                      Where
                    </p>
                  </InputAdornment>
                ),
                endAdornment: (
                  <div style={{ marginRight: '15px', marginTop: '5px' }}>
                    <LocationOnIcon fontSize="10px" />
                  </div>
                ),
              }}
              size="small"
              variant="outlined"
              placeholder="City, state, zip code or remote"
            />
          )}
        />
        <Button
          onClick={handleSearchSubmit}
          label="Find jobs"
          type="button"
          style={{
            width: '200px',
            height: '45px',
            marginLeft: '10px',
            marginTop: '5px',
            fontSize: '14px',
          }}
        />
      </div>
      {!advancedSearch ? (
        <span style={{ marginTop: '30px' }}>
          <a href="#">
            Employers: post a job
          </a>
          {' '}
          - your next hire is here
        </span>
      ) : (
        <div
          style={{
            marginTop: '10px',
            display: 'flex',
            width: '100%',
            maxWidth: advancedSearch ? '1400px' : '900px',
            justifyContent: 'space-between',
            margin: '10px auto',
          }}
        >
          <CustomAutocomplete
            sx={{
              width: '100%',
              marginLeft: '5px',
              marginTop: '10px',
            }}
            placeholder="Date Posted"
            value={datePosted}
            setValue={setDatePosted}
            options={datePostedFilter}
            endAdornmentIcon={(
              <div style={{ marginRight: '15px', marginTop: '-10px' }}>
                <ArrowDropDownIcon fontSize="10px" />
              </div>
            )}
          />
          <CustomAutocomplete
            sx={{
              width: '100%',
              marginLeft: '50px',
              marginTop: '10px',
            }}
            placeholder="Company"
            value={companyName}
            setValue={setCompanyName}
            options={companyNameOptions}
            endAdornmentIcon={(
              <div style={{ marginRight: '15px', marginTop: '-10px' }}>
                <ArrowDropDownIcon fontSize="10px" />
              </div>
            )}
          />
          <CustomAutocomplete
            sx={{
              width: '100%',
              marginLeft: '50px',
              marginTop: '10px',
            }}
            placeholder="Job Type"
            value={jobType}
            setValue={setJobType}
            options={jobTypeFilter}
            endAdornmentIcon={(
              <div style={{ marginRight: '15px', marginTop: '-10px' }}>
                <ArrowDropDownIcon fontSize="10px" />
              </div>
            )}
          />
          <CustomAutocomplete
            sx={{
              width: '100%',
              marginLeft: '50px',
              marginTop: '10px',
            }}
            placeholder="Industry"
            value={industry}
            setValue={setIndustry}
            options={industryFilter}
            endAdornmentIcon={(
              <div style={{ marginRight: '15px', marginTop: '-10px' }}>
                <ArrowDropDownIcon fontSize="10px" />
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}

export default Search;
