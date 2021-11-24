import React from 'react';
import './css/Search.css';
// eslint-disable-next-line import/no-unresolved
import SearchIcon from '@mui/icons-material/Search';

const PopularSearches = () => (
  <>
    <hr className="separatingLine" />
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
    </div>
    <div className="searchStories">
      <p className="stories">
        Indeed helps people get jobs:
        <span className="stories2">Over 16 million stories shared</span>
      </p>
      <p className="stories" style={{ marginTop: '-2px' }}>
        Indeed también está disponible en
        <span className="stories2">español</span>
      </p>
    </div>
  </>
);

export default PopularSearches;
