import '@/components/common/form/form.css';

export default function StoreForm({formData, isEditing, onFieldChange, onToggleOperatingHour}) {
  const OPERATING_HOUR_OPTIONS = [
    {label: '평일', value: 'WEEKDAYS'},
    {label: '주말/공휴일', value: 'WEEKENDS'},
    {label: '오전', value: 'MORNING'},
    {label: '오후', value: 'AFTERNOON'},
    {label: '저녁', value: 'EVENING'},
    {label: '심야', value: 'LATE_NIGHT'},
  ];
  const OH_VALUE_TO_LABEL = Object.fromEntries(OPERATING_HOUR_OPTIONS.map((o) => [o.value, o.label]));

  const disabledClass = !isEditing ? 'bg-[#F8F7F6]' : '';

  return (
    <div className="px-[26px] py-[20px] rounded-[13px] border border-black/10">
      {/* 매장명 */}
      <label className="label-title">매장명</label>
      <input
        type="text"
        className={`form-input ${disabledClass}`}
        placeholder="매장명을 입력해 주세요."
        value={formData.storeName}
        onChange={(e) => onFieldChange('storeName', e.target.value)}
        disabled={!isEditing}
      />

      {/* 전화번호 */}
      <label className="label-title">전화번호</label>
      <input
        type="tel"
        className={`form-input ${disabledClass}`}
        placeholder="010-1234-5678"
        value={formData.phoneNumber}
        onChange={(e) => onFieldChange('phoneNumber', e.target.value)}
        disabled={!isEditing}
      />

      {/* 매장 종류 */}
      <label className="label-title">매장 종류</label>
      <input
        type="text"
        className={`form-input ${disabledClass}`}
        placeholder="업종을 입력해 주세요. (예: 카페, 의류, 음식점)"
        value={formData.storeType}
        onChange={(e) => onFieldChange('storeType', e.target.value)}
        disabled={!isEditing}
      />

      {/* 운영 시간 */}
      <label className="label-title">운영 시간</label>
      {isEditing ? (
        <div className="mb-[34px]">
          <div className="flex flex-wrap gap-[8px]">
            {OPERATING_HOUR_OPTIONS.map((opt) => {
              const selected = formData.operatingHours.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onToggleOperatingHour(opt.value)}
                  className={`
                    px-[26px] py-[12px] rounded-[13px] border font-[600]
                    ${
                      selected
                        ? 'bg-[#F1EEEC] border-[#9E9692] text-[#4A4644]'
                        : 'bg-white border-black/10 text-black/50'
                    }
                  `}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="form-input bg-[#F8F7F6] min-h-[48px] flex items-center mb-[34px]">
          {formData.operatingHours?.length ? (
            <div className="flex flex-wrap gap-[8px]">
              {formData.operatingHours.map((v) => (
                <span key={v} className="inline-flex px-[12px] py-[4px] bg-[#EDECEA] rounded-[16px] text-[14px]">
                  {OH_VALUE_TO_LABEL[v] || v}
                </span>
              ))}
            </div>
          ) : (
            <span className="text-black/50">운영 시간을 선택하세요</span>
          )}
        </div>
      )}
    </div>
  );
}
