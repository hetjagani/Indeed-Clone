import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

function CustomAutocomplete({
  value,
  setValue,
  options,
  endAdornmentIcon,
  placeholder = '',
  sx,
}) {
  return (
    <Autocomplete
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
          rows={1}
          multiline
          variant="filled"
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
