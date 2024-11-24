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
    setSelectedOptions((prev) => ({ ...prev, [key]: option })); // 선택된 값을 로컬 상태에 저장
    onOptionSelect(key, option); // 선택된 값을 부모 컴포넌트로 전달
  };

  return (
    <div className="dropdown-container">
      <label>필터</label>
      {dropdownEntries.map((dropdown) => (
        <div className="custom-select" key={dropdown.key}>
          <select
            value={selectedOptions[dropdown.key] || ''} // 선택된 값을 드롭다운에 표시
            onChange={(e) => handleSelect(dropdown.key, e.target.value)} // 선택된 값을 업데이트
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
