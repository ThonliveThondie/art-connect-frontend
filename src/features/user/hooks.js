import {useState, useEffect} from 'react';
import {fetchMyProfile, saveDesignerProfile, saveBusinessProfile, uploadProfileImage} from '@/api/user';
import {useStore} from '@/store/useStore';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchMyProfile();
        setProfile(data);
      } catch {}
    })();
  }, []);
  return {profile};
};

export const useSaveDesigner = () => {
  const save = async (designerData) => {
    try {
      const result = await saveDesignerProfile(designerData);
      return result;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '저장 실패';
      alert(msg);
      return null;
    }
  };
  return {save};
};

export const useSaveBusiness = () => {
  const save = async (businessData) => {
    try {
      const result = await saveBusinessProfile(businessData);
      return result;
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '저장 실패';
      alert(msg);
      return null;
    }
  };
  return {save};
};

export const useUploadImage = () => {
  const {userType} = useStore.getState();

  const upload = async (file) => {
    if (!file) return null;
    try {
      const result = await uploadProfileImage(file, userType);
      return result;
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      return null;
    }
  };

  return {upload};
};
