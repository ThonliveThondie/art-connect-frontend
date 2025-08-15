import {Plus} from 'lucide-react';
import {useNavigate, useLocation} from 'react-router-dom';
import Card from './Card';
import DefaultProfile from '../../assets/images/default-profile-img.svg';
import BackButton from '../../components/common/buttons/BackButton';

export default function Portfolio({userType}) {
  const navigate = useNavigate();
  const location = useLocation();

  const viewMode = location.state?.viewMode || 'own'; // 'own' 또는 'browse'
  const designerId = location.state?.designerId;
  const isBrowsingMode = userType === 'business' || viewMode === 'browse';

  const handleGoBack = () => {
    navigate(isBrowsingMode ? '/dashboard/ai' : -1);
  };

  const handleAddPortfolio = () => {
    navigate('/portfolio/add');
  };

  const handleCardClick = (portfolioId) => {
    navigate('/portfolio/detail', {state: {portfolioId}});
  };

  // 프로필 샘플 데이터
  const profileData = {
    name: isBrowsingMode ? 'suum' : 'suum',
    school: '금오공과대학교 컴퓨터공학전공',
    location: '로고 디자인',
    experience: '미니멀・빈티지',
  };

  // 포트폴리오 카드 샘플 데이터
  const mockPortfolios = [
    {
      id: 1,
      title: 'BABA 데이크아우 패키지 디자인',
      category: '패키지 디자인',
      image: '/api/placeholder/300/300',
      tags: ['패키지', '브랜딩'],
    },
    // {
    //   id: 2,
    //   title: 'Radical Roast 블랜드 리브랜딩 디자인',
    //   category: '브랜딩・패키지 디자인',
    //   image: '/api/placeholder/300/300',
    //   tags: ['브랜딩', '패키지'],
    // },
    // {
    //   id: 3,
    //   title: 'Sage Petal 로고 & 명함 디자인',
    //   category: '브랜딩・그래픽 디자인',
    //   image: '/api/placeholder/300/300',
    //   tags: ['로고', '명함'],
    // },
    // {
    //   id: 4,
    //   title: 'Aurea Mist 향수 브랜딩 & 패키지 디자인',
    //   category: '브랜딩・패키지 디자인',
    //   image: '/api/placeholder/300/300',
    //   tags: ['브랜딩', '패키지'],
    // },
    // {
    //   id: 5,
    //   title: '화이트스마일 치과 간판 디자인',
    //   category: '간판 디자인・브랜딩',
    //   image: '/api/placeholder/300/300',
    //   tags: ['간판', '브랜딩'],
    // },
  ];

  return (
    <div className="min-w-[1000px] py-[26px] px-[140px]">
      {isBrowsingMode && <BackButton />}

      {/* 프로필 영역 */}
      <div className="flex items-start gap-[32px] mb-[89px]">
        <div className="overflow-hidden h-[144px] w-[144px]">
          <img src={DefaultProfile} alt="프로필" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h1 className="text-[24px] font-[700] mb-[18px]">{profileData.name}</h1>
          <div className="space-y-[10px] text-sm text-gray-600">
            <div className="flex items-center">
              <span className="text-gray-400 w-[102px]">학력・전공</span>
              <span>{profileData.school}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 w-[102px]">전문 분야</span>
              <span>{profileData.location}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-400 w-[102px]">디자인 스타일</span>
              <span>{profileData.experience}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 포트폴리오 헤더 */}
      <div className="flex items-center justify-between mb-[20px]">
        <h3 className="text-[16px] font-[600]">
          {isBrowsingMode ? `포트폴리오` : `내 포트폴리오`}
          <span className="ml-[8px] font-[800] text-[18px] text-[#5F5E5B]"> {mockPortfolios.length}</span>
        </h3>

        {!isBrowsingMode && (
          <button
            onClick={handleAddPortfolio}
            className="flex items-center gap-[4px] text-black/60 rounded-[4px] px-[8px] hover:text-black hover:bg-[#F1EEEC]"
          >
            <Plus size="14px" />
            포트폴리오 추가
          </button>
        )}
      </div>

      {/* 포트폴리오 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[35px] gap-y-[20px] justify-items-center">
        {mockPortfolios.map((portfolio) => (
          <div key={portfolio.id} onClick={() => handleCardClick(portfolio.id)} className="w-[290px] h-[290px]">
            <Card title={portfolio.title} category={portfolio.category} image={portfolio.image} tags={portfolio.tags} />
          </div>
        ))}
      </div>

      {/* 포트폴리오가 없을 때 */}
      {!isBrowsingMode && mockPortfolios.length === 0 && (
        <div className="text-center py-12">
          <div
            onClick={handleAddPortfolio}
            className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <Plus size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">첫 번째 포트폴리오를 추가해보세요</h3>
          <p className="text-gray-500 mb-4">당신의 작품을 세상에 보여주세요</p>
        </div>
      )}
    </div>
  );
}
