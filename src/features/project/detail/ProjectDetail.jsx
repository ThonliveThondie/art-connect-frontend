import {useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Clock} from 'lucide-react';
import BackButton from '@/components/common/buttons/BackButton';
import Header from './Header';
import Uploader from './Uploader';
import ConversationList from './conversation/ConversationList';
import {useStore} from '@/store/useStore';
import {getWorkSubmissions} from '@/api/work-request/workRequest';

export default function ProjectDetail() {
  const {projectId} = useParams();
  const navigate = useNavigate();

  const userType = useStore((s) => s.userType);
  const isArtist = userType === 'artist';
  const isBusiness = userType === 'business';

  // API 데이터 상태
  const [workData, setWorkData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 작업 제출물 데이터 조회
  const fetchWorkSubmissions = async () => {
    if (!projectId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await getWorkSubmissions(projectId);
      setWorkData(response);
    } catch (error) {
      console.error('작업 제출물 조회 실패:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkSubmissions();
  }, [projectId]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="min-w-[1000px] py-[26px] px-[140px]">
        <BackButton />
        <div className="flex items-center justify-center py-[100px]">
          <div className="text-gray-500">프로젝트 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className="min-w-[1000px] py-[26px] px-[140px]">
        <BackButton />
        <div className="flex flex-col items-center justify-center py-[100px] gap-4">
          <div className="text-red-500">오류가 발생했습니다: {error}</div>
          <button
            onClick={fetchWorkSubmissions}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 데이터가 없는 경우
  if (!workData) {
    return (
      <div className="min-w-[1000px] py-[26px] px-[140px]">
        <BackButton />
        <div className="flex items-center justify-center py-[100px]">
          <div className="text-gray-500">프로젝트 정보를 찾을 수 없습니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[1000px] py-[26px] px-[140px]">
      {/* 헤더 */}
      <div className="mb-[100px]">
        <BackButton />
        <Header
          status={workData.status}
          title={workData.projectTitle}
          company={workData.storeName}
          designer={workData.designerName}
          endDate={workData.endDate}
          showCompleteButton={isBusiness}
          workRequestId={workData.workRequestId}
          onProjectComplete={fetchWorkSubmissions}
        />
      </div>

      {/* 시안 업로드(아티스트뷰) */}
      {isArtist && <Uploader className="mb-[120px]" workRequestId={workData.workRequestId} onUploadSuccess={fetchWorkSubmissions} />}

      <h3 className="mb-[25px] font-[600] text-[18px]">시안 및 피드백 내역</h3>
      
      {/* 제출물이 없을 때 (비즈니스뷰) */}
      {isBusiness && (!workData.submissions || workData.submissions.length === 0) && (
        <div className="flex py-[60px] items-center justify-center">
          <div className="text-black/20 flex flex-col items-center">
            <Clock size={60} className="mb-2" />
            <p className="text-center text-[24px] leading-[44px]">
              디자이너가 시안을 준비하고 있습니다. <br />
              조금만 기다려주세요.
            </p>
          </div>
        </div>
      )}

      {/* 대화 */}
      {workData.submissions && workData.submissions.length > 0 && (
        <ConversationList submissions={workData.submissions} workRequestId={workData.workRequestId} onUpdate={fetchWorkSubmissions} />
      )}
    </div>
  );
}
