import React, { useRef } from 'react';

const Search = ({ onSearch }) => {
  const timeoutRef = useRef(null);

  const handleSearch = e => {
    const value = e.target.value;

    // Отменить предыдущий таймер
    clearTimeout(timeoutRef.current);

    // Установить новый таймер
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300); // задержка 300 мс
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Пошук по назві цілі"
          onChange={handleSearch}
        />
      </form>
    </div>
  );
};

export default Search;
