import {X} from 'lucide-react';

export default function FileUpload({
  files = [],
  onFileChange,
  accept = 'image/*',
  multiple = true,
  buttonText = '파일 선택',
  showButton = true,
}) {
  const handleFileUpload = (newFiles) => {
    const fileArray = Array.from(newFiles || []);
    if (fileArray.length === 0) return;

    let updatedFiles = [...files, ...fileArray];

    onFileChange(updatedFiles);
  };

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    onFileChange(updatedFiles);
  };

  return (
    <div>
      {/* 업로드된 파일 미리보기 */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-[10px] mt-3 mb-3">
          {files.map((file, index) => (
            <div key={index} className="relative">
              <div className="w-[120px] h-[120px] bg-gray-100 rounded-[12px] overflow-hidden border">
                <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute -top-[0px] -right-[0px] w-6 h-6 text-white"
                aria-label={`${file.name} 파일 삭제`}
              >
                <X size={18} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 파일 선택 버튼 */}
      {showButton && (
        <label className="inline-block px-[24px] py-[6px] mt-[8px] mb-[24px] bg-[#F1F0EFB2] font-[700] rounded-[8px] hover:bg-[#F1F0EF] cursor-pointer">
          {buttonText}
          <input
            type="file"
            multiple={multiple}
            accept={accept}
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </label>
      )}
    </div>
  );
}
