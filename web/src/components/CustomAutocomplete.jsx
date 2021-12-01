import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

function CustomAutocomplete({
  value,
  setValue,
  className = '',
  options,
  endAdornmentIcon,
  placeholder = '',
  sx,
  variant = 'filled',
}) {
  return (
    <Autocomplete
      className={className}
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      freeSolo
      options={options.map((option) => option.title)}
      sx={{ ...sx }}
      ListboxProps={{
        style: {
          maxHeight: '550px',
          borderColor: '#2557a7',
          borderWidth: '10px',
        },
      }}
      disableClearable
      renderInput={(params) => (
        <TextField
          className={className}
          rows={1}
          multiline
          variant={variant}
          onChange={(e) => setValue(e.target.value)}
          sx={{ textAlign: 'center' }}
          {...params}
          InputProps={{
            ...params.InputProps,
            type: 'search',
            disableUnderline: true,
            endAdornment: endAdornmentIcon,
          }}
          size="small"
          placeholder={placeholder}
        />
      )}
    />
  );
}

export default CustomAutocomplete;
