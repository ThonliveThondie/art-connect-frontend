import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {ClipboardList} from 'lucide-react';
import StatusBadge from '@/components/common/badge/StatusBadge';
import WorkRequestViewModal from '@/components/modal/WorkRequestView';
import ConfirmModal from '@/components/modal/ConfirmModal';
import {useStore} from '@/store/useStore';
import {completeWorkRequest} from '@/api/work-request/workRequest';

export default function Header({
  status = 'PENDING',
  title,
  company,
  designer,
  endDate,
  showCompleteButton = false,
  workRequestId, // 작업의뢰서 ID 추가
  onProjectComplete, // 프로젝트 완료 콜백 추가
}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isWorkRequestOpen, setIsWorkRequestOpen] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false); // 완료 처리 중 상태
  const {userType} = useStore(); // 사용자 유형 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

  // 프로젝트 완료 처리
  const handleProjectComplete = async () => {
    if (!workRequestId) {
      alert('작업 요청 ID가 없습니다.');
      return;
    }

    setIsCompleting(true);
    try {
      await completeWorkRequest(workRequestId);
      setIsConfirmOpen(false);
      
      // 부모 컴포넌트에 완료 알림
      if (onProjectComplete) {
        onProjectComplete();
      }
      
      // 진행 중인 프로젝트 목록 화면으로 이동
      navigate('/projects/ongoing');
    } catch (error) {
      alert('프로젝트 완료에 실패했습니다: ' + error.message);
    } finally {
      setIsCompleting(false);
    }
  };

  return (
    <div className="flex justify-between items-end">
      {/* 왼쪽 */}
      <div className="flex flex-col gap-[20px]">
        <div>
          <StatusBadge status={status} />
        </div>
        <h2 className="text-[24px] font-bold">{title}</h2>
        <div className="space-y-[10px] text-sm text-gray-600">
          <div className="flex items-center">
            <span className="text-gray-400 w-[80px]">소상공인</span>
            <span>{company}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 w-[80px]">디자이너</span>
            <span>{designer}</span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400 w-[80px]">납기일</span>
            <span>{endDate}</span>
          </div>
        </div>
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-[10px]">
        {showCompleteButton && (
          <button
            onClick={() => setIsConfirmOpen(true)}
            className="bg-[#4A90E2] hover:bg-[#3C7DC9] text-white px-[30px] py-2 rounded-[8px] text-[15px] font-bold"
          >
            프로젝트 완료
          </button>
        )}

        <button
          onClick={() => setIsWorkRequestOpen(true)}
          className="bg-[#F6F5F4] hover:bg-[#E8E7E5] rounded-[8px] w-[44px] h-[44px] flex items-center justify-center"
          aria-label="작업 의뢰서 보기"
          title="작업 의뢰서 보기"
        >
          <ClipboardList size={24} className="text-gray-600" />
        </button>
      </div>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleProjectComplete}
        isProcessing={isCompleting}
        confirmText={isCompleting ? "완료 중..." : "완료"}
      />
      <WorkRequestViewModal 
        isOpen={isWorkRequestOpen} 
        onClose={() => setIsWorkRequestOpen(false)} 
        workRequestId={workRequestId}
        userType={userType}
      />
    </div>
  );
}
