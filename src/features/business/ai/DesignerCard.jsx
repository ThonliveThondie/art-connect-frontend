import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import WorkRequestModal from '../../../components/modal/WorkRequest';
import AcceptButton from '../../../components/common/buttons/AcceptButton';
import RefreshButton from '../../../components/common/buttons/RefreshButton';

import SampleImg1 from '../../../assets/samples/image1.jpg';
import SampleImg2 from '../../../assets/samples/image2.jpg';
import DefaultProfile from '../../../assets/icons/default-profile.svg';

export default function DesignerCard({designerId = 'designer123', designer = null, designerIndex, onRefresh, isRefreshing = false}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // 디자이너 데이터에서 정보 추출
  const nickname = designer?.nickname || '디자이너';
  const specialty = designer?.specialty || '전문 분야 정보 없음';
  const profileImageUrl = designer?.profileImageUrl || DefaultProfile;
  
  // portfolioImageUrl 배열에서 imageUrl 추출
  const portfolioImages = designer?.portfolioImageUrl?.map(item => item.imageUrl) || [];

  const handlePortfolioView = () => {
    navigate('/portfolio', {
      state: {viewMode: 'browse', designerId},
    });
  };
  return (
    <>
      <div
        className="
          relative flex flex-col gap-[16px]
          flex-none shrink-0
          rounded-[12px] border border-black/10 px-[19px] py-[12px]
          overflow-hidden bg-white
        "
      >
        <div className="absolute top-[12px] right-[19px] flex items-center gap-[10px]">
          <AcceptButton hoverText="작업 의뢰서 보내기" onClick={() => setIsModalOpen(true)} />
          <RefreshButton 
            onClick={onRefresh} 
            disabled={isRefreshing}
            hoverText={isRefreshing ? "새로운 디자이너 추천 중..." : "새로운 디자이너 추천"}
          />
        </div>

        <div className="flex items-center gap-[13px]">
          <img
            src={profileImageUrl}
            alt="디자이너 프로필"
            className="w-[64px] h-[64px] rounded-full object-cover bg-[#F6F5F4] flex-none shrink-0"
            onError={(e) => {
              e.target.src = DefaultProfile;
            }}
          />
          <div className="flex flex-col gap-[6px] truncate">
            <p className="font-[600] leading-tight truncate">{nickname}</p>
            <p className="text-[#5F5E5B] leading-tight truncate">{specialty}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-[#5F5E5B]">포트폴리오</p>
          <button className="underline" onClick={handlePortfolioView}>
            자세히 보기
          </button>
        </div>

        <div className="flex justify-between">
          {portfolioImages.length > 0 ? (
            <>
              <img
                src={portfolioImages[0]}
                alt="포트폴리오 샘플 1"
                width={210}
                height={110}
                className="block w-[210px] h-[110px] rounded-[8px] object-cover bg-[#F6F5F4] flex-none shrink-0"
                onError={(e) => {
                  e.target.src = SampleImg1;
                }}
              />
              {portfolioImages[1] ? (
                <img
                  src={portfolioImages[1]}
                  alt="포트폴리오 샘플 2"
                  width={210}
                  height={110}
                  className="block w-[210px] h-[110px] rounded-[8px] object-cover bg-[#F6F5F4] flex-none shrink-0"
                  onError={(e) => {
                    e.target.src = SampleImg2;
                  }}
                />
              ) : (
                <div className="w-[210px] h-[110px] rounded-[8px] bg-[#F6F5F4] flex items-center justify-center text-gray-400 text-sm">
                  포트폴리오 이미지 없음
                </div>
              )}
            </>
          ) : (
            <>
              <img
                src={SampleImg1}
                alt="포트폴리오 샘플 1"
                width={210}
                height={110}
                className="block w-[210px] h-[110px] rounded-[8px] object-cover bg-[#F6F5F4] flex-none shrink-0"
              />
              <img
                src={SampleImg2}
                alt="포트폴리오 샘플 2"
                width={210}
                height={110}
                className="block w-[210px] h-[110px] rounded-[8px] object-cover bg-[#F6F5F4] flex-none shrink-0"
              />
            </>
          )}
        </div>
      </div>
      <WorkRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} designerId={designerId} />
    </>
  );
}
