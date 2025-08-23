import React from 'react';

export default function CompletedListCard({project, userType}) {
  // 사용자 유형에 따라 표시할 데이터 결정
  const getDisplayData = () => {
    if (userType === 'business') {
      // 소상공인: projectTitle, designerName 표시
      return {
        title: project.projectTitle,
        name: project.designerName,
        label: '디자이너'
      };
    } else if (userType === 'artist') {
      // 디자이너: projectTitle, storeName 표시
      return {
        title: project.projectTitle,
        name: project.storeName,
        label: '소상공인'
      };
    } else {
      // 기본값
      return {
        title: project.projectTitle || project.title,
        name: project.designerName || project.businessOwnerName,
        label: '사용자'
      };
    }
  };

  const displayData = getDisplayData();

  return (
    <div className="flex flex-col gap-[10px] w-full px-[26px] py-[20px] rounded-[13px] border border-black/10">
      <h4 className="text-[18px] font-[700]">{displayData.title}</h4>
      <div className="flex gap-1">
        <p>{displayData.name}</p>
        <span className="text-black/50">{displayData.label}</span>
      </div>
    </div>
  );
}
