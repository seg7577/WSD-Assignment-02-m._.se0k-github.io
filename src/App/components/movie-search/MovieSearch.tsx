import React, { useState, useEffect } from 'react';
import './MovieSearch.css';

interface DropdownEntry {
  key: string;
  options: Array<{ id: string; name: string }> | string[];
}

interface MovieSearchProps {
  dropdownEntries: DropdownEntry[];
  onOptionSelect: (key: string, value: string) => void;
  onClearOptions: () => void;
}

const MovieSearch = ({ dropdownEntries, onOptionSelect, onClearOptions }: MovieSearchProps) => {
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});

  // 드롭다운 초기화 함수
  const clearDropdowns = () => {
    const initialOptions: { [key: string]: string } = {};
    dropdownEntries.forEach((entry) => {
      initialOptions[entry.key] = '';
    });
    setSelectedOptions(initialOptions);
  };

  // 초기화 버튼 클릭 시 드롭다운 초기화
  const handleClearOptions = () => {
    clearDropdowns();
    onClearOptions();
  };

  const handleSelect = (key: string, option: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: option }));
    onOptionSelect(key, option);
  };

  useEffect(() => {
    clearDropdowns(); // 초기 렌더링 시 드롭다운 초기화
  }, [dropdownEntries]);

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
      <button className="clear-options" onClick={handleClearOptions}>
        초기화
      </button>
    </div>
  );
};

export default MovieSearch;
