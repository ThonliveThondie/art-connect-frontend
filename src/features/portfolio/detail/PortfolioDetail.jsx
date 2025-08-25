import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {ChevronLeft} from 'lucide-react';
import {MoreHorizontal, Loader2} from 'lucide-react';
import MySwiper from '@/components/common/swiper/MySwiper';
import {useStore} from '@/store/useStore';
import {mapCategoriesToLabels} from '../../../api/utils/mapper';
import {usePortfolioDetail, useDeletePortfolio} from '../hooks/usePortfolio';
import {getDesignerPortfolioDetail} from '../../../api/portfolio/portfolio';

export default function PortfolioDetail() {
  const {id: portfolioId, designerId, portfolioId: designerPortfolioId} = useParams();
  const navigate = useNavigate();
  const userType = useStore((s) => s.userType);

  const isArtist = userType === 'artist';
  const isDesignerView = !!designerId; // designerId가 있으면 소상공인이 디자이너 포트폴리오를 보는 것
  const actualPortfolioId = isDesignerView ? designerPortfolioId : portfolioId;

  // 기존 훅 (아티스트 자신의 포트폴리오용)
  const {
    portfolio: myPortfolioData,
    isLoading: myIsLoading,
    error: myError,
  } = usePortfolioDetail(actualPortfolioId, !isDesignerView);
  const {remove: deletePortfolioAction, isLoading: isDeleting} = useDeletePortfolio();

  // 디자이너 포트폴리오 조회용 상태
  const [designerPortfolioData, setDesignerPortfolioData] = useState(null);
  const [designerLoading, setDesignerLoading] = useState(false);
  const [designerError, setDesignerError] = useState(null);

  // 디자이너 포트폴리오 조회
  useEffect(() => {
    if (isDesignerView && designerId && actualPortfolioId) {
      const fetchDesignerPortfolioDetail = async () => {
        try {
          setDesignerLoading(true);
          const response = await getDesignerPortfolioDetail(designerId, actualPortfolioId);
          setDesignerPortfolioData(response);
        } catch (err) {
          setDesignerError(err.message || '포트폴리오를 불러오는데 실패했습니다.');
          console.error('포트폴리오 상세 조회 실패:', err);
        } finally {
          setDesignerLoading(false);
        }
      };

      fetchDesignerPortfolioDetail();
    }
  }, [isDesignerView, designerId, actualPortfolioId]);

  // 사용할 데이터 결정
  const portfolioData = isDesignerView ? designerPortfolioData : myPortfolioData;
  const isLoading = isDesignerView ? designerLoading : myIsLoading;
  const error = isDesignerView ? designerError : myError;

  const handleEdit = () => {
    navigate(`/portfolio/item/${actualPortfolioId}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm('정말로 이 포트폴리오를 삭제하시겠습니까?\n삭제된 포트폴리오는 복구할 수 없습니다.')) return;

    try {
      await deletePortfolioAction(actualPortfolioId);
      alert('포트폴리오가 삭제되었습니다.');
      navigate('/portfolio');
    } catch (error) {
      console.error('포트폴리오 삭제 실패:', error);
      const errorMessage =
        error?.response?.data?.message || error?.message || '포트폴리오 삭제에 실패했습니다. 다시 시도해주세요.';
      alert(errorMessage);
    }
  };

  const handleBack = () => {
    if (isDesignerView) {
      navigate(`/designer/${designerId}/portfolio`);
    } else {
      navigate('/portfolio');
    }
  };

  if (isLoading) return null;

  if (error) {
    return (
      <div className="min-w-[1000px] py-[26px] px-[140px]">
        <button
          onClick={handleBack}
          className="mb-[32px] flex items-center gap-[4px] text-[14px] text-black/50 hover:text-black"
        >
          <ChevronLeft size="14px" />
          돌아가기
        </button>
        <div className="text-center py-20">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) return null;

  return (
    <div className="min-w-[1000px] py-[26px] px-[140px]">
      <button
        onClick={handleBack}
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
              {/* 추가 정보 (디자이너 뷰에서만) */}
              {isDesignerView && (
                <>
                  {portfolioData.workPeriod && (
                    <div className="flex items-center gap-[20px]">
                      <span className="text-black/50 flex-shrink-0">작업 기간</span>
                      <span className="block whitespace-nowrap overflow-x-auto">{portfolioData.workPeriod}</span>
                    </div>
                  )}
                  {portfolioData.tools && portfolioData.tools.length > 0 && (
                    <div className="flex items-center gap-[20px]">
                      <span className="text-black/50 flex-shrink-0">사용 도구</span>
                      <span className="block whitespace-nowrap overflow-x-auto">{portfolioData.tools.join(', ')}</span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* 디자이너인 경우에만 수정/삭제 버튼 표시 (본인 포트폴리오만) */}
          {isArtist && !isDesignerView && (
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

        {/* 프로젝트 정보 (디자이너 뷰에서 추가 정보가 있는 경우) */}
        {isDesignerView && (portfolioData.clientName || portfolioData.projectType) && (
          <div>
            <p className="font-semibold text-black/50 mb-[12px]">프로젝트 정보</p>
            <div className="space-y-[8px]">
              {portfolioData.clientName && (
                <div className="flex items-center gap-[20px]">
                  <span className="text-black/50 flex-shrink-0 w-[80px]">클라이언트</span>
                  <span>{portfolioData.clientName}</span>
                </div>
              )}
              {portfolioData.projectType && (
                <div className="flex items-center gap-[20px]">
                  <span className="text-black/50 flex-shrink-0 w-[80px]">프로젝트 유형</span>
                  <span>{portfolioData.projectType}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
