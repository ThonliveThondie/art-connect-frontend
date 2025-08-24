import Dropdown from '@/components/common/form/Dropdown';
import {CATEGORY_OPTIONS, STYLE_OPTIONS} from '@/api/utils/mapper';
import {useMemo} from 'react';

export default function ExtraFields({profileData, isEditing, onFieldChange}) {
  // value -> label 매핑
  const CAT_V2L = useMemo(() => Object.fromEntries(CATEGORY_OPTIONS.map((o) => [o.value, o.label])), []);
  const STY_V2L = useMemo(() => Object.fromEntries(STYLE_OPTIONS.map((o) => [o.value, o.label])), []);

  return (
    <div>
      <div>
        <label className="label-title">학력</label>
        <input
          type="text"
          value={profileData.education || ''}
          onChange={(e) => onFieldChange('education', e.target.value)}
          disabled={!isEditing}
          className={`form-input ${!isEditing ? 'bg-[#F8F7F6]' : ''}`}
          placeholder="학교명을 입력해 주세요."
        />
      </div>

      <div>
        <label className="label-title">전공</label>
        <input
          type="text"
          value={profileData.major || ''}
          onChange={(e) => onFieldChange('major', e.target.value)}
          disabled={!isEditing}
          className={`form-input ${!isEditing ? 'bg-[#F8F7F6]' : ''}`}
          placeholder="전공을 입력해 주세요."
        />
      </div>

      <div>
        <label className="label-title">전문 분야</label>
        {isEditing ? (
          <Dropdown
            options={CATEGORY_OPTIONS}
            selectedValues={profileData.designCategories || []}
            onChange={(values) => onFieldChange('designCategories', values)}
            placeholder="전문으로 활동하는 분야를 선택해 주세요."
          />
        ) : (
          <div className="form-input bg-[#F8F7F6] min-h-[48px] flex items-center" aria-label="선택된 전문분야">
            {profileData.designCategories?.length ? (
              <div className="flex flex-wrap gap-[8px]">
                {profileData.designCategories.map((v) => (
                  <span key={v} className="inline-flex px-[12px] py-[4px] bg-[#EDECEA] rounded-[16px] text-[14px]">
                    {CAT_V2L[v] || v}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-black/50">전문으로 활동하는 분야를 선택해 주세요. (최대 3개)</span>
            )}
          </div>
        )}
      </div>

      <div>
        <label className="label-title">스타일</label>
        {isEditing ? (
          <Dropdown
            options={STYLE_OPTIONS}
            selectedValues={profileData.designStyles || []}
            onChange={(values) => onFieldChange('designStyles', values)}
            placeholder="추구하는 스타일을 선택해 주세요."
          />
        ) : (
          <div className="form-input bg-[#F8F7F6] min-h-[48px] flex items-center" aria-label="선택된 스타일">
            {profileData.designStyles?.length ? (
              <div className="flex flex-wrap gap-[8px]">
                {profileData.designStyles.map((v) => (
                  <span key={v} className="inline-flex px-[12px] py-[4px] bg-[#EDECEA] rounded-[16px] text-[14px]">
                    {STY_V2L[v] || v}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-black/50">추구하는 스타일을 선택해 주세요. (최대 3개)</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
