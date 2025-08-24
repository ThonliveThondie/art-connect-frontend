import apiClient from '../utils/client.js';

export const createPortfolio = async (portfolioData) => {
  try {
    const response = await apiClient.post('/api/portfolios', portfolioData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMyPortfolios = async () => {
  try {
    const response = await apiClient.get('/api/portfolios/my');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPortfolioById = async (portfolioId) => {
  try {
    const response = await apiClient.get(`/api/portfolios/${portfolioId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePortfolio = async (portfolioId, portfolioData) => {
  try {
    const response = await apiClient.put(`/api/portfolios/${portfolioId}`, portfolioData);
    return response.data;
  } catch (error) {
    console.error('포트폴리오 수정 실패:', error);
    throw error;
  }
};

export const deletePortfolio = async (portfolioId) => {
  try {
    const response = await apiClient.delete(`/api/portfolios/${portfolioId}`);
    return response.data;
  } catch (error) {
    console.error('포트폴리오 삭제 실패:', error);
    throw error;
  }
};

export const uploadPortfolioImages = async (portfolioId, images) => {
  try {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await apiClient.post(`/api/portfolios/${portfolioId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('포트폴리오 이미지 업로드 실패:', error);
    throw error;
  }
};

export const deletePortfolioImage = async (portfolioId, imageId) => {
  try {
    const response = await apiClient.delete(`/api/portfolios/${portfolioId}/images/${imageId}`);
    return response.data;
  } catch (error) {
    console.error('포트폴리오 이미지 삭제 실패:', error);
    throw error;
  }
};
