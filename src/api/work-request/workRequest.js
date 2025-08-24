import apiClient from '../utils/client.js';

// 폼 데이터를 API 요구 형식으로 변환하는 함수
export const transformFormDataToWorkRequest = (formData) => {
  // designerTypes 배열을 API에서 요구하는 형식으로 변환
  const designCategoryMap = {
    '로고 디자인': 'LOGO',
    '브랜드 디자인': 'BRAND',
    '굿즈 디자인': 'GOODS',
    '포스터 · 전단지 디자인': 'POSTER_FLYER',
    '배너 · 광고 디자인': 'BANNER_AD',
    '패키지 디자인': 'PACKAGE',
    '명함/카드/인쇄물 디자인': 'CARD',
  };

  const designCategories = formData.designerTypes.map((type) => designCategoryMap[type] || type);

  // 예산을 숫자로 변환 (쉼표 제거 후 숫자 변환)
  const budget = parseInt(formData.money.replace(/[^\d]/g, '')) || 0;

  return {
    projectTitle: formData.title || '',
    endDate: formData.deadline || '',
    budget: budget,
    productService: formData.service || '',
    targetCustomers: formData.targetAudience || '',
    nowStatus: formData.brandIntro || '',
    goal: formData.goal || '',
    designCategories: designCategories,
    additionalDescription: formData.referenceDescription || '',
    additionalRequirement: formData.additionalRequirements || '',
  };
};

// 작업의뢰서 전송 API
export const sendWorkRequest = async (designerId, formData) => {
  try {
    // FormData 객체 생성
    const requestFormData = new FormData();

    // workRequest JSON 데이터를 Blob으로 변환하여 application/json Content-Type 명시
    const workRequestData = transformFormDataToWorkRequest(formData);
    const workRequestBlob = new Blob([JSON.stringify(workRequestData)], {
      type: 'application/json',
    });
    requestFormData.append('workRequest', workRequestBlob, 'workRequest.json');

    // 참고 자료 이미지 파일들 추가
    if (formData.referenceFiles && formData.referenceFiles.length > 0) {
      formData.referenceFiles.forEach((file) => {
        if (file instanceof File) {
          requestFormData.append('images', file);
        }
      });
    }

    // API 요청
    const response = await apiClient.post(`/api/work-request/to/${designerId}`, requestFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('작업의뢰서 전송 실패:', error);
    throw error;
  }
};

// 디자이너가 받은 작업의뢰서 목록 조회 API
export const getWorkRequestList = async () => {
  try {
    const response = await apiClient.get('/api/work-request/designer/simple');
    return response.data;
  } catch (error) {
    console.error('작업의뢰서 목록 조회 실패:', error);
    throw error;
  }
};

// 디자이너가 받은 작업의뢰서 단건 조회 API
export const getWorkRequestDetail = async (workRequestId) => {
  try {
    const response = await apiClient.get(`/api/work-request/designer/${workRequestId}`);
    return response.data;
  } catch (error) {
    console.error('작업의뢰서 상세 조회 실패:', error);
    throw error;
  }
};

// 소상공인이 보낸 작업의뢰서 단건 조회 API
export const getBusinessOwnerWorkRequestDetail = async (workRequestId) => {
  try {
    const response = await apiClient.get(`/api/work-request/business-owner/${workRequestId}`);
    return response.data;
  } catch (error) {
    console.error('소상공인 작업의뢰서 상세 조회 실패:', error);
    throw error;
  }
};

// 작업의뢰서 거절 API
export const rejectWorkRequest = async (workRequestId) => {
  try {
    const response = await apiClient.delete(`/api/work-request/${workRequestId}/reject`);
    return response.data;
  } catch (error) {
    console.error('작업의뢰서 거절 실패:', error);
    throw error;
  }
};

// 작업의뢰서 수락 API
export const acceptWorkRequest = async (workRequestId) => {
  try {
    const response = await apiClient.post(`/api/work-request/${workRequestId}/accept`);
    return response.data;
  } catch (error) {
    console.error('작업의뢰서 수락 실패:', error);
    throw error;
  }
};

// 디자이너가 수락한 작업 목록 조회 API
export const getAcceptedWorkRequestList = async () => {
  try {
    const response = await apiClient.get('/api/work-request/designer/accepted/simple');
    return response.data;
  } catch (error) {
    console.error('수락한 작업 목록 조회 실패:', error);
    throw error;
  }
};

// 소상공인의 수락된 작업 목록 조회 API
export const getBusinessOwnerAcceptedWorkRequestList = async () => {
  try {
    const response = await apiClient.get('/api/work-request/business-owner/accepted/simple');
    return response.data;
  } catch (error) {
    console.error('소상공인 수락된 작업 목록 조회 실패:', error);
    throw error;
  }
};

// 작업 제출물 조회
export const getWorkSubmissions = async (workRequestId) => {
  try {
    const response = await apiClient.get(`/api/work-submissions/work-request/${workRequestId}`);
    return response.data;
  } catch (error) {
    console.error('작업 제출물 조회 실패:', error);
    throw error;
  }
};

// 시안 업로드 API
export const submitWorkDesign = async (workRequestId, formData) => {
  try {
    // FormData 객체 생성 (이미 formData가 FormData 인스턴스라고 가정)
    const requestFormData = new FormData();

    // workSubmission JSON 데이터를 Blob으로 변환하여 application/json Content-Type 명시
    const workSubmissionData = {
      comment: formData.get('comment') || '',
    };
    const workSubmissionBlob = new Blob([JSON.stringify(workSubmissionData)], {
      type: 'application/json',
    });
    requestFormData.append('workSubmission', workSubmissionBlob, 'workSubmission.json');

    // 이미지 파일들 추가
    const images = formData.getAll('images');
    if (images && images.length > 0) {
      images.forEach((file) => {
        if (file instanceof File) {
          requestFormData.append('images', file);
        }
      });
    }

    // API 요청
    const response = await apiClient.post(`/api/work-submissions/work-request/${workRequestId}`, requestFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('시안 업로드 실패:', error);
    throw error;
  }
};

// 피드백 작성 API
export const submitFeedback = async (workSubmissionId, feedbackData) => {
  try {
    // API 요청
    const response = await apiClient.post(`/api/work-submissions/${workSubmissionId}/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('피드백 작성 실패:', error);
    throw error;
  }
};

// 프로젝트 완료 API
export const completeWorkRequest = async (workRequestId) => {
  try {
    const response = await apiClient.post(`/api/work-request/${workRequestId}/complete`);
    return response.data;
  } catch (error) {
    console.error('프로젝트 완료 실패:', error);
    throw error;
  }
};

// 소상공인의 완료된 프로젝트 목록 조회 API
export const getBusinessOwnerCompletedWorkRequestList = async () => {
  try {
    const response = await apiClient.get('/api/work-request/business-owner/completed');
    return response.data;
  } catch (error) {
    console.error('소상공인 완료된 프로젝트 목록 조회 실패:', error);
    throw error;
  }
};

// 디자이너의 완료된 프로젝트 목록 조회 API
export const getDesignerCompletedWorkRequestList = async () => {
  try {
    const response = await apiClient.get('/api/work-request/designer/completed');
    return response.data;
  } catch (error) {
    console.error('디자이너 완료된 프로젝트 목록 조회 실패:', error);
    throw error;
  }
};
