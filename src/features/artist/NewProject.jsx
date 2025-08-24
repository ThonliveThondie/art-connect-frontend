import NewProjectCard from './NewProjectCard';
import NoProject from './NoProject';
import {useState, useEffect} from 'react';
import {getWorkRequestList, rejectWorkRequest, acceptWorkRequest} from '../../api/work-request/workRequest';

export default function NewProject() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 작업의뢰서 목록 조회
  const fetchWorkRequests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const workRequests = await getWorkRequestList();

      // API 응답 데이터를 컴포넌트에서 사용할 형식으로 변환
      const transformedProjects = workRequests.map((request) => ({
        id: request.id,
        title: request.projectTitle || '프로젝트명 없음',
        location: request.storeName || '매장명 없음',
        price: request.budget || 0,
        status: '대기',
      }));

      setProjects(transformedProjects);
    } catch (error) {
      console.error('작업의뢰서 목록 조회 실패:', error);
      const errorMessage = error?.response?.data?.message || error?.message || '작업의뢰서 목록 조회에 실패했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // 컴포넌트 마운트 시 작업의뢰서 목록 조회
  useEffect(() => {
    fetchWorkRequests();
  }, []);

  const handleAccept = async (id) => {
    // 사용자 확인
    if (!confirm('작업 의뢰를 수락하시겠습니까?')) {
      return;
    }

    try {
      // 작업의뢰서 수락 API 호출
      await acceptWorkRequest(id);

      // 성공 시 목록에서 제거 (수락된 프로젝트는 진행 중 프로젝트로 이동)
      setProjects((prev) => prev.filter((p) => p.id !== id));

      alert('작업 의뢰가 성공적으로 수락되었습니다.');
    } catch (error) {
      console.error('작업의뢰서 수락 실패:', error);
      const errorMessage = error?.response?.data?.message || error?.message || '작업 의뢰 수락 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  const handleReject = async (id) => {
    // 사용자 확인
    if (!confirm('작업 의뢰를 거절하시겠습니까?')) {
      return;
    }

    try {
      // 작업의뢰서 거절 API 호출
      await rejectWorkRequest(id);

      // 성공 시 목록에서 제거
      setProjects((prev) => prev.filter((p) => p.id !== id));

      alert('작업 의뢰가 성공적으로 거절되었습니다.');
    } catch (error) {
      console.error('작업의뢰서 거절 실패:', error);
      const errorMessage = error?.response?.data?.message || error?.message || '작업 의뢰 거절 중 오류가 발생했습니다.';
      alert(errorMessage);
    }
  };

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="px-[140px] py-[50px]">
        <p className="text-[18px] font-[600] w-40">새 프로젝트 제안</p>
        <div className="py-[20px] flex items-center justify-center">
          <div className="text-gray-500">작업의뢰서 목록을 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="px-[140px] py-[50px]">
        <p className="text-[18px] font-[600] w-40">새 프로젝트 제안</p>
        <div className="py-[20px] flex flex-col items-center justify-center gap-4">
          <div className="text-red-500">오류가 발생했습니다: {error}</div>
          <button onClick={fetchWorkRequests} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 프로젝트가 없으면 NoProject 컴포넌트 표시
  if (projects.length === 0 && !isLoading && !error) {
    return <NoProject />;
  }

  return (
    <div className="px-[140px] py-[50px]">
      <p className="text-[18px] font-[600] w-40">새 프로젝트 제안</p>
      <div className="py-[20px] space-y-4">
        {projects.map((project) => (
          <NewProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            location={project.location}
            price={project.price}
            onAccept={() => handleAccept(project.id)}
            onReject={() => handleReject(project.id)}
          />
        ))}
      </div>
    </div>
  );
}
