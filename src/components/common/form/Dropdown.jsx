import {useState} from 'react';
import {X, ChevronDown, ChevronUp} from 'lucide-react';
import {useMemo} from 'react';

export default function Dropdown({options = [], selectedValues = [], onChange, placeholder}) {
  const maxSelections = 3;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const normalizedOptions = useMemo(
    () => options.map((opt) => (typeof opt === 'string' ? {label: opt, value: opt} : opt)),
    [options]
  );

  const valueToLabel = useMemo(
    () => Object.fromEntries(normalizedOptions.map((o) => [o.value, o.label])),
    [normalizedOptions]
  );

  const handleOptionToggle = (option) => {
    const isAlreadySelected = selectedValues.includes(option);

    if (isAlreadySelected) {
      const newValues = selectedValues.filter((item) => item !== option);
      onChange(newValues);
    } else {
      if (selectedValues.length >= maxSelections) return;
      const newValues = [...selectedValues, option];
      onChange(newValues);
    }
  };

  return (
    <div>
      {/* 선택된 항목들 */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-[10px] mb-[8px]">
          {selectedValues.map((value) => {
            const label = valueToLabel[value] ?? value;
            return (
              <div
                key={value}
                className="inline-flex items-center gap-[8px] px-[12px] py-[8px] rounded-[22px] border border-black/20"
              >
                <span className="whitespace-nowrap text-[16px] font-[600]">{label}</span>
                <button
                  type="button"
                  onClick={() => handleOptionToggle(value)}
                  aria-label={`${label} 제거`}
                  title="제거"
                >
                  <X className="w-[14px] h-[14px]" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 드롭다운 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="form-input flex items-center justify-between"
        >
          <span className="text-black/50">
            {placeholder} (최대 {maxSelections}개)
          </span>
          {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {isDropdownOpen && (
          <div className="absolute w-full bg-white rounded-[12px] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] z-10 max-h-[240px] overflow-auto">
            {normalizedOptions.map((opt) => {
              const isSelected = selectedValues.includes(opt.value);
              const isMaxed = !isSelected && selectedValues.length >= maxSelections;

              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    if (!isMaxed) handleOptionToggle(opt.value);
                  }}
                  className={`w-full text-left px-[16px] py-[12px] ${isSelected ? 'bg-gray-100' : ''} ${
                    isMaxed ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                  }`}
                  disabled={isMaxed}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
