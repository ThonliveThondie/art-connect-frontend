import React from 'react';
import {useParams} from 'react-router-dom';

export default function ProjectDetail() {
  const {projectId} = useParams();

  return <div>프로젝트 상세 페이지 입니다</div>;
}
