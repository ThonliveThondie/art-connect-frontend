import {useParams, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {Clock} from 'lucide-react';
import BackButton from '@/components/common/buttons/BackButton';
import Header from './Header';
import Uploader from './Uploader';
import ConversationList from './conversation/ConversationList';
import {useStore} from '@/store/useStore';

const dummyHeader = {
  status: 'reviewing',
  title: '카페 로고 및 메뉴판 디자인',
  company: '페일카멜',
  designer: '박나리',
  contractDate: '2025.07.25',
};

export default function ProjectDetail() {
  const {projectId} = useParams();
  const navigate = useNavigate();

  const userType = useStore((s) => s.userType);
  const isArtist = userType === 'artist';
  const isBusiness = userType === 'business';

  return (
    <div className="min-w-[1000px] py-[26px] px-[140px]">
      {/* 헤더 */}
      <div className="mb-[100px]">
        <BackButton />
        <Header
          status={dummyHeader.status}
          title={dummyHeader.title}
          company={dummyHeader.company}
          designer={dummyHeader.designer}
          contractDate={dummyHeader.contractDate}
          showCompleteButton={isBusiness}
        />
      </div>

      {/* 시안 업로드(아티스트뷰) */}
      {isArtist && <Uploader className="mb-[120px]" />}

      <h3 className="mb-[25px] font-[600] text-[18px]">시안 및 피드백 내역</h3>
      {/* 채팅 없을때(비지니스뷰) */}
      {/* {isBusiness && (
        <div className="flex py-[60px] items-centerjustify-center">
          <div className="text-black/20 flex flex-col items-center">
            <Clock size={60} className="mb-2" />
            <p className="text-center text-[24px] leading-[44px]">
              디자이너가 시안을 준비하고 있습니다. <br />
              조금만 기다려주세요.
            </p>
          </div>
        </div>
      )} */}

      {/* 대화 */}
      <ConversationList />
    </div>
  );
}
