import {useState} from 'react';
import {HelpCircle} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import BackButton from '../../../components/common/buttons/BackButton';
import Dropdown from '../../../components/common/form/Dropdown';
import FileUpload from '../../../components/common/form/FileUpload';
import {Loader2} from 'lucide-react';
import {getCategoryOptions, mapLabelsToCategories} from '../../../api/utils/mapper';
import {createPortfolio, uploadPortfolioImages} from '../../../api/portfolio/portfolio';
import '../../../components/common/form/form.css';
import './tooltip.css';

export default function PortfolioAdd() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    categories: [],
    images: [],
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = getCategoryOptions();

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

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (formData.categories.length === 0) {
      alert('카테고리를 선택해주세요.');
      return;
    }
    if (formData.images.length === 0) {
      alert('작업물을 최소 1개 이상 첨부해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const portfolioData = {
        title: formData.title,
        designCategories: mapLabelsToCategories(formData.categories),
        description: formData.description,
      };

      const createdPortfolio = await createPortfolio(portfolioData);

      if (formData.images.length > 0) {
        const portfolioId = createdPortfolio.portfolioId || createdPortfolio.id || createdPortfolio.data?.portfolioId;

        if (portfolioId) {
          await uploadPortfolioImages(portfolioId, formData.images);
        } else {
          console.warn('포트폴리오 ID를 찾을 수 없어 이미지 업로드를 건너뜁니다.');
        }
      }

      console.log('포트폴리오 등록 성공.');
      navigate('/portfolio');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '포트폴리오 등록에 실패했습니다.';
      console.error('포트폴리오 등록 실패:', msg, err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[140px] py-[26px] min-w-[1000px]">
      <BackButton />
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between ">
          <h3 className="font-[600] text-[18px]">포트폴리오 작성하기</h3>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="text-black/60 rounded-[4px] px-[8px] hover:text-black hover:bg-[#F1EEEC] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span>등록</span>
              </span>
            ) : (
              '등록'
            )}
          </button>
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
