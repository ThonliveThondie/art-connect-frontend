import React, {useState} from 'react';
import ListCard from './ListCard';
import StatusBadge from '@/components/common/badge/StatusBadge'; // 경로 확인: /badge/ 제거

const initialProjects = [
  {id: 1, title: '카페 로고 및 메뉴판 디자인', status: 'pending', designerId: 'u-101', designerName: 'MINJI'},
  {
    id: 2,
    title: '테이크아웃 컵 & 포장 패키지 디자인',
    status: 'reviewing',
    designerId: 'u-102',
    designerName: 'dawoon_',
  },
  {id: 3, title: 'SNS 피드용 브랜드 이미지 제작', status: 'done', designerId: 'u-103', designerName: '비단'},
];

export default function OngoingProjects() {
  const [projects] = useState(initialProjects);

  return (
    <div className="px-[120px] py-[26px] min-w-[1000px]">
      <div className="flex gap-[8px]">
        <h3 className="text-[18px] font-[800]">진행 중인 프로젝트</h3>
        <span className="font-[800] text-[18px] text-[#5F5E5B]">{projects.length}</span>
      </div>

      <div className="py-[20px] space-y-4">
        {projects.map((project) => (
          <ListCard
            key={project.id}
            title={project.title}
            designerName={project.designerName}
            status={project.status}
            renderStatus={() => <StatusBadge status={project.status} />}
          />
        ))}
      </div>
    </div>
  );
}
