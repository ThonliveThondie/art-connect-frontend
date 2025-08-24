import {Plus} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import Card from './Card';
import DefaultProfile from '../../../assets/images/default-profile-img.svg';
import BackButton from '../../../components/common/buttons/BackButton';
import {useStore} from '@/store/useStore';
import {mapCategoriesToLabels, mapStylesToLabels} from '../../../api/utils/mapper';
import useProfile from '@/hooks/useProfile';
import {useMyPortfolios} from '../hooks/usePortfolio';

const PLACEHOLDER = 'https://via.placeholder.com/300x300/E5E5E5/999999?text=No+Image';

const getThumbnailImage = (portfolioImages, fallbackUrl) => {
  const list = Array.isArray(portfolioImages) ? portfolioImages : [];

  const pickUrl = (img) => img?.imageUrl || img?.url || null;

  const thumb = list.find((img) => img?.isThumbnail && pickUrl(img));
  if (thumb) return pickUrl(thumb);

  const first = list[0];
  if (first) return pickUrl(first) || fallbackUrl || PLACEHOLDER;

  return fallbackUrl || PLACEHOLDER;
};

export default function Portfolio() {
  const userType = useStore((s) => s.userType);
  const isArtist = userType === 'artist';
  const navigate = useNavigate();
  const {profile} = useProfile();
  const {portfolios} = useMyPortfolios();

  const handleAddPortfolio = () => {
    navigate('/portfolio/add');
  };

  const handleCardClick = (portfolioId) => {
    navigate(`/portfolio/${portfolioId}`);
  };

  const transformedPortfolios = (portfolios || []).map((p) => ({
    id: p.portfolioId,
    title: p.title,
    category: mapCategoriesToLabels(p.designCategories).join(' · '),
    image: p.thumbnailUrl || getThumbnailImage(p.portfolioImages),
    tags: mapCategoriesToLabels(p.designCategories),
    designerName: p.designerNickname,
    imageCount: p.imageCount,
    categoryCount: p.categoryCount,
    createdAt: p.createdAt,
  }));

  return (
    <div className="min-w-[1000px] py-[26px] px-[140px]">
      {!isArtist && <BackButton />}

      {/* 프로필 영역 */}
      <div className="flex items-start gap-[32px] mb-[89px]">
        <div className="overflow-hidden h-[144px] w-[144px] rounded-full">
          <img src={profile?.imageUrl || DefaultProfile} alt="프로필" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="text-[24px] font-[700] mb-[18px]">{profile?.nickName || '-'}</h1>
          <div className="space-y-[10px] text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-gray-400 w-[102px]">학력・전공</span>
              <span>{profile?.education ? `${profile.education} ${profile.major || ''}` : '-'}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 w-[102px]">전문 분야</span>
              <span>
                {profile?.designCategories?.length ? mapCategoriesToLabels(profile.designCategories).join(' · ') : '-'}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 w-[102px]">디자인 스타일</span>
              <span>{profile?.designStyles?.length ? mapStylesToLabels(profile.designStyles).join(' · ') : '-'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 포트폴리오 헤더 */}
      <div className="flex items-center justify-between mb-[20px]">
        <h3 className="text-[16px] font-[600]">
          {isArtist ? '포트폴리오' : '내 포트폴리오'}
          <span className="ml-[8px] font-[800] text-[18px] text-[#5F5E5B]">{transformedPortfolios.length}</span>
        </h3>

        {isArtist && (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[35px] gap-y-[20px] justify-items-center">
        {transformedPortfolios.map((p) => (
          <div key={p.id} onClick={() => handleCardClick(p.id)}>
            <Card title={p.title} category={p.category} image={p.image} tags={p.tags} />
          </div>
        ))}
      </div>
    </div>
  );
}
