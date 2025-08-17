import {useState} from 'react';
import {HelpCircle} from 'lucide-react';
import BackButton from '../../../components/common/buttons/BackButton';
import Dropdown from '../../../components/common/form/Dropdown';
import FileUpload from '../../../components/common/form/FileUpload';
import '../../../components/common/form/form.css';
import './tooltip.css';

export default function PortfolioAdd() {
  const [formData, setFormData] = useState({
    title: '',
    categories: [],
    images: [],
    description: '',
  });

  const categoryOptions = [
    '로고 디자인',
    '브랜드 디자인',
    '굿즈 디자인',
    '포스터 · 전단지 디자인',
    '배너 · 광고 디자인',
    '패키지 디자인',
    '명함 카드 · 인쇄물 디자인',
  ];

  const handleCategoriesChange = (newValues) => {
    setFormData((prev) => ({
      ...prev,
      categories: newValues,
    }));
  };

  const handleImagesChange = (newImages) => {
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  return (
    <div className="px-[140px] py-[26px] min-w-[1000px]">
      <BackButton />
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between ">
          <h3 className="font-[600] text-[18px]">포트폴리오 작성하기</h3>
          <button className="text-black/60 rounded-[4px] px-[8px] hover:text-black hover:bg-[#F1EEEC]">등록</button>
        </div>

        <div>
          <label className="label-title mt-[24px]">제목</label>
          <input
            type="text"
            className="form-input"
            placeholder="제목을 입력해주세요"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>

        <div>
          <label className="label-title">카테고리</label>
          <Dropdown
            options={categoryOptions}
            selectedValues={formData.categories}
            onChange={handleCategoriesChange}
            placeholder="디자인 분야 선택"
          />
        </div>

        <div>
          <label className="label-title">작업물 첨부</label>
          <FileUpload
            files={formData.images}
            onFileChange={handleImagesChange}
            accept="image/*"
            multiple={true}
            buttonText="파일 선택"
          />
        </div>

        <div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="label-title">상세설명</label>

              <div className="tooltip">
                <button type="button" className="tooltip-btn" aria-label="도움말">
                  <HelpCircle size={16} />
                </button>

                {/* 호버/포커스 툴팁 */}
                <div id="desc-tip" role="tooltip" className="tooltip-panel">
                  <p className="tooltip-text">
                    프로젝트를 시작한 <strong>배경</strong>과 해결하고자 했던 <strong>문제,</strong>
                    <br />
                    그리고 그를 바탕으로 정리한 <strong>디자인 컨셉</strong>과 <strong>결과물</strong>을 설명해주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <textarea
            className="form-textarea"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="프로젝트 개요, 디자인 컨셉, 작업 과정 등을 상세히 작성해 주세요."
          />
        </div>
      </div>
    </div>
  );
}
