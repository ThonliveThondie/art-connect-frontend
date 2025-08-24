import {useEffect, useRef, useState} from 'react';
import {X} from 'lucide-react';

export default function FileUpload({
  files = [],
  onFileChange,
  accept = 'image/*',
  multiple = true,
  buttonText = '파일 선택',
  showButton = true,
  disabled = false,
}) {
  const inputRef = useRef(null);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const urls = (files || []).map((f) => (typeof f === 'string' ? f : URL.createObjectURL(f)));
    setPreviews(urls);
    return () => {
      (files || []).forEach((f, i) => {
        if (f instanceof File) {
          try {
            URL.revokeObjectURL(urls[i]);
          } catch {}
        }
      });
    };
  }, [files]);

  const handleFileUpload = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;

    const updatedFiles = [...(files || []), ...incoming];
    onFileChange?.(updatedFiles);

    if (inputRef.current) inputRef.current.value = '';
  };

  const removeFile = (index) => {
    const updated = (files || []).filter((_, i) => i !== index);
    onFileChange?.(updated);
  };

  return (
    <div>
      {/* 업로드된 파일 미리보기 */}
      {files?.length > 0 && (
        <div className="flex flex-wrap gap-[10px] mt-3 mb-3">
          {files.map((file, index) => {
            const url = previews[index];
            const name = typeof file === 'string' ? file.split('/').pop() : file.name || `image-${index}`;
            return (
              <div key={index} className="relative">
                <div className="w-[120px] h-[120px] bg-gray-100 rounded-[12px] overflow-hidden border">
                  <img src={url} alt={name} className="w-full h-full object-cover" />
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute -top-[0px] -right-[0px] w-6 h-6 text-white"
                    aria-label={`${name} 파일 삭제`}
                    title="삭제"
                  >
                    <X size={18} strokeWidth={3} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 파일 선택 버튼 */}
      {showButton && !disabled && (
        <label className="inline-block px-[24px] py-[6px] mt-[8px] mb-[24px] bg-[#F1F0EFB2] font-[700] rounded-[8px] hover:bg-[#F1F0EF] cursor-pointer">
          {buttonText}
          <input
            ref={inputRef}
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
