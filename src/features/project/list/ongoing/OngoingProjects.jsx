import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ListCard from './ListCard';
import StatusBadge from '@/components/common/badge/StatusBadge';
import {getAcceptedWorkRequestList} from '../../../../api/work-request/workRequest';

export default function OngoingProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 수락한 작업 목록 조회
  const fetchAcceptedProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const acceptedProjects = await getAcceptedWorkRequestList();
      
      // API 응답 데이터를 컴포넌트에서 사용할 형식으로 변환
      const transformedProjects = acceptedProjects.map(project => ({
        id: project.id,
        title: project.projectTitle || '프로젝트명 없음',
        status: project.status || 'PENDING',
        designerName: project.designerName || '디자이너명 없음'
      }));
      
      setProjects(transformedProjects);
    } catch (error) {
      console.error('수락한 작업 목록 조회 실패:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 수락한 작업 목록 조회
  useEffect(() => {
    fetchAcceptedProjects();
  }, []);

  const handleCardClick = (projectId) => {
    navigate(`/projects/${projectId}`);
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="px-[120px] py-[26px] min-w-[1000px]">
        <div className="flex gap-[8px]">
          <h3 className="text-[18px] font-[800]">진행 중인 프로젝트</h3>
          <span className="font-[800] text-[18px] text-[#5F5E5B]">-</span>
        </div>
        <div className="py-[20px] flex items-center justify-center">
          <div className="text-gray-500">진행 중인 프로젝트를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="px-[120px] py-[26px] min-w-[1000px]">
        <div className="flex gap-[8px]">
          <h3 className="text-[18px] font-[800]">진행 중인 프로젝트</h3>
          <span className="font-[800] text-[18px] text-[#5F5E5B]">-</span>
        </div>
        <div className="py-[20px] flex flex-col items-center justify-center gap-4">
          <div className="text-red-500">오류가 발생했습니다: {error}</div>
          <button 
            onClick={fetchAcceptedProjects}
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
        <h3 className="text-[18px] font-[800]">진행 중인 프로젝트</h3>
        <span className="font-[800] text-[18px] text-[#5F5E5B]">{projects.length}</span>
      </div>

      <div className="py-[20px] space-y-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} onClick={() => handleCardClick(project.id)} className="cursor-pointer">
              <ListCard
                title={project.title}
                designerName={project.designerName}
                renderStatus={() => <StatusBadge status={project.status} />}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            진행 중인 프로젝트가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
