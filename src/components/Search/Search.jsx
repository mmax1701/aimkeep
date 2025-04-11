import { TextField, Box } from '@mui/material';
import React, { useRef } from 'react';

const Search = ({ onSearch }) => {
  const timeoutRef = useRef(null);

  const handleSearch = e => {
    const value = e.target.value;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 2,
      }}
    >
      <TextField
        id="search-aim"
        label="Пошук по назві цілі"
        variant="outlined"
        size="small" // уменьшает высоту
        onChange={handleSearch}
        sx={{
          width: '100%',
          maxWidth: 400,
          fontSize: '0.8rem',
        }}
        InputProps={{
          sx: {
            height: 36, // уменьшение высоты поля
            fontSize: '0.8rem', // размер текста внутри инпута
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: '0.75rem', // размер текста лейбла
          },
        }}
      />
    </Box>
  );
};

export default Search;
