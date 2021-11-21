// Import packages
import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';

// Import files
import './css/Input.css';

function Input({
  label,
  type,
  value,
  isError,
  errorText,
  onChange,
  required = false,
  setIsVisited,
}) {
  return (
    <>
      <label htmlFor="input" className="customLabel">
        <span className={`${isError ? 'isErrorText' : ''}`}>{label}</span>
        <input
          onBlur={() => setIsVisited(true)}
          className={`customInput ${isError ? 'isError' : ''}`}
          type={type}
          value={value}
          onChange={(e) => onChange(e)}
          required={required}
        />
      </label>

      {isError ? (
        <div>
          <p className="errorMessage">
            <ErrorIcon style={{ fontSize: '18px', marginBottom: '-3px' }} />
            <span style={{ marginLeft: '10px' }}>
              Error:
              {' '}
              {errorText}
            </span>
          </p>
        </div>
      ) : null}
    </>
  );
}

export default Input;
