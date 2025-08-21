import {useEffect, useState} from 'react';
import {useProfile, useSaveDesigner, useUploadImage} from './hooks';
import ProfileSide from './ProfileSide';
import ProfileForm from './ProfileForm';
import ExtraFields from './ExtraFields';
import {CATEGORY_OPTIONS, STYLE_OPTIONS, toValueArray} from './ProfileOptions';

export default function ProfileArtist() {
  const {profile} = useProfile();
  const {save: saveDesigner} = useSaveDesigner();
  const {upload} = useUploadImage();

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    imageUrl: '',
    email: '',
    nickName: '',
    phoneNumber: '',
    education: '',
    major: '',
    designCategories: [],
    designStyles: [],
  });

  useEffect(() => {
    if (profile) {
      setProfileData((prev) => ({
        ...prev,
        imageUrl: profile.imageUrl ?? '',
        email: profile.email ?? '',
        nickName: profile.nickName ?? profile.nickname ?? '',
        phoneNumber: profile.phoneNumber ?? '',
        education: profile.education ?? '',
        major: profile.major ?? '',
        designCategories: toValueArray(profile.designCategories ?? [], CATEGORY_OPTIONS),
        designStyles: toValueArray(profile.designStyles ?? [], STYLE_OPTIONS),
      }));
    }
  }, [profile]);

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setIsEditing(false);
    if (profile) {
      setProfileData((prev) => ({
        ...prev,
        imageUrl: profile.imageUrl ?? '',
        email: profile.email ?? '',
        nickName: profile.nickName ?? profile.nickname ?? '',
        phoneNumber: profile.phoneNumber ?? '',
        education: profile.education ?? '',
        major: profile.major ?? '',
        designCategories: toValueArray(profile.designCategories ?? [], CATEGORY_OPTIONS),
        designStyles: toValueArray(profile.designStyles ?? [], STYLE_OPTIONS),
      }));
    }
  };

  const handleSave = async () => {
    const {email, nickname, ...rest} = profileData;

    const payload = {
      ...rest,
      designCategories: toValueArray(rest.designCategories, CATEGORY_OPTIONS),
      designStyles: toValueArray(rest.designStyles, STYLE_OPTIONS),
    };

    await saveDesigner(payload);
    setIsEditing(false);
  };

  const handleImageUpload = async (file) => {
    const res = await upload(file);
    if (res?.profileImageUrl) {
      setProfileData((p) => ({...p, imageUrl: res.profileImageUrl}));
    }
  };

  const updateField = (field, value) => {
    if (field === 'email') return;
    setProfileData((p) => ({...p, [field]: value}));
  };

  return (
    <div className="min-w-[1000px] px-[140px] py-[26px]">
      <div className="flex justify-between mb-[32px]">
        <h3 className="text-[18px] font-[600]">내 정보</h3>
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

      <div className="flex gap-[52px]">
        {/* 프로필 이미지 영역 */}
        <div className="flex-shrink-0">
          <ProfileSide profileImage={profileData.imageUrl} onImageUpload={handleImageUpload} isEditing={isEditing} />
        </div>

        {/* 폼 영역 */}
        <div className="flex-1">
          <ProfileForm profileData={profileData} isEditing={isEditing} onFieldChange={updateField} />
          <ExtraFields profileData={profileData} isEditing={isEditing} onFieldChange={updateField} />
        </div>
      </div>
    </div>
  );
}
