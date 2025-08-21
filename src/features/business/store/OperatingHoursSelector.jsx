import React from 'react';

export default function OperatingHoursSelector({options, selectedValues, isEditing, onToggle}) {
  if (!Array.isArray(options) || options.length < 3) return null;
  const groupOptions = options.slice(0, 2);
  const timeOptions = options.slice(2);

  return (
    <div className="mb-[34px] space-y-6">
      {/* 평일, 주말/공휴일 */}
      <div className="flex gap-[8px]">
        {groupOptions.map((g) => {
          const selected = selectedValues.includes(g.value);
          return (
            <button
              key={g.value}
              type="button"
              onClick={() => isEditing && onToggle(g.value)}
              className={`px-[26px] py-[12px] rounded-[13px] border font-[600] w-[145px] ${
                selected ? 'bg-[#F1EEEC] border-[#9E9692] text-[#4A4644]' : 'bg-white border-black/10 text-black/50'
              } ${!isEditing ? 'cursor-default' : ''}`}
              disabled={!isEditing}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* 오전, 오후, 저녁, 심야 */}
      <div className="flex gap-[8px]">
        {timeOptions.map((t) => {
          const selected = selectedValues.includes(t.value);
          return (
            <button
              key={t.value}
              type="button"
              onClick={() => isEditing && onToggle(t.value)}
              className={`px-[26px] py-[12px] rounded-[13px] border font-[600] w-[90px] ${
                selected ? 'bg-[#F1EEEC] border-[#9E9692] text-[#4A4644]' : 'bg-white border-black/10 text-black/50'
              } ${!isEditing ? 'cursor-default' : ''}`}
              disabled={!isEditing}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
