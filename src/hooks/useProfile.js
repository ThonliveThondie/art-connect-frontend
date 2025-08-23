import {useState, useEffect, useCallback} from 'react';
import {fetchMyProfile} from '@/api/user';

const useProfile = () => {
  const [profile, setProfile] = useState(null);

  const loadProfile = useCallback(async () => {
    try {
      const data = await fetchMyProfile();
      setProfile(data);
    } catch (err) {
      alert(err?.message || '프로필 조회에 실패했습니다.');
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return {
    profile,
    refetch: loadProfile,
  };
};

export default useProfile;
