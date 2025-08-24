import axios from 'axios';
import {useStore} from '../../store/useStore';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const workRequestApi = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 파일 업로드를 고려하여 타임아웃 증가
});

// 요청 인터셉터: 인증 토큰 자동 추가
workRequestApi.interceptors.request.use((config) => {
  try {
    const {token} = useStore.getState();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('토큰 설정 중 오류:', error);
  }
  return config;
});

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
    '명함/카드/인쇄물 디자인': 'CARD'
  };

  const designCategories = formData.designerTypes.map(type => 
    designCategoryMap[type] || type
  );

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
    additionalRequirement: formData.additionalRequirements || ''
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
        type: 'application/json'
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
      const response = await workRequestApi.post(`/api/work-request/to/${designerId}`, requestFormData);

      return response.data;
    } catch (error) {
    console.error('작업의뢰서 전송 중 오류 발생:', error);
    
    // 에러 메시지 처리
    if (error.response) {
      // 서버에서 응답한 에러
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '작업의뢰서 전송에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('작업의뢰서를 보낼 권한이 없습니다.');
      } else if (status === 404) {
        throw new Error('해당 디자이너를 찾을 수 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      // 네트워크 오류
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      // 기타 오류
      throw new Error('작업의뢰서 전송 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 디자이너가 받은 작업의뢰서 목록 조회 API
export const getWorkRequestList = async () => {
  try {
    const response = await workRequestApi.get('/api/work-request/designer/simple');
    return response.data;
  } catch (error) {
    console.error('작업의뢰서 목록 조회 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '작업의뢰서 목록 조회에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('작업의뢰서 목록을 조회할 권한이 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('작업의뢰서 목록 조회 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 디자이너가 받은 작업의뢰서 단건 조회 API
export const getWorkRequestDetail = async (workRequestId) => {
  try {
    const response = await workRequestApi.get(`/api/work-request/designer/${workRequestId}`);
    return response.data;
  } catch (error) {
    console.error('작업의뢰서 상세 조회 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '작업의뢰서 상세 조회에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('작업의뢰서를 조회할 권한이 없습니다.');
      } else if (status === 404) {
        throw new Error('해당 작업의뢰서를 찾을 수 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('작업의뢰서 상세 조회 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 소상공인이 보낸 작업의뢰서 단건 조회 API
export const getBusinessOwnerWorkRequestDetail = async (workRequestId) => {
  try {
    const response = await workRequestApi.get(`/api/work-request/business-owner/${workRequestId}`);
    return response.data;
  } catch (error) {
    console.error('소상공인 작업의뢰서 상세 조회 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '작업의뢰서 상세 조회에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('작업의뢰서를 조회할 권한이 없습니다.');
      } else if (status === 404) {
        throw new Error('해당 작업의뢰서를 찾을 수 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('작업의뢰서 상세 조회 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 작업의뢰서 거절 API
export const rejectWorkRequest = async (workRequestId) => {
  try {
    const response = await workRequestApi.delete(`/api/work-request/${workRequestId}/reject`);
    return response.data;
  } catch (error) {
    console.error('작업의뢰서 거절 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '작업의뢰서 거절에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('작업의뢰서를 거절할 권한이 없습니다.');
      } else if (status === 404) {
        throw new Error('해당 작업의뢰서를 찾을 수 없습니다.');
      } else if (status === 409) {
        throw new Error('이미 처리된 작업의뢰서입니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('작업의뢰서 거절 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 작업의뢰서 수락 API
export const acceptWorkRequest = async (workRequestId) => {
  try {
    const response = await workRequestApi.post(`/api/work-request/${workRequestId}/accept`);
    return response.data;
  } catch (error) {
    console.error('작업의뢰서 수락 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '작업의뢰서 수락에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('작업의뢰서를 수락할 권한이 없습니다.');
      } else if (status === 404) {
        throw new Error('해당 작업의뢰서를 찾을 수 없습니다.');
      } else if (status === 409) {
        throw new Error('이미 처리된 작업의뢰서입니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('작업의뢰서 수락 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 디자이너가 수락한 작업 목록 조회 API
export const getAcceptedWorkRequestList = async () => {
  try {
    const response = await workRequestApi.get('/api/work-request/designer/accepted/simple');
    return response.data;
  } catch (error) {
    console.error('수락한 작업 목록 조회 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '수락한 작업 목록 조회에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('수락한 작업 목록을 조회할 권한이 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('수락한 작업 목록 조회 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 소상공인의 수락된 작업 목록 조회 API
export const getBusinessOwnerAcceptedWorkRequestList = async () => {
  try {
    const response = await workRequestApi.get('/api/work-request/business-owner/accepted/simple');
    return response.data;
  } catch (error) {
    console.error('소상공인 수락된 작업 목록 조회 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '수락된 작업 목록 조회에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('수락된 작업 목록을 조회할 권한이 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('수락된 작업 목록 조회 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 작업 제출물 조회
export const getWorkSubmissions = async (workRequestId) => {
  try {
    const response = await workRequestApi.get(`/api/work-submissions/work-request/${workRequestId}`);
    return response.data;
  } catch (error) {
    console.error('작업 제출물 조회 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '작업 제출물 조회에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('작업 제출물을 조회할 권한이 없습니다.');
      } else if (status === 404) {
        throw new Error('해당 작업 제출물을 찾을 수 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('작업 제출물 조회 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 시안 업로드 API
export const submitWorkDesign = async (workRequestId, formData) => {
  try {
    // FormData 객체 생성 (이미 formData가 FormData 인스턴스라고 가정)
    const requestFormData = new FormData();
    
    // workSubmission JSON 데이터를 Blob으로 변환하여 application/json Content-Type 명시
    const workSubmissionData = {
      comment: formData.get('comment') || ''
    };
    const workSubmissionBlob = new Blob([JSON.stringify(workSubmissionData)], {
      type: 'application/json'
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
    const response = await workRequestApi.post(`/api/work-submissions/work-request/${workRequestId}`, requestFormData);

    return response.data;
  } catch (error) {
    console.error('시안 업로드 중 오류 발생:', error);
    
    // 에러 메시지 처리
    if (error.response) {
      // 서버에서 응답한 에러
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '시안 업로드에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('시안을 업로드할 권한이 없습니다.');
      } else if (status === 404) {
        throw new Error('해당 작업 요청을 찾을 수 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      // 네트워크 오류
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      // 기타 오류
      throw new Error('시안 업로드 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 피드백 작성 API
export const submitFeedback = async (workSubmissionId, feedbackData) => {
  try {
    // API 요청
    const response = await workRequestApi.post(`/api/work-submissions/${workSubmissionId}/feedback`, feedbackData);
    return response.data;
  } catch (error) {
    console.error('피드백 작성 중 오류 발생:', error);
    
    // 에러 메시지 처리
    if (error.response) {
      // 서버에서 응답한 에러
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '피드백 작성에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('피드백을 작성할 권한이 없습니다.');
      } else if (status === 404) {
        throw new Error('해당 작업 제출물을 찾을 수 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      // 네트워크 오류
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      // 기타 오류
      throw new Error('피드백 작성 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 프로젝트 완료 API
export const completeWorkRequest = async (workRequestId) => {
  try {
    const response = await workRequestApi.post(`/api/work-request/${workRequestId}/complete`);
    return response.data;
  } catch (error) {
    console.error('프로젝트 완료 중 오류 발생:', error);
    
    // 에러 메시지 처리
    if (error.response) {
      // 서버에서 응답한 에러
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '프로젝트 완료에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('프로젝트를 완료할 권한이 없습니다.');
      } else if (status === 404) {
        throw new Error('해당 작업 요청을 찾을 수 없습니다.');
      } else if (status === 409) {
        throw new Error('이미 완료된 프로젝트입니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      // 네트워크 오류
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      // 기타 오류
      throw new Error('프로젝트 완료 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 소상공인의 완료된 프로젝트 목록 조회 API
export const getBusinessOwnerCompletedWorkRequestList = async () => {
  try {
    const response = await workRequestApi.get('/api/work-request/business-owner/completed');
    return response.data;
  } catch (error) {
    console.error('소상공인 완료된 프로젝트 목록 조회 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '완료된 프로젝트 목록 조회에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('완료된 프로젝트 목록을 조회할 권한이 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('완료된 프로젝트 목록 조회 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};

// 디자이너의 완료된 프로젝트 목록 조회 API
export const getDesignerCompletedWorkRequestList = async () => {
  try {
    const response = await workRequestApi.get('/api/work-request/designer/completed');
    return response.data;
  } catch (error) {
    console.error('디자이너 완료된 프로젝트 목록 조회 중 오류 발생:', error);
    
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || error.response.data?.error || '완료된 프로젝트 목록 조회에 실패했습니다.';
      
      if (status === 401) {
        throw new Error('로그인이 필요합니다. 다시 로그인해주세요.');
      } else if (status === 403) {
        throw new Error('완료된 프로젝트 목록을 조회할 권한이 없습니다.');
      } else if (status >= 500) {
        throw new Error('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(message);
      }
    } else if (error.request) {
      throw new Error('네트워크 연결을 확인해주세요.');
    } else {
      throw new Error('완료된 프로젝트 목록 조회 중 알 수 없는 오류가 발생했습니다.');
    }
  }
};
