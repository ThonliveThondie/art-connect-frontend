import React, {useEffect, useState} from 'react';
import '@/components/common/form/form.css';
import {fetchMyStore, saveStore, uploadStoreImage, deleteStoreImage, normalizeImages} from '@/api/store/store';
import StoreFileUpload from './StoreFileUpload';
import {X} from 'lucide-react';
import OperatingHoursSelector from './OperatingHoursSelector';

const OPERATING_HOUR_OPTIONS = [
  {label: '평일', value: 'WEEKDAYS'},
  {label: '주말/공휴일', value: 'WEEKENDS'},
  {label: '오전', value: 'MORNING'},
  {label: '오후', value: 'AFTERNOON'},
  {label: '저녁', value: 'EVENING'},
  {label: '심야', value: 'LATE_NIGHT'},
];

export default function StoreManagement() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    storeName: '',
    storeType: '',
    phoneNumber: '',
    operatingHours: [],
  });

  const [serverImages, setServerImages] = useState([]);
  const [pendingImages, setPendingImages] = useState([]);
  const [original, setOriginal] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyStore();
        setFormData({
          storeName: data.storeName ?? '',
          storeType: data.storeType ?? '',
          phoneNumber: data.phoneNumber ?? '',
          operatingHours: data.operatingHours ?? [],
        });
        setServerImages(data.images ?? []);
        setPendingImages([]);
        setOriginal({...data, images: data.images});
      } catch (e) {
        console.error('[GET stores/my] error', e);
      }
    })();
  }, []);

  const handleInputChange = (field, value) => setFormData((p) => ({...p, [field]: value}));

  const handleOperatingHoursToggle = (value) => {
    setFormData((p) => {
      const exists = p.operatingHours.includes(value);
      return {
        ...p,
        operatingHours: exists ? p.operatingHours.filter((v) => v !== value) : [...p.operatingHours, value],
      };
    });
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    if (original) {
      setFormData({
        storeName: original.storeName ?? '',
        storeType: original.storeType ?? '',
        phoneNumber: original.phoneNumber ?? '',
        operatingHours: original.operatingHours ?? [],
      });
      setServerImages(normalizeImages(original.images ?? []));
    }
    setPendingImages([]);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      await saveStore({
        storeName: formData.storeName,
        storeType: formData.storeType,
        phoneNumber: formData.phoneNumber,
        operatingHours: formData.operatingHours,
      });

      if (pendingImages.length > 0) {
        for (const file of pendingImages) {
          try {
            await uploadStoreImage(file);
          } catch (e) {
            console.warn('[upload image] err', e);
          }
        }
      }

      const fresh = await fetchMyStore();
      const normalized = normalizeImages(fresh.storeImages ?? fresh.images ?? []);
      setServerImages(normalized);
      setOriginal({...fresh, images: normalized});
      setPendingImages([]);
      setIsEditing(false);
    } catch (e) {
      console.error('[SAVE] err', e);
    }
  };

  const handleDeleteServerImage = async (imageId) => {
    const prev = serverImages;
    setServerImages((imgs) => imgs.filter((i) => i.id !== imageId));
    try {
      await deleteStoreImage(imageId);
    } catch (e) {
      setServerImages(prev);
    }
  };

  const handlePendingAdd = (payload) => {
    const arr = Array.isArray(payload) ? payload : Array.from(payload || []);
    setPendingImages((prev) => [...prev, ...arr]);
  };
  const handlePendingReplace = (updated) => setPendingImages(updated);

  const disabledClass = !isEditing ? 'bg-[#F8F7F6]' : '';

  return (
    <div className="px-[140px] py-[26px] min-w-[1000px]">
      <div className="flex justify-between items-center mb-[20px]">
        <h3 className="text-[18px] font-[800]">매장 정보 관리</h3>
        <div className="flex gap-[12px]">
          {!isEditing ? (
            <button onClick={handleEdit} className="text-[#4B83E3]">
              수정
            </button>
          ) : (
            <>
              <button onClick={handleCancel} className="text-[#4B83E3]">
                취소
              </button>
              <button onClick={handleSave} className="text-[#4B83E3]">
                저장
              </button>
            </>
          )}
        </div>
      </div>

      <div className="px-[26px] py-[20px] rounded-[13px] border border-black/10">
        <label className="label-title">매장명</label>
        <input
          type="text"
          className={`form-input ${disabledClass}`}
          placeholder="매장명을 입력해 주세요."
          value={formData.storeName}
          onChange={(e) => handleInputChange('storeName', e.target.value)}
          disabled={!isEditing}
        />

        <label className="label-title">매장 종류</label>
        <input
          type="text"
          className={`form-input ${disabledClass}`}
          placeholder="업종을 입력해 주세요. (예: 카페, 의류, 음식점)"
          value={formData.storeType}
          onChange={(e) => handleInputChange('storeType', e.target.value)}
          disabled={!isEditing}
        />

        <label className="label-title">전화번호</label>
        <input
          type="tel"
          className={`form-input ${disabledClass}`}
          placeholder="010-1234-5678"
          value={formData.phoneNumber}
          onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
          disabled={!isEditing}
        />

        <label className="label-title">운영 시간</label>
        <OperatingHoursSelector
          options={OPERATING_HOUR_OPTIONS}
          selectedValues={formData.operatingHours}
          isEditing={isEditing}
          onToggle={handleOperatingHoursToggle}
        />

        <label className="label-title">매장 이미지</label>
        <div className="flex flex-wrap gap-[12px] mb-[12px]">
          {serverImages.map((img) => (
            <div key={img.id} className="relative group w-[120px] h-[120px] rounded-[10px] overflow-hidden border">
              <img src={img.url} alt="" className="w-[120px] h-[120px] object-cover" />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleDeleteServerImage(img.id)}
                  className="absolute -top-[0px] -right-[0px] w-6 h-6 text-white"
                  title="이미지 삭제"
                >
                  <X size={18} strokeWidth={3} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* 업로더 */}
        <StoreFileUpload
          files={pendingImages}
          onFilesAdd={handlePendingAdd}
          onFileChange={handlePendingReplace}
          accept="image/*"
          multiple
          buttonText="파일 선택"
          showButton={isEditing}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
}
