import {useState, useEffect} from 'react';
import {getWorkRequestDetail, getBusinessOwnerWorkRequestDetail} from '../../api/work-request/workRequest';

// 영문 디자인 카테고리를 한글로 변환하는 함수
const convertDesignCategoriesToKorean = (categories) => {
  const categoryMap = {
    'LOGO': '로고 디자인',
    'BRAND': '브랜드 디자인',
    'GOODS': '굿즈 디자인',
    'POSTER_FLYER': '포스터 · 전단지 디자인',
    'BANNER_AD': '배너 · 광고 디자인',
    'PACKAGE': '패키지 디자인',
    'CARD': '명함/카드/인쇄물 디자인'
  };

  if (!categories || !Array.isArray(categories)) {
    return [];
  }

  return categories.map(category => categoryMap[category] || category);
};

export default function WorkRequestViewModal({isOpen, onClose, workRequestId, userType}) {
  const [workRequestData, setWorkRequestData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 작업의뢰서 상세 데이터 조회
  const fetchWorkRequestDetail = async () => {
    if (!workRequestId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      let data;
      
      // 사용자 유형에 따라 다른 API 호출
      if (userType === 'business') {
        // 소상공인: 자신이 보낸 작업의뢰서 조회
        data = await getBusinessOwnerWorkRequestDetail(workRequestId);
      } else {
        // 디자이너: 받은 작업의뢰서 조회
        data = await getWorkRequestDetail(workRequestId);
      }
      
      setWorkRequestData(data);
    } catch (error) {
      console.error('작업의뢰서 상세 조회 실패:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 모달이 열릴 때 작업의뢰서 데이터 조회
  useEffect(() => {
    if (isOpen && workRequestId) {
      fetchWorkRequestDetail();
    }
  }, [isOpen, workRequestId]);

  // 모달이 열려있지 않으면 렌더링하지 않음
  if (!isOpen) return null;

  // 로딩 상태 표시
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-[8px] w-full max-w-[800px] h-[600px] overflow-hidden px-[32px] py-[24px] flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-[600]">작업 의뢰서</h2>
            <button onClick={onClose} className="px-[6px] text-black/50 text-[16px] hover:bg-[#f1eeec] hover:text-black rounded-[4px]">
              닫기
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-gray-500">작업의뢰서를 불러오는 중...</div>
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 표시
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-[8px] w-full max-w-[800px] h-[600px] overflow-hidden px-[32px] py-[24px] flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-[600]">작업 의뢰서</h2>
            <button onClick={onClose} className="px-[6px] text-black/50 text-[16px] hover:bg-[#f1eeec] hover:text-black rounded-[4px]">
              닫기
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="text-red-500">오류가 발생했습니다: {error}</div>
            <button 
              onClick={fetchWorkRequestDetail}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 데이터가 없으면 빈 화면
  if (!workRequestData) {
    return null;
  }

  // 읽기 전용 행 컴포넌트 스타일
  const Row = ({label, children}) => (
    <div className="px-[8px] mb-[42px]">
      <div className="text-[14px] text-black/50">{label}</div>
      <div className="border-b border-black/15 py-[8px] text-[16px] font-[400]">{children}</div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[8px] w-full max-w-[800px] h-[600px] overflow-hidden px-[32px] py-[24px] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between ">
          <h2 className="text-[16px] font-[600]">작업 의뢰서</h2>
          <button
            type="button"
            onClick={onClose}
            className="px-[6px] text-black/50 text-[16px] hover:bg-[#f1eeec] hover:text-black rounded-[4px]"
          >
            닫기
          </button>
        </div>

        <div className="flex-1 overflow-y-auto mt-[44px]">
          <Row label="프로젝트명">{workRequestData.projectTitle || '-'}</Row>
          <Row label="업체명">{workRequestData.storeName || workRequestData.businessOwnerName || '-'}</Row>
          <Row label="희망 납기일">{workRequestData.endDate ? new Date(workRequestData.endDate).toLocaleDateString('ko-KR') : '-'}</Row>
          <Row label="제안 금액">{workRequestData.budget ? `${workRequestData.budget.toLocaleString()} 원` : '-'}</Row>

          <Row label="제품/서비스">{workRequestData.productService || '-'}</Row>
          <Row label="주요 고객">{workRequestData.targetCustomers || '-'}</Row>
          <Row label="현재 상황">{workRequestData.nowStatus || '-'}</Row>
          <Row label="목표">{workRequestData.goal || '-'}</Row>

          <Row label="요청 디자인 분야">
            {workRequestData.designCategories?.length ? 
              convertDesignCategoriesToKorean(workRequestData.designCategories).join(', ') : 
              '-'
            }
          </Row>

          <Row label="참고 설명">
            {workRequestData.additionalDescription?.trim() ? (
              <>
                <pre className="whitespace-pre-wrap font-sans text-[15px]">{workRequestData.additionalDescription}</pre>
                {workRequestData.images && workRequestData.images.length > 0 && (
                  <div className="pb-3 mt-[18px]">
                    <div className="flex gap-3">
                      {workRequestData.images.map((image, i) => (
                        <div key={image.id || i} className="w-28 h-28 bg-gray-100 rounded-[8px] overflow-hidden border">
                          <img 
                            src={image.imageUrl} 
                            alt={image.imageName || `reference-${i + 1}`} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = '/assets/samples/image1.jpg'; // 기본 이미지로 대체
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              '입력된 내용이 없습니다.'
            )}
          </Row>

          <Row label="기타 요구사항">
            {workRequestData.additionalRequirement?.trim() ? workRequestData.additionalRequirement : '입력된 내용이 없습니다.'}
          </Row>
        </div>
      </div>
    </div>
  );
}
