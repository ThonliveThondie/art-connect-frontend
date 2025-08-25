import {Plus} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import Card from './Card';
import DefaultProfile from '../../../assets/images/default-profile-img.svg';
import BackButton from '../../../components/common/buttons/BackButton';
import {useStore} from '@/store/useStore';
import {mapCategoriesToLabels, mapStylesToLabels} from '../../../api/utils/mapper';
import useProfile from '@/hooks/useProfile';
import {useMyPortfolios} from '../hooks/usePortfolio';
import {getDesignerPortfolios} from '../../../api/portfolio/portfolio';

const PLACEHOLDER = 'https://via.placeholder.com/300x300/E5E5E5/999999?text=No+Image';

const getThumbnailImage = (portfolioImages, fallbackUrl) => {
  const list = Array.isArray(portfolioImages) ? portfolioImages : [];

  // isThumbnail이 true인 이미지 찾기
  const thumb = list.find((img) => img?.isThumbnail === true);
  if (thumb?.imageUrl) return thumb.imageUrl;

  // 썸네일이 없으면 첫 번째 이미지 사용
  const first = list[0];
  if (first?.imageUrl) return first.imageUrl;

  return fallbackUrl || PLACEHOLDER;
};

export default function Portfolio() {
  const userType = useStore((s) => s.userType);
  const isArtist = userType === 'artist';
  const navigate = useNavigate();
  const {designerId} = useParams(); // URL에서 designerId 파라미터 가져오기
  const isDesignerView = !!designerId; // designerId가 있으면 소상공인이 디자이너 포트폴리오를 보는 것

  const {profile} = useProfile();
  const {portfolios} = useMyPortfolios(!isDesignerView); // 디자이너 뷰일 때는 호출하지 않음

  // 디자이너 포트폴리오 조회를 위한 상태
  const [designerPortfolios, setDesignerPortfolios] = useState([]);
  const [designerInfo, setDesignerInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 디자이너 포트폴리오 조회
  useEffect(() => {
    if (isDesignerView && designerId) {
      const fetchDesignerPortfolios = async () => {
        try {
          setLoading(true);
          const response = await getDesignerPortfolios(designerId);

          // 새로운 API 응답 구조 처리: {designerInfo, portfolios}
          setDesignerPortfolios(response.portfolios || []);
          setDesignerInfo(response.designerInfo || null);
        } catch (err) {
          setError(err.message || '포트폴리오를 불러오는데 실패했습니다.');
          console.error('포트폴리오 조회 실패:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchDesignerPortfolios();
    }
  }, [isDesignerView, designerId]);

  // 사용할 포트폴리오 데이터 결정
  const filteredPortfolios = isDesignerView ? designerPortfolios : portfolios || [];

  const handleAddPortfolio = () => {
    navigate('/portfolio/add');
  };

  const handleCardClick = (portfolioId) => {
    if (isDesignerView) {
      navigate(`/designer/${designerId}/portfolio/${portfolioId}`);
    } else {
      navigate(`/portfolio/item/${portfolioId}`);
    }
  };

  const transformedPortfolios = filteredPortfolios.map((p) => ({
    id: p.portfolioId,
    title: p.title,
    category: mapCategoriesToLabels(p.designCategories).join(' · '),
    image: getThumbnailImage(p.portfolioImages),
    tags: mapCategoriesToLabels(p.designCategories),
    designerName: p.designerNickname,
    imageCount: p.portfolioImages?.length || 0,
    categoryCount: p.designCategories?.length || 0,
    createdAt: p.createdAt,
  }));

  // 로딩 상태 처리
  if (isDesignerView && loading) {
    return (
      <div className="min-w-[1000px] py-[26px] px-[140px]">
        <BackButton />
        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-gray-600">포트폴리오를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (isDesignerView && error) {
    return (
      <div className="min-w-[1000px] py-[26px] px-[140px]">
        <BackButton />
        <div className="flex items-center justify-center py-20">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  // 표시할 프로필 정보 결정
  const displayProfile = isDesignerView ? designerInfo : profile;

  return (
    <div className="min-w-[1000px] py-[26px] px-[140px]">
      {(isDesignerView || !isArtist) && <BackButton />}

      {/* 프로필 영역 */}
      <div className="flex items-start gap-[32px] mb-[89px]">
        <div className="overflow-hidden h-[144px] w-[144px] rounded-full">
          <img
            src={displayProfile?.profileImageUrl || displayProfile?.imageUrl || DefaultProfile}
            alt="프로필"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-[24px] font-[700] mb-[18px]">
            {displayProfile?.nickname ?? transformedPortfolios[0]?.designerName ?? (isDesignerView ? '디자이너' : '-')}
          </h1>
          <div className="space-y-[10px] text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-gray-400 w-[102px]">학력・전공</span>
              <span>
                {displayProfile?.education ? `${displayProfile.education} ${displayProfile.major || ''}` : '-'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 w-[102px]">전문 분야</span>
              <span>
                {isDesignerView && displayProfile?.specialities?.length
                  ? mapCategoriesToLabels(displayProfile.specialities).join(' · ')
                  : displayProfile?.designCategories?.length
                  ? mapCategoriesToLabels(displayProfile.designCategories).join(' · ')
                  : '-'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 w-[102px]">디자인 스타일</span>
              <span>
                {displayProfile?.designStyles?.length
                  ? mapStylesToLabels(displayProfile.designStyles).join(' · ')
                  : '-'}
              </span>
            </div>
            {isDesignerView && displayProfile?.introduction && (
              <div className="flex items-start">
                <span className="text-gray-400 w-[102px]">소개</span>
                <span className="flex-1">{displayProfile.introduction}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 포트폴리오 헤더 */}
      <div className="flex items-center justify-between mb-[20px]">
        <h3 className="text-[16px] font-[600]">
          포트폴리오
          <span className="ml-[8px] font-[800] text-[18px] text-[#5F5E5B]">{transformedPortfolios.length}</span>
        </h3>

        {isArtist && !isDesignerView && (
          <button
            onClick={handleAddPortfolio}
            className="flex items-center gap-[4px] text-black/60 rounded-[4px] px-[8px] hover:text-black hover:bg-[#F1EEEC]"
          >
            <Plus size={14} />
            포트폴리오 추가
          </button>
        )}
      </div>

      {/* 포트폴리오 목록 */}
      {transformedPortfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[35px] gap-y-[20px] justify-items-center">
          {transformedPortfolios.map((p) => (
            <div key={p.id} onClick={() => handleCardClick(p.id)}>
              <Card title={p.title} category={p.category} image={p.image} tags={p.tags} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          {isArtist && !isDesignerView ? (
            <>
              <div
                onClick={handleAddPortfolio}
                className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center cursor-pointer"
              >
                <Plus size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">첫 번째 포트폴리오를 추가해보세요</h3>
              <p className="text-gray-500 mb-4">당신의 작품을 세상에 보여주세요</p>
            </>
          ) : (
            <>
              <div className="text-lg text-gray-600 mb-2">등록된 포트폴리오가 없습니다.</div>
              <p className="text-gray-500">이 디자이너가 포트폴리오를 업로드하면 여기에 표시됩니다.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
