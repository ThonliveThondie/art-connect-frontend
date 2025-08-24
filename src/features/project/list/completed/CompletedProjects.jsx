import React, {useState, useEffect} from 'react';
import {useStore} from '@/store/useStore';
import {getBusinessOwnerCompletedWorkRequestList, getDesignerCompletedWorkRequestList} from '@/api/work-request/workRequest';
import ListCard from './ListCard';

export default function CompletedProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const {userType} = useStore();

  // 완료된 프로젝트 목록 조회
  const fetchCompletedProjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      let data;
      
      // 사용자 유형에 따라 다른 API 호출
      if (userType === 'business') {
        // 소상공인: 자신이 완료한 프로젝트 조회
        data = await getBusinessOwnerCompletedWorkRequestList();
      } else if (userType === 'artist') {
        // 디자이너: 완료한 프로젝트 조회
        data = await getDesignerCompletedWorkRequestList();
      } else {
        // 사용자 유형이 없는 경우 빈 배열
        setProjects([]);
        setIsLoading(false);
        return;
      }
      
      setProjects(data);
    } catch (error) {
      console.error('완료된 프로젝트 목록 조회 실패:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 데이터 조회
  useEffect(() => {
    fetchCompletedProjects();
  }, [userType]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="px-[120px] py-[26px] min-w-[1000px]">
        <div className="flex gap-[8px]">
          <h3 className="text-[18px] font-[800]">완료된 프로젝트</h3>
          <span className="font-[800] text-[18px] text-[#5F5E5B]">0</span>
        </div>
        <div className="py-[20px] flex items-center justify-center">
          <div className="text-gray-500">완료된 프로젝트를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="px-[120px] py-[26px] min-w-[1000px]">
        <div className="flex gap-[8px]">
          <h3 className="text-[18px] font-[800]">완료된 프로젝트</h3>
          <span className="font-[800] text-[18px] text-[#5F5E5B]">0</span>
        </div>
        <div className="py-[20px] flex flex-col items-center justify-center gap-4">
          <div className="text-red-500">오류가 발생했습니다: {error}</div>
          <button
            onClick={fetchCompletedProjects}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-[120px] py-[26px] min-w-[1000px]">
      <div className="flex gap-[8px]">
        <h3 className="text-[18px] font-[800]">완료된 프로젝트</h3>
        <span className="font-[800] text-[18px] text-[#5F5E5B]">{projects.length}</span>
      </div>

      <div className="py-[20px] space-y-4">
        {projects.length === 0 ? (
          <div className="flex items-center justify-center py-[60px]">
            <div className="text-black/20 text-center">
              <p className="text-[18px]">완료된 프로젝트가 없습니다.</p>
            </div>
          </div>
        ) : (
          projects.map((project) => (
            <ListCard 
              key={project.id} 
              project={project}
              userType={userType}
            />
          ))
        )}
      </div>
    </div>
  );
}
