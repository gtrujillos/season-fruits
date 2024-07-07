import React, { useState, useEffect } from 'react';

const Filter = ({ onFilterChange, filterType, searchText, sortOrder, onSortOrderChange }) => {
  const [currentFilterType, setCurrentFilterType] = useState(filterType);
  const [currentSearchText, setCurrentSearchText] = useState(searchText);

  useEffect(() => {
    setCurrentFilterType(filterType);
    setCurrentSearchText(searchText);
  }, [filterType, searchText]);

  const handleFilterTypeChange = (e) => {
    setCurrentFilterType(e.target.value);
  };

  const handleSearchTextChange = (e) => {
    setCurrentSearchText(e.target.value);
  };

  const handleSearch = () => {
    onFilterChange(currentFilterType, currentSearchText);
  };

  return (
    <div className="filter">
      <select value={currentFilterType} onChange={handleFilterTypeChange}>
        <option value="family">Family</option>
        <option value="order">Order</option>
        <option value="genus">Genus</option>
      </select>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search" 
          value={currentSearchText} 
          onChange={handleSearchTextChange} 
        />
        <button className="search-button" onClick={handleSearch}>
          <img src="/icons8-search.svg" alt="Search" />
        </button>
      </div>
      <button onClick={onSortOrderChange}>
        Order {sortOrder === 'asc' ? 'A - Z' : 'Z - A'}
      </button>
    </div>
  );
};

export default Filter;
