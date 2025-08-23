import React, {useState} from 'react';
import FileUpload from '@/components/common/form/FileUpload';
import '@/components/common/form/form.css';
import {submitWorkDesign} from '@/api/work-request/workRequest';

export default function Uploader({className = '', workRequestId, onUploadSuccess}) {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubmit = async () => {
    if (files.length === 0) {
      alert('파일을 선택해주세요.');
      return;
    }

    if (!description.trim()) {
      alert('시안에 대한 설명을 입력해주세요.');
      return;
    }

    if (!workRequestId) {
      alert('작업 요청 정보가 없습니다.');
      return;
    }

    setIsUploading(true);
    
    try {
      // 시안 업로드 API 호출
      const formData = new FormData();
      formData.append('comment', description.trim());
      files.forEach((file) => {
        formData.append('images', file);
      });
      
      await submitWorkDesign(workRequestId, formData);
      
      alert('시안이 성공적으로 업로드되었습니다!');
      
      setFiles([]);
      setDescription('');
      
      // 부모 컴포넌트에 업로드 성공 알림
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.error('시안 업로드 실패:', error);
      alert('시안 업로드에 실패했습니다: ' + (error.message || '알 수 없는 오류'));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={className}>
      <h3 className="mb-[25px] font-[600] text-[18px]">새로운 시안 업로드</h3>

      <textarea
        className="form-textarea"
        placeholder="시안에 대한 설명을 입력해주세요..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={1}
      />

      <div>
        <FileUpload
          files={files}
          onFileChange={handleFileChange}
          accept="image/*,.pdf,.ai,.psd"
          multiple={true}
          showButton={false}
        />
      </div>

      <div className="flex items-center gap-3 mt-3">
        <label className="inline-block px-[24px] py-[6px] bg-[#F1F0EFB2] font-[700] rounded-[8px] hover:bg-[#F1F0EF] cursor-pointer w-[120px] text-center">
          파일 첨부
          <input
            type="file"
            multiple={true}
            accept="image/*,.pdf,.ai,.psd"
            className="hidden"
            onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          />
        </label>

        {/* 업로드 버튼 */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={files.length === 0 || !description.trim() || isUploading}
          className={`px-[24px] py-[6px] rounded-[8px] font-[700] transition-colors w-[120px] text-center ${
            files.length === 0 || !description.trim() || isUploading
              ? 'bg-gray-300 text-gray-500' 
              : 'bg-[#9E9692] text-white hover:bg-[#8A827E]'
          }`}
        >
          {isUploading ? '업로드 중...' : '업로드'}
        </button>
      </div>
    </div>
  );
}
