import NewProjectCard from './NewProjectCard';
import {useState} from 'react';

export default function NewProject() {
  const [projects, setProjects] = useState([
    {id: 1, title: '카페 로고 및 메뉴판 디자인', location: '월평양조장', price: 150000, status: '대기'},
    {id: 2, title: '카페 로고 및 메뉴판 디자인', location: '향양조장', price: 150000, status: '대기'},
    {id: 4, title: '카페 로고 및 메뉴판 디자인', location: '희망양조장', price: 150000, status: '대기'},
    {id: 5, title: '카페 로고 및 메뉴판 디자인', location: '희망양조장', price: 150000, status: '대기'},
  ]);

  const handleAccept = (id) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? {...p, status: '개발'} : p)));
  };

  const handleReject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="px-[140px] py-[50px]">
      <p className="text-[18px] font-[600] w-40">새 프로젝트 제안</p>
      <div className="py-[20px] space-y-4">
        {projects.map((project) => (
          <NewProjectCard
            key={project.id}
            {...project}
            onAccept={() => handleAccept(project.id)}
            onReject={() => handleReject(project.id)}
          />
        ))}
      </div>
    </div>
  );
}
