import React, { useState } from 'react';
import './MovieSearch.css';

const MovieSearch = ({
  dropdownEntries,
  onOptionSelect,
  onClearOptions,
}: {
  dropdownEntries: Array<{
    key: string;
    options: string[];
  }>;
  onOptionSelect: (key: string, value: string) => void;
  onClearOptions: () => void;
}) => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  const handleSelect = (key: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: option }));
    onOptionSelect(key, option);
  };

  return (
    <div className="dropdown-container">
      <label>선호하는 설정을 선택하세요</label>
      {dropdownEntries.map((dropdown) => (
        <div className="custom-select" key={dropdown.key}>
          <select
            value={selectedOptions[dropdown.key] || ''}
            onChange={(e) => handleSelect(dropdown.key, e.target.value)}
          >
            <option value="" disabled>
              선택하세요
            </option>
            {dropdown.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
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
