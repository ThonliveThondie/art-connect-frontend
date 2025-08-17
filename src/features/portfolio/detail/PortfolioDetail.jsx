import React from 'react';
import BackButton from '@/components/common/buttons/BackButton';
import {MoreHorizontal} from 'lucide-react';
import MySwiper from '@/components/common/swiper/MySwiper';

import img1 from '../../../assets/samples/image1.jpg';
import img2 from '../../../assets/samples/image2.jpg';

export default function PortfolioDetail({}) {
  const images = [img1, img2, img1, img2];

  const data = {
    title: 'Sage Petal 로고 & 명함 디자인',
    designerName: 'suum',
    categories: ['브랜딩', '그래픽'],
    images: [],
    description: `플라워샵 ‘Sage Petal’의 브랜드 아이덴티티를 확립하기 위해 진행한 프로젝트입니다. 은은한 뉴트럴 톤의 컬러 팔레트와 종이 질감을 살린 목업 스타일을 적용하여, 고급스럽고도 따뜻한 분위기를 연출했습니다.

로고는 세이지 잎사귀의 라인 드로잉을 활용해 자연친화적인 이미지를 강조했으며, 음각 느낌의 타이포그래피 처리를 통해 섬세한 디테일을 더했습니다.

명함 앞면에는 로고와 대표자 정보를 간결하게 배치하고, 뒷면에는 샵의 슬로건과 핵심 키워드를 넣어 브랜드 메시지를 강화했습니다.

최종 산출물은 실제 인쇄 후에도 색상과 질감이 유지될 수 있도록 고해상도 파일과 인쇄 가이드라인을 함께 제공했습니다.`,
  };

  return (
    <div className="min-w-[1000px] py-[26px] px-[140px]">
      <BackButton />

      <div className="flex flex-col gap-[100px]">
        <div>
          <div className="mb-[32px] flex items-start justify-between">
            <p className="text-[24px] font-bold">{data.title}</p>
            <button
              type="button"
              aria-label="더보기"
              className="px-[6px] py-[4px] text-black/60 rounded-[4px] hover:text-black hover:bg-[#F1EEEC]"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div>
            <div className="flex items-center gap-[100px]">
              <div className="flex items-center gap-[20px]">
                <span className="text-black/50">디자이너</span>
                <span>{data.designerName}</span>
              </div>
              <div className="flex items-center gap-[20px]">
                <span className="text-black/50">카테고리</span>
                <span>{data.categories.join(' · ')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-[920px] h-[645px] m-auto">
          <MySwiper images={images} />
        </div>

        <div>
          <p className="font-semibold text-black/50 mb-[12px]">상세 설명</p>
          <p className="whitespace-pre-wrap leading-[24px]">{data.description}</p>
        </div>
      </div>
    </div>
  );
}
