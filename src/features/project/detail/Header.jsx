import React, {useState} from 'react';
import {ClipboardList} from 'lucide-react';
import StatusBadge from '@/components/common/badge/StatusBadge';
import WorkRequestViewModal from '@/components/modal/WorkRequestView';
import ConfirmModal from '@/components/modal/ConfirmModal';

export default function Header({status = 'pending', title, company, designer, contractDate}) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isWorkRequestOpen, setIsWorkRequestOpen] = useState(false);

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
            <span className="text-gray-400 w-[80px]">계약일</span>
            <span>{contractDate}</span>
          </div>
        </div>
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-[10px]">
        <button
          onClick={() => setIsConfirmOpen(true)}
          className="bg-[#4A90E2] hover:bg-[#3C7DC9] text-white px-[30px] py-2 rounded-[8px] text-[15px] font-bold"
        >
          프로젝트 완료
        </button>

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
        onConfirm={() => {
          setIsConfirmOpen(false);
        }}
      />
      <WorkRequestViewModal isOpen={isWorkRequestOpen} onClose={() => setIsWorkRequestOpen(false)} workRequestId={1} />
    </div>
  );
}
