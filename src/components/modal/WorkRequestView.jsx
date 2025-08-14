export default function WorkRequestViewModal({isOpen, onClose}) {
  if (!isOpen) return null;

  // 더미 데이터 (요구사항 그대로)
  const dummyData = {
    id: 1,
    title: '따뜻한 감성의 빈티지 카페 브랜딩 디자인',
    companyName: '페일카페',
    deadline: '2025. 08. 25.',
    money: '500,000 원',
    service: '따뜻한 분위기의 빈티지 콘셉트 카페',
    targetAudience: '20대 여성, 감성적인 SNS 감성 선호',
    brandIntro: '매장 오픈 준비 중, 브랜드 아이덴티티 구축 단계',
    goal: '오프라인 매장 오픈에 맞춰 브랜드의 정식성을 효과적으로 전달할 수 있는 로고 및 시각 자료 제작',
    designerTypes: ['로고 디자인', '굿즈 디자인'],
    referenceDescription: `아래 핀터레스트 보드를 참고해주세요.
로고와 메뉴판 디자인이 깔끔하고 따뜻한 느낌이라 비슷한 스타일을 원합니다.
https://pin.it/abc123

또한, 이런 무드보드의 색깔이 마음에 들어요.
톤다운된 브라운 계열과 자연적이 어우러진 분위기를 참고해주세요.
인스타그램 @cozycafe 참고했습니다.`,
    images: ['/assets/samples/image1.jpg', '../../assets/samples/image2.jpg'],
    additionalRequirements: '',
  };

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
          <Row label="프로젝트명">{dummyData.title}</Row>
          <Row label="업체명">{dummyData.companyName}</Row>
          <Row label="희망 납기일">{dummyData.deadline}</Row>
          <Row label="제안 금액">{dummyData.money}</Row>

          <Row label="제품/서비스">{dummyData.service}</Row>
          <Row label="주요 고객">{dummyData.targetAudience}</Row>
          <Row label="현재 상황">{dummyData.brandIntro}</Row>
          <Row label="목표">{dummyData.goal}</Row>

          <Row label="요청 디자인 분야">
            {dummyData.designerTypes?.length ? dummyData.designerTypes.join(', ') : '-'}
          </Row>

          <Row label="참고 설명">
            {dummyData.referenceDescription?.trim() ? (
              <>
                <pre className="whitespace-pre-wrap font-sans text-[15px]">{dummyData.referenceDescription}</pre>
                <div className="pb-3 mt-[18px]">
                  <div className="flex gap-3">
                    {dummyData.images.map((src, i) => (
                      <div key={i} className="w-28 h-28 bg-gray-100 rounded-[8px] overflow-hidden border">
                        <img src={src} alt={`reference-${i + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              '입력된 내용이 없습니다.'
            )}
          </Row>

          <Row label="기타 요구사항">
            {dummyData.additionalRequirements?.trim() ? dummyData.additionalRequirements : '입력된 내용이 없습니다.'}
          </Row>
        </div>
      </div>
    </div>
  );
}
