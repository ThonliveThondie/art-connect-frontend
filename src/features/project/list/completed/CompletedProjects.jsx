import React, {useState} from 'react';
import ListCard from './ListCard';

const initialCompletedProjects = [
  {id: 1, title: '감성적인 테이크아dnt 컵 디자인 제작', designerName: '이수빈'},
  {id: 2, title: '여름 시즌 한정 메뉴판 디자인', designerName: 'jj_dream'},
];

export default function CompletedProjects() {
  const [projects] = useState(initialCompletedProjects);

  return (
    <div className="px-[120px] py-[26px] min-w-[1000px]">
      <div className="flex gap-[8px]">
        <h3 className="text-[18px] font-[800]">완료된 프로젝트</h3>
        <span className="font-[800] text-[18px] text-[#5F5E5B]">{projects.length}</span>
      </div>

      <div className="py-[20px] space-y-4">
        {projects.map((project) => (
          <ListCard key={project.id} title={project.title} designerName={project.designerName} />
        ))}
      </div>
    </div>
  );
}
