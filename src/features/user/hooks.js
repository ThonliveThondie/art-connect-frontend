import {saveDesignerProfile, saveBusinessProfile, uploadProfileImage} from '@/api/user';
import {useStore} from '@/store/useStore';

export const useSaveDesigner = () => {
  const save = async (designerData) => {
    try {
      return await saveDesignerProfile(designerData);
    } catch (err) {
      alert(err?.message || '저장 실패');
      return null;
    }
  };
  return {save};
};

export const useSaveBusiness = () => {
  const save = async (businessData) => {
    try {
      return await saveBusinessProfile(businessData);
    } catch (err) {
      alert(err?.message || '저장 실패');
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
      return await uploadProfileImage(file, userType);
    } catch (err) {
      alert(err?.message || '이미지 업로드 실패');
      return null;
    }
  };

  return {upload};
};
