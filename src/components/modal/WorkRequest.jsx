import {useState, useEffect} from 'react';
import {Calendar28} from './Calendar';
import Dropdown from '../common/form/Dropdown';
import FileUpload from '../common/form/FileUpload';
import {getStoreName} from '../../api/store/store';
import {sendWorkRequest} from '../../api/work-request/workRequest';
import '../common/form/form.css';

export default function WorkRequestCreateModal({isOpen, onClose, designerId, onSuccess}) {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    deadline: '',
    money: '',
    service: '',
    targetAudience: '',
    brandIntro: '',
    goal: '',
    designerTypes: [],
    referenceDescription: '',
    referenceFiles: [],
    additionalRequirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingStoreName, setIsLoadingStoreName] = useState(false);

  // 매장명 자동 조회 함수
  const fetchStoreName = async () => {
    setIsLoadingStoreName(true);
    try {
      const response = await getStoreName();
      // API 응답에서 매장명 추출 (응답 구조에 따라 조정 필요)
      const storeName = response?.storeName || response?.name || response;
      if (storeName) {
        setFormData(prev => ({
          ...prev,
          companyName: storeName
        }));
      }
    } catch (error) {
      console.error('매장명 조회 실패:', error);
      // 에러가 발생해도 사용자에게 직접적으로 알리지 않음 (선택적 기능이므로)
    } finally {
      setIsLoadingStoreName(false);
    }
  };

  // 모달이 열릴 때 매장명 자동 조회
  useEffect(() => {
    if (isOpen && !formData.companyName) {
      fetchStoreName();
    }
  }, [isOpen]);

  const designerTypeOptions = [
    '로고 디자인',
    '브랜드 디자인',
    '굿즈 디자인',
    '포스터 · 전단지 디자인',
    '배너 · 광고 디자인',
    '패키지 디자인',
    '명함/카드/인쇄물 디자인',
  ];

  const handleDesignerTypesChange = (newValues) => {
    setFormData((prev) => ({
      ...prev,
      designerTypes: newValues,
    }));
  };

  // 파일 업로드 핸들러
  const handleFileChange = (newFiles) => {
    setFormData((prev) => ({
      ...prev,
      referenceFiles: newFiles,
    }));
  };

  // 폼 유효성 검사
  const validateForm = () => {
    const requiredFields = [
      { field: 'title', name: '프로젝트명' },
      { field: 'companyName', name: '업체명' },
      { field: 'deadline', name: '희망 납기일' },
      { field: 'money', name: '제안 금액' },
      { field: 'service', name: '제품/서비스' },
      { field: 'targetAudience', name: '주요 고객' },
      { field: 'brandIntro', name: '현재 상황' },
      { field: 'goal', name: '목표' }
    ];

    for (const { field, name } of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        alert(`${name}을(를) 입력해주세요.`);
        return false;
      }
    }

    if (!formData.designerTypes || formData.designerTypes.length === 0) {
      alert('요청 디자인 분야를 선택해주세요.');
      return false;
    }

    return true;
  };

  // 제출 처리
  const handleSubmit = async () => {
    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }

    if (!designerId) {
      alert('디자이너 정보가 없습니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 작업의뢰서 전송 API 호출
      const result = await sendWorkRequest(designerId, formData);
      
      console.log('작업의뢰서 전송 성공:', result);
      
      // 성공 콜백 호출
      if (onSuccess) {
        onSuccess({
          ...formData,
          designerId,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          status: 'pending',
        });
      }
      
      // 모달 닫기
      if (onClose) {
        onClose();
      }
      
      alert('작업 의뢰서가 성공적으로 전송되었습니다!');
      
    } catch (error) {
      console.error('작업의뢰서 전송 실패:', error);
      alert(error.message || '의뢰서 전송 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="flex flex-col bg-white rounded-[8px] w-[800px] h-[600px] overflow-hidden flex flex-col px-[32px] py-[24px]">
        {/* 헤더 */}
        <div className="flex justify-between items-center ">
          <h2 className="text-[16px] font-[600]">작업 의뢰서 작성</h2>
          <div className="flex justify-end gap-[4px]">
            <button onClick={onClose} className="btn" disabled={isSubmitting}>
              취소
            </button>
            <button onClick={handleSubmit} className="btn" disabled={isSubmitting}>
              {isSubmitting ? '전송 중...' : '보내기'}
            </button>
          </div>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto">
          {/* 1. 기본 정보 */}
          <div className="container">
            <h3 className="container-title">1. 기본 정보</h3>
            <div className="px-[8px]">
              <div>
                <label className="form-label">프로젝트명</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  placeholder="예) 마크업 감성의 빈티지 카페 브랜딩 디자인"
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">
                  업체명
                  {isLoadingStoreName && (
                    <span className="ml-2 text-sm text-gray-500">(매장명 조회 중...)</span>
                  )}
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.companyName}
                  placeholder={isLoadingStoreName ? "매장명을 조회하고 있습니다..." : "예) OO커피 로스터스"}
                  disabled={isLoadingStoreName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>

              <div>
                <label className="form-label">희망 납기일</label>
                <Calendar28
                  value={formData.deadline}
                  onChange={(d) => setFormData({...formData, deadline: d})}
                  placeholder="날짜 선택"
                />
              </div>

              <div>
                <label className="form-label">제안 금액</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.money}
                  placeholder="₩ 9,999,999"
                  onChange={(e) => setFormData({...formData, money: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* 2. 브랜드 소개 및 포트폴리오 배경 */}
          <div className="container">
            <h3 className="container-title">2. 브랜드 소개 및 포트폴리오 배경</h3>
            <div className="px-[8px]">
              <p className="text-sm text-gray-600 mb-[12px]">
                이 브랜드 정보는 방향성 설정에 가장 중요한 자료입니다. <br />
                자세히 작성할수록 더 좋은 결과물을 얻을 수 있어요.
              </p>

              <div>
                <label className="form-label">제품/서비스</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.service}
                  placeholder="예) 따뜻한 분위기의 빈티지 콘셉트 카페"
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">주요 고객</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.targetAudience}
                  placeholder="예) 20대 여성, 감성적인 SNS 감성 선호"
                  onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                />
              </div>
              <div>
                <label className="form-label">현재 상황</label>
                <textarea
                  className="form-textarea"
                  value={formData.brandIntro}
                  placeholder="예) 매장 오픈 준비 중, 브랜드 아이덴티티 구축 단계"
                  rows={2}
                  onChange={(e) => {
                    setFormData({...formData, brandIntro: e.target.value});
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
              </div>

              <div>
                <label className="form-label">목표</label>
                <textarea
                  className="form-textarea"
                  value={formData.goal}
                  placeholder="예) 매장 오픈에 맞춰 브랜드의 정체성을 효과적으로 전달할 수 있는 로고 및 시각 자료 제작"
                  rows={2}
                  onChange={(e) => {
                    setFormData({...formData, goal: e.target.value});
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
              </div>
            </div>
          </div>

          {/* 3. 요청 디자인 활용 */}
          <div className="container">
            <h3 className="container-title">3. 요청 디자인 활용</h3>
            <div className="px-[8px]">
              <Dropdown
                options={designerTypeOptions}
                selectedValues={formData.designerTypes}
                onChange={handleDesignerTypesChange}
                placeholder="필요한 디자인 분야를 선택해 주세요"
              />
            </div>
          </div>

          {/* 4. 참고 자료 (선택) */}
          <div className="container">
            <h3 className="container-title">4. 참고 자료 (선택)</h3>
            <div className="px-[8px]">
              <textarea
                className="form-textarea"
                value={formData.referenceDescription}
                placeholder="이미지 링크, 무드보드, 키워드 등 참고 설명을 입력해 주세요."
                rows={2}
                onChange={(e) => {
                  setFormData({...formData, referenceDescription: e.target.value});
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />

              <FileUpload
                files={formData.referenceFiles}
                onFileChange={handleFileChange}
                accept="image/*"
                multiple={true}
                buttonText="파일 선택"
              />
            </div>
          </div>

          {/* 5. 기타 요구사항 (선택) */}
          <div className="container">
            <h3 className="container-title">5. 기타 요구사항 (선택)</h3>
            <div className="px-[8px]">
              <textarea
                className="form-textarea"
                value={formData.additionalRequirements}
                placeholder="추가 요청 사항이 있다면 자유롭게 작성해 주세요."
                rows={2}
                onChange={(e) => {
                  setFormData({...formData, additionalRequirements: e.target.value});
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
