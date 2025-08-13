import {useState} from 'react';
import {X, ChevronDown, ChevronUp} from 'lucide-react';
import '../modal/form.css';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const designerTypeOptions = [
    '로고 디자인',
    '브랜드 디자인',
    '굿즈 디자인',
    '포스터·전단지 디자인',
    '배너·광고 디자인',
  ];

  // 드롭다운 선택/해제
  const handleDesignerTypeToggle = (type) => {
    setFormData((prev) => {
      const selected = prev.designerTypes;
      const already = selected.includes(type);
      if (already) {
        return {...prev, designerTypes: selected.filter((t) => t !== type)};
      }
      if (selected.length >= 3) return prev;
      return {...prev, designerTypes: [...selected, type]};
    });
  };

  // 파일 업로드
  const handleFileUpload = (files) => {
    const fileArray = Array.from(files || []);
    if (fileArray.length === 0) return;
    setFormData((prev) => ({
      ...prev,
      referenceFiles: [...prev.referenceFiles, ...fileArray],
    }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      referenceFiles: prev.referenceFiles.filter((_, i) => i !== index),
    }));
  };

  // 제출 처리
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        designerId,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: 'pending',
      };
      console.log('작업 의뢰서 제출:', submitData);
      onSuccess && onSuccess(submitData);
      onClose && onClose();
      alert('작업 의뢰서가 성공적으로 전송되었습니다!');
    } catch (err) {
      console.error(err);
      alert('의뢰서 전송 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
      <div className="flex flex-col bg-white rounded-[8px] w-full w-[800px] h-[600px] overflow-hidden flex flex-col px-[32px] py-[24px]">
        {/* 헤더 */}
        <div className="flex justify-between items-center ">
          <h2 className="text-[16px] font-[600]">작업 의뢰서 작성</h2>
          <div className="flex justify-end gap-[4px]">
            <button onClick={onClose} className="btn" disabled={isSubmitting}>
              취소
            </button>
            <button onClick={handleSubmit} className="btn" disabled={isSubmitting}>
              보내기
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
                <label className="form-label">업체명</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.companyName}
                  placeholder="예) OO커피 로스터스"
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>

              <div>
                <label className="form-label">희망 납기일</label>
                <input
                  type="date"
                  className="form-input"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
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
              {/* 선택된 항목 */}
              {formData.designerTypes.length > 0 && (
                <div className="flex flex-wrap gap-[10px] mb-[8px]">
                  {formData.designerTypes.map((type) => (
                    <div
                      key={type}
                      className="inline-flex items-center gap-[8px] px-[12px] py-[8px] rounded-[22px] border border-black/20"
                    >
                      <span className="whitespace-nowrap text-[16px] font-[600]">{type}</span>
                      <button
                        type="button"
                        onClick={() => handleDesignerTypeToggle(type)}
                        className=""
                        aria-label={`${type} 제거`}
                        title="제거"
                      >
                        <X className="w-[14px] h-[14px]" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 드롭다운 */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="form-input flex items-center justify-between"
                >
                  <span className="text-black/50">필요한 디자인 분야를 선택해 주세요. (최대 3개)</span>
                  {isDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {isDropdownOpen && (
                  <div className="absolute w-full bg-white rounded-[12px] shadow-[0_4px_20px_0_rgba(0,0,0,0.1)]">
                    {designerTypeOptions.map((option) => {
                      const isSelected = formData.designerTypes.includes(option);
                      const isMaxed = !isSelected && formData.designerTypes.length >= 3;

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            if (!isMaxed) handleDesignerTypeToggle(option);
                          }}
                          className={`w-full text-left px-[16px] py-[12px] ${isSelected ? 'bg-gray-100' : ''}`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
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

              {/* 파일 업로드 */}
              {formData.referenceFiles.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3">
                  {formData.referenceFiles.map((file, index) => (
                    <div key={index} className="relative">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden border">
                        <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute -top-0 -right-0 w-6 h-6 text-white flex items-center justify-center "
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <label className="inline-block px-[24px] py-[6px] mt-[8px] mb-[24px] bg-[#F1F0EFB2] rounded-[8px] hover:bg-[#F1F0EF]">
                파일 선택
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
              </label>
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
