import React, { useState } from 'react';
import './MovieSearch.css';

const MovieSearch = ({
  dropdownEntries,
  onOptionSelect,
  onClearOptions,
}: {
  dropdownEntries: Array<{
    key: string;
    options: Array<{ id: string; name: string }> | string[];
  }>;
  onOptionSelect: (key: string, value: string) => void;
  onClearOptions: () => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  const handleSelect = (key: string, option: string) => {
    console.log(`Selected key: ${key}, value: ${option}`); // Debugging
    setSelectedOptions((prev) => ({ ...prev, [key]: option })); // 업데이트
    onOptionSelect(key, option); // 부모로 전달
  };

  return (
    <div className="dropdown-container">
      <label className="filter-label">필터</label>
      {dropdownEntries.map((dropdown) => (
        <div className="custom-select" key={dropdown.key}>
          <select
            value={selectedOptions[dropdown.key] || ''}
            onChange={(e) => handleSelect(dropdown.key, e.target.value)}
          >
            <option value="" disabled>
              선택하세요
            </option>
            {Array.isArray(dropdown.options) &&
              dropdown.options.map((option) =>
                typeof option === 'string' ? (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ) : (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                )
              )}
          </select>
        </div>
      ))}
      <button className="clear-options" onClick={onClearOptions}>
        초기화
      </button>
    </div>
  );
};


export default MovieSearch;
