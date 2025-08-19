import React, {useState} from 'react';
import FileUpload from '@/components/common/form/FileUpload';
import '@/components/common/form/form.css';

export default function StoreManagement() {
  const [formData, setFormData] = useState({
    images: [],
    storeName: '',
    storeType: '',
    phone: '',
    operatingHours: {
      weekdays: false,
      weekends: false,
      morning: false,
      afternoon: false,
      evening: false,
      lateNight: false,
    },
  });

  const handleImagesChange = (newImages) => {
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOperatingHoursChange = (timeType) => {
    setFormData((prev) => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [timeType]: !prev.operatingHours[timeType],
      },
    }));
  };

  const operatingHoursButtons = [
    {key: 'weekdays', label: '평일'},
    {key: 'weekends', label: '주말/공휴일'},
    {key: 'morning', label: '오전'},
    {key: 'afternoon', label: '오후'},
    {key: 'evening', label: '저녁'},
    {key: 'lateNight', label: '심야'},
  ];

  return (
    <div className="px-[140px] py-[26px] min-w-[1000px]">
      <div className="flex justify-between items-center mb-[20px]">
        <h3 className="text-[18px] font-[800]">매장 정보 관리</h3>
        <button type="submit" className="submit-btn">
          수정
        </button>
      </div>
      <div className="px-[26px] py-[20px] rounded-[13px] border boder-black/10">
        <label className="label-title">매장명</label>
        <input
          type="text"
          className="form-input"
          placeholder="매장명을 입력해 주세요."
          value={formData.storeName}
          onChange={(e) => handleInputChange('storeName', e.target.value)}
        />

        <label className="label-title">매장 종류</label>
        <input
          type="text"
          className="form-input"
          placeholder="업종을 입력해 주세요. (예: 카페, 의류, 음식점)"
          value={formData.storeType}
          onChange={(e) => handleInputChange('storeType', e.target.value)}
        />

        <label className="label-title">전화번호</label>
        <input
          type="tel"
          className="form-input"
          placeholder="010-1234-5678"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />

        <label className="label-title">운영 시간</label>
        <div className="mb-[34px]">
          {/* 첫 번째 줄 : 평일, 주말/공휴일 */}
          <div className="flex gap-[8px] mb-[8px]">
            {operatingHoursButtons.slice(0, 2).map((button) => (
              <button
                key={button.key}
                type="button"
                onClick={() => handleOperatingHoursChange(button.key)}
                className={`
                  px-[26px] py-[12px] rounded-[13px] border font-[600] w-[145px]
                  ${
                    formData.operatingHours[button.key]
                      ? 'bg-[#F1EEEC] border-[#9E9692] text-[#4A4644]'
                      : 'bg-white border-black/10 text-black/50'
                  }
                `}
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* 두 번째 줄 : 오전, 오후, 저녁, 심야 */}
          <div className="flex gap-[8px]">
            {operatingHoursButtons.slice(2, 6).map((button) => (
              <button
                key={button.key}
                type="button"
                onClick={() => handleOperatingHoursChange(button.key)}
                className={`
                  px-[26px] py-[12px] rounded-[13px] border font-[600] w-[90px]
                  ${
                    formData.operatingHours[button.key]
                      ? 'bg-[#F1EEEC] border-[#9E9692] text-[#4A4644]'
                      : 'bg-white border-black/10 text-black/50'
                  }
                `}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <label className="label-title">매장 이미지</label>
        <FileUpload
          files={formData.images}
          onFileChange={handleImagesChange}
          accept="image/*"
          multiple={true}
          buttonText="파일 선택"
        />
      </div>
    </div>
  );
}
