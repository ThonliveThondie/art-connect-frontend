import React, {useState, useEffect} from 'react';
import {HelpCircle, Loader2} from 'lucide-react';
import {useNavigate, useParams} from 'react-router-dom';
import BackButton from '../../../components/common/buttons/BackButton';
import Dropdown from '../../../components/common/form/Dropdown';
import PortfolioImageManager from './PortfolioImageManager';
import {getCategoryOptions, mapLabelsToCategories, mapCategoriesToLabels} from '../../../api/utils/mapper';
import {
  getPortfolioById,
  updatePortfolio,
  uploadPortfolioImages,
  deletePortfolioImage,
} from '../../../api/portfolio/portfolio';
import '../../../components/common/form/form.css';
import '../add/tooltip.css';

export default function PortfolioEdit() {
  const {id: portfolioId} = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    categories: [],
    description: '',
  });

  const [existingImages, setExistingImages] = useState([]);
  const [pendingImages, setPendingImages] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const categoryOptions = getCategoryOptions();

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        const data = await getPortfolioById(portfolioId);

        setExistingImages(data.portfolioImages || []);

        setFormData({
          title: data.title || '',
          categories: mapCategoriesToLabels(data.designCategories || []), // 서버 카테고리 → 라벨
          description: data.description || '',
        });
        setPendingImages([]);
      } catch (error) {
        console.error('포트폴리오 조회 실패:', error);
        const errorMessage =
          error?.response?.data?.message || error?.message || '포트폴리오를 불러오는데 실패했습니다.';
        alert(errorMessage);
        navigate('/portfolio');
      } finally {
        setIsLoading(false);
      }
    };

    if (portfolioId) fetchPortfolioData();
  }, [portfolioId, navigate]);

  const handleCategoriesChange = (newValues) => {
    setFormData((prev) => ({...prev, categories: newValues}));
  };

  const handleExistingImagesChange = async (newExistingImages) => {
    const deletedImages = existingImages.filter((img) => !newExistingImages.find((newImg) => newImg.id === img.id));

    for (const deletedImage of deletedImages) {
      try {
        await deletePortfolioImage(portfolioId, deletedImage.id);
        console.log(`이미지 ${deletedImage.id} 삭제 완료`);
      } catch (error) {
        console.error(`이미지 ${deletedImage.id} 삭제 실패:`, error);
        setExistingImages(existingImages);
        const errorMessage = error?.response?.data?.message || error?.message || '이미지 삭제에 실패했습니다.';
        alert(errorMessage);
        return;
      }
    }
    setExistingImages(newExistingImages);
  };

  const handlePendingImagesChange = (newPendingImages) => {
    setPendingImages(newPendingImages);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (!formData.description.trim()) {
      alert('상세설명을 입력해주세요.');
      return;
    }
    const totalImages = existingImages.length + pendingImages.length;
    if (totalImages === 0) {
      alert('작업물을 최소 1개 이상 첨부해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        designCategories: mapLabelsToCategories(formData.categories), // 라벨 → 서버 카테고리
        description: formData.description,
      };
      await updatePortfolio(portfolioId, payload);

      if (pendingImages.length > 0) {
        await uploadPortfolioImages(portfolioId, pendingImages);
      }

      alert('포트폴리오가 성공적으로 수정되었습니다.');
      navigate(`/portfolio/${portfolioId}`);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '포트폴리오 수정에 실패했습니다. 다시 시도해주세요.';
      console.error('포트폴리오 수정 실패:', msg, err);
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return null;

  return (
    <div className="px-[140px] py-[26px] min-w-[1000px]">
      <BackButton />
      <div className="flex flex-col gap-[20px]">
        <div className="flex justify-between">
          <h3 className="font-[600] text-[18px]">포트폴리오 수정하기</h3>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="text-black/60 rounded-[4px] px-[8px] hover:text-black hover:bg-[#F1EEEC] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                <span>수정</span>
              </span>
            ) : (
              '수정'
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
          <PortfolioImageManager
            existingImages={existingImages}
            pendingImages={pendingImages}
            onExistingImagesChange={handleExistingImagesChange}
            onPendingImagesChange={handlePendingImagesChange}
            isEditing={true}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="label-title">상세설명</label>

            <div className="tooltip">
              <button type="button" className="tooltip-btn" aria-label="도움말">
                <HelpCircle size={16} />
              </button>

              <div id="desc-tip" role="tooltip" className="tooltip-panel">
                <p className="tooltip-text">
                  프로젝트를 시작한 <strong>배경</strong>과 해결하고자 했던 <strong>문제,</strong>
                  <br />
                  그리고 그를 바탕으로 정리한 <strong>디자인 컨셉</strong>과 <strong>결과물</strong>을 설명해주세요.
                </p>
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
