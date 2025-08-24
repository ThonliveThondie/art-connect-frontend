import React from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {ChevronLeft} from 'lucide-react';
import {MoreHorizontal, Loader2} from 'lucide-react';
import MySwiper from '@/components/common/swiper/MySwiper';
import {useStore} from '@/store/useStore';
import {mapCategoriesToLabels} from '../../../api/utils/mapper';
import {usePortfolioDetail, useDeletePortfolio} from '../hooks/usePortfolio';

export default function PortfolioDetail() {
  const {id: portfolioId} = useParams();
  const navigate = useNavigate();
  const userType = useStore((s) => s.userType);

  const isArtist = userType === 'artist';

  const {portfolio: portfolioData, isLoading, error} = usePortfolioDetail(portfolioId);
  const {remove: deletePortfolioAction, isLoading: isDeleting} = useDeletePortfolio();

  const handleEdit = () => {
    navigate(`/portfolio/${portfolioId}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 포트폴리오를 삭제하시겠습니까?\n삭제된 포트폴리오는 복구할 수 없습니다.')) return;

    try {
      await deletePortfolioAction(portfolioId);
      alert('포트폴리오가 삭제되었습니다.');
      navigate('/portfolio');
    } catch (error) {
      console.error('포트폴리오 삭제 실패:', error);
      const errorMessage =
        error?.response?.data?.message || error?.message || '포트폴리오 삭제에 실패했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    }
  };

  if (isLoading) return null;

  if (error) {
    return (
      <div className="min-w-[1000px] py-[26px] px-[140px]">
        <BackButton />
        <div className="text-center py-20">
          <p>포트폴리오를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) return null;

  return (
    <div className="min-w-[1000px] py-[26px] px-[140px]">
      <button
        onClick={() => navigate('/portfolio')}
        className="mb-[32px] flex items-center gap-[4px] text-[14px] text-black/50 hover:text-black"
      >
        <ChevronLeft size="14px" />
        돌아가기
      </button>

      <div className=" flex flex-col gap-[100px]">
        {/* 헤더 */}
        <div className="flex justify-between items-start mb-[40px]">
          <div className="min-w-0">
            <h1 className="text-[32px] font-[700] mb-[20px]">{portfolioData.title}</h1>
            <div className="flex flex-col gap-[12px]">
              {/* 디자이너 */}
              <div className="flex items-center gap-[20px]">
                <span className="text-black/50 flex-shrink-0">디자이너</span>
                <span className="block whitespace-nowrap overflow-x-auto">{portfolioData.designerNickname}</span>
              </div>
              {/* 카테고리 */}
              <div className="flex items-center gap-[20px]">
                <span className="text-black/50 flex-shrink-0">카테고리</span>
                <span className="block whitespace-nowrap overflow-x-auto">
                  {mapCategoriesToLabels(portfolioData.designCategories).join(' · ')}
                </span>
              </div>
            </div>
          </div>

          {/* 디자이너인 경우에만 수정/삭제 버튼 표시 */}
          {isArtist && (
            <div className="flex items-center gap-[10px]">
              <button onClick={handleEdit} className="text-[#4B83E3]">
                수정
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-[6px] text-[#E53E3E] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting && <Loader2 size={16} className="animate-spin" />}
                <span>삭제</span>
              </button>
              <button className="p-[8px] text-black/60 rounded-[6px] hover:text-black hover:bg-[#F1EEEC] transition-colors duration-200">
                <MoreHorizontal size={16} />
              </button>
            </div>
          )}
        </div>

        {/* 이미지 슬라이더 */}
        <div className="mb-[40px]">
          <MySwiper images={portfolioData.portfolioImages || []} />
        </div>

        {/* 상세 설명 */}
        <div>
          <p className="font-semibold text-black/50 mb-[12px]">상세 설명</p>
          <p className="whitespace-pre-wrap leading-[24px]">{portfolioData.description}</p>
        </div>
      </div>
    </div>
  );
}
