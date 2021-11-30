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
import getJobs from '../../api/jobs/get';
import {
  datePostedFilter, whereFilter,
} from '../../utils/staticData';

let whatFilter = [
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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search({ advancedSearch }) {
  const history = useHistory();
  const query = useQuery();
  const location = useLocation();

  // For getting options for select
  const [companyNameOptions, setCompanyNameOptions] = useState([]);

  // Query - Search input for two main inputs
  const [jobFilter, setJobFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Query - Other Search inputs
  const [datePosted, setDatePosted] = useState('Any date');
  const [companyName, setCompanyName] = useState('');
  // const [jobType, setJobType] = useState('');
  // const [industry, setIndustry] = useState('');

  useEffect(() => {
    const jobFilterFromURL = query.getAll('jobs');
    if (!jobFilterFromURL.length) {
      return;
    }
    setJobFilter(jobFilterFromURL[0]);
  }, [history.location]);

  const getSuggestions = async () => {
    const res = await getJobs({ q: jobFilter });
    if (!res) {
      return;
    }
    if (res.data.nodes.length > 0) {
      const set = new Set();
      res.data.nodes.forEach((job) => {
        set.add(job.title);
      });
      const temp = Array.from(set);
      const suggestions = [];
      temp.forEach((title) => {
        suggestions.push({ title });
      });
      whatFilter = suggestions;
    }
  };

  useEffect(() => {
    if (jobFilter.length > 1) {
      getSuggestions();
    }
  }, [jobFilter]);

  useEffect(() => {
    let date = new Date();
    switch (datePosted) {
      case 'Last 24 hours': date.setDate(date.getDate() - 1);
        break;
      case 'Last 3 days': date.setDate(date.getDate() - 3);
        break;
      case 'Last 7 days': date.setDate(date.getDate() - 7);
        break;
      case 'Last 14 days': date.setDate(date.getDate() - 14);
        break;
      default:
        date = null;
    }
    if (date != null) {
      const params = new URLSearchParams({
        jobs: jobFilter || null,
        location: locationFilter || null,
        since: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      });
      history.push({ pathname: '/', search: `${params.toString()}` });
      return;
    }
    const params = new URLSearchParams({
      jobs: jobFilter || null,
      location: locationFilter || null,
      since: null,
    });
    history.push({ pathname: '/', search: `${params.toString()}` });
  }, [datePosted]);

  useEffect(() => {
    if (companyName && companyName.length) {
      setJobFilter(companyName);
      const params = new URLSearchParams({
        jobs: companyName || null,
        location: locationFilter || null,
      });
      history.push({ pathname: '/', search: `${params.toString()}` });
    }
  }, [companyName]);

  useEffect(() => {
    if (jobFilter === 'null') { setJobFilter(''); }
  }, [jobFilter]);

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
    if (location.search && location.search.length > 0) {
      getCompanyNames();
    }
  }, []);

  return (
    <div
      style={{
        height: '130px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        marginTop: '20px',
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
              placeholder="City, state"
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
            border: '1px solid #2557a7',
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
            display: 'flex',
            width: '100%',
            maxWidth: advancedSearch ? '1400px' : '900px',
            justifyContent: 'center',
            marginTop: '20px',
            marginRight: '118px',
          }}
        >
          <CustomAutocomplete
            sx={{
              width: '300px',
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
              width: '300px',
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
        </div>
      )}
    </div>
  );
}

export default Search;
