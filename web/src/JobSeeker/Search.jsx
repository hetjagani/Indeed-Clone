import React from 'react';
import './search.css';
// eslint-disable-next-line import/no-unresolved
import SearchIcon from '@mui/icons-material/Search';

const Search = () => (
  <div className="search">
    <div>
      <h2 className="searchHeader">Popular searches</h2>
    </div>
    <div className="searchOptions">
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Remote</p>
      </div>
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Front Desk Receptionist</p>
      </div>
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Immediately Hiring</p>
      </div>
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Server</p>
      </div>
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Bartender</p>
      </div>
    </div>
    <div className="searchOptions">
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Medical Assistant</p>
      </div>
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Landscaping</p>
      </div>
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Daycare</p>
      </div>
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Airport</p>
      </div>
      <div className="option">
        <SearchIcon
          className="optionIcon"
          style={{ fontSize: '1.2rem', fontWeight: '100' }}
        />
        <p className="optionType">Dental Assistant</p>
      </div>
    </div>
    <div className="searchStories">
      <p className="stories">Indeed helps people get jobs: </p>
      <p className="stories2">Over 16 million stories shared</p>
    </div>
  </div>
);

export default Search;
