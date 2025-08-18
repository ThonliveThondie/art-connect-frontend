import React, {useState} from 'react';
import FileUpload from '@/components/common/form/FileUpload';
import '@/components/common/form/form.css';

export default function Uploader({className = ''}) {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');

  const handleFileChange = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      alert('파일을 선택해주세요.');
      return;
    }

    setFiles([]);
    setDescription('');
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
          disabled={files.length === 0}
          className={`px-[24px] py-[6px] rounded-[8px] font-[700] transition-colors w-[120px] text-center ${
            files.length === 0 ? 'bg-gray-300 text-gray-500' : 'bg-[#9E9692] text-white hover:bg-[#8A827E]'
          }`}
        >
          업로드
        </button>
      </div>
    </div>
  );
}
