import React from 'react';
import './MovieSearch.css';

interface DropdownEntry {
  key: string;
  options: Array<{ id: string; name: string }> | string[];
}

interface MovieSearchProps {
  dropdownEntries: DropdownEntry[];
  selectedOptions: { [key: string]: string | number }; // 부모 상태에서 전달받는 선택된 옵션
  onOptionSelect: (key: string, value: string) => void;
  onClearOptions: () => void;
}

const MovieSearch = ({
  dropdownEntries,
  selectedOptions,
  onOptionSelect,
  onClearOptions,
}: MovieSearchProps) => {
  const handleSelect = (key: string, value: string) => {
    onOptionSelect(key, value); // 부모 컴포넌트에 선택된 값 전달
  };

  return (
    <div className="dropdown-container">
      <label className="filter-label">필터</label>
      {dropdownEntries.map((dropdown) => (
        <div className="custom-select" key={dropdown.key}>
          <select
            value={selectedOptions[dropdown.key] || ''} // 부모에서 전달받은 상태 사용
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
