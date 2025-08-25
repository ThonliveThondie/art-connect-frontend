import {useState, useEffect, useCallback} from 'react';
import {
  getMyPortfolios,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  uploadPortfolioImages,
  deletePortfolioImage,
} from '../../../api/portfolio/portfolio';

export const useMyPortfolios = (shouldFetch = true) => {
  const [portfolios, setPortfolios] = useState([]);

  const fetchPortfolios = useCallback(async () => {
    if (!shouldFetch) return;

    try {
      const data = await getMyPortfolios();
      const list = Array.isArray(data) ? data : data?.portfolios || [];
      setPortfolios(list);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '포트폴리오 목록 조회 실패';
      console.error('포트폴리오 목록 조회 실패:', err);
      alert(msg);
      setPortfolios([]);
    }
  }, [shouldFetch]);

  useEffect(() => {
    fetchPortfolios();
  }, [fetchPortfolios]);

  return {portfolios, refetch: fetchPortfolios};
};

export const usePortfolioDetail = (portfolioId, shouldFetch = true) => {
  const [portfolio, setPortfolio] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPortfolio = useCallback(async () => {
    if (!portfolioId || !shouldFetch) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await getPortfolioById(portfolioId);
      setPortfolio(data ?? null);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '포트폴리오 조회 실패';
      console.error('포트폴리오 조회 실패:', err);
      setError(msg);
      setPortfolio(null);
    } finally {
      setIsLoading(false);
    }
  }, [portfolioId, shouldFetch]);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  return {portfolio, isLoading, error, refetch: fetchPortfolio};
};

export const useCreatePortfolio = () => {
  const create = async (portfolioData) => {
    try {
      return await createPortfolio(portfolioData);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '포트폴리오 생성 실패';
      console.error('포트폴리오 생성 실패:', err);
      alert(msg);
      return null;
    }
  };
  return {create};
};

export const useUpdatePortfolio = () => {
  const update = async (portfolioId, portfolioData) => {
    try {
      return await updatePortfolio(portfolioId, portfolioData);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '포트폴리오 수정 실패';
      console.error('포트폴리오 수정 실패:', err);
      alert(msg);
      return null;
    }
  };
  return {update};
};

export const useDeletePortfolio = () => {
  const remove = async (portfolioId) => {
    try {
      return await deletePortfolio(portfolioId);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '포트폴리오 삭제 실패';
      console.error('포트폴리오 삭제 실패:', err);
      alert(msg);
      return null;
    }
  };
  return {remove};
};

export const useUploadPortfolioImages = () => {
  const upload = async (portfolioId, images) => {
    try {
      return await uploadPortfolioImages(portfolioId, images);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '이미지 업로드 실패';
      console.error('이미지 업로드 실패:', err);
      alert(msg);
      return null;
    }
  };
  return {upload};
};

export const useDeletePortfolioImage = () => {
  const remove = async (portfolioId, imageId) => {
    try {
      return await deletePortfolioImage(portfolioId, imageId);
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || '이미지 삭제 실패';
      console.error('이미지 삭제 실패:', err);
      alert(msg);
      return null;
    }
  };
  return {remove};
};
