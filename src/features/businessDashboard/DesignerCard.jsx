import {useState} from 'react';
import WorkRequestModal from '../../components/modal/WorkRequest';
import AcceptButton from '../../components/common/buttons/AcceptButton';
import RefreshButton from '../../components/common/buttons/RefreshButton';

import SampleImg1 from '../../assets/samples/image1.jpg';
import SampleImg2 from '../../assets/samples/image2.jpg';
import DefaultProfile from '../../assets/icons/default-profile.svg';

export default function DesignerCard({designerId = 'designer123'}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalSuccess = (data) => {
    console.log('작업 의뢰서 전송 완료:', data);
  };

  return (
    <>
      <div className="relative flex flex-col gap-[16px] w-[471px] h-[254px] rounded-[12px] border border-black/10 px-[19px] py-[12px]">
        <div className="absolute top-[12px] right-[19px] flex items-center gap-[10px]">
          <AcceptButton hoverText="작업 의뢰서 보내기" onClick={() => setIsModalOpen(true)} />
          <RefreshButton />
        </div>

        <div className="flex items-center gap-[13px]">
          <img src={DefaultProfile} alt="디자이너 프로필" className="w-[64px] h-[64px] rounded-full object-cover" />
          <div className="flex flex-col gap-[6px]">
            <p className="font-[600]">하진</p>
            <p className="text-[#5F5E5B]">그래픽디자인 · 브랜딩</p>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-[#5F5E5B]">포트폴리오</p>
          <button className="underline">자세히 보기</button>
        </div>

        <div className="flex justify-between">
          <img
            src={SampleImg1}
            alt="포트폴리오 샘플 1"
            width={210}
            height={110}
            className="block w-[210px] h-[110px] rounded-[8px] object-cover bg-[#F6F5F4]"
          />
          <img
            src={SampleImg2}
            alt="포트폴리오 샘플 2"
            width={210}
            height={110}
            className="block w-[210px] h-[110px] rounded-[8px] object-cover bg-[#F6F5F4]"
          />
        </div>
      </div>
      <WorkRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        designerId={designerId}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}
